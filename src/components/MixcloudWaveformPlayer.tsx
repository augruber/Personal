import * as React from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useMixcloudApi } from "../lib/useMixcloudApi";

declare global { interface Window { Mixcloud?: any } }

type Props = {
  feed: string;               // "/YourUser/your-mix"
  peaksUrl: string;           // URL to peaks JSON
  title?: string;
  subtitle?: string;
  height?: number;            // canvas CSS height, default 120
  hideIframe?: boolean;       // hide the MC iframe
  showDebug?: boolean;        // set true to see a tiny status line
};

type TLItem = { start: number; artist?: string; title?: string; label: string };

// Basic type
type Color = [number, number, number, number?]; // r,g,b,a ∈ [0,1]


export default function MixcloudWaveformPlayer({
  feed,
  peaksUrl,
  cueUrl,
  title,
  subtitle,
  height = 120,
  hideIframe = true,
  showDebug = false,
}: Props) {
  const apiReady = useMixcloudApi();
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);
  const playerRef = React.useRef<any>(null);

  const [iframeLoaded, setIframeLoaded] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [position, setPosition] = React.useState(0);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const peaksRef = React.useRef<Float32Array | null>(null);
  const shadowCanvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const [tlOpen, setTlOpen] = React.useState(false);
  const [tlLoading, setTlLoading] = React.useState(false);
  const [tlError, setTlError] = React.useState<string | null>(null);
  const [tracklist, setTracklist] = React.useState<TLItem[] | null>(null);
  const [activeTLIndex, setActiveTLIndex] = React.useState<number | null>(null);

  // ---------- Tracjlist stuff ----------

  const seekTo = (seconds: number) => {
    const p = playerRef.current;
    if (!p || !duration || typeof p.seek !== "function") return;
    const clamped = Math.max(0, Math.min(duration, seconds));
    p.seek(clamped);
    positionRef.current = clamped; // optimistic
    redraw();
  };

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setTlLoading(true);
        setTlError(null);
        setTracklist(null);

        const res = await fetch(cueUrl, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${cueUrl}`);
        const txt = await res.text();

        const items = parseCue(txt);
        if (alive) setTracklist(items);
      } catch (e: any) {
        if (alive) setTlError(e?.message || "Failed to load CUE");
      } finally {
        if (alive) setTlLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []); // load once, or key by some prop if needed

  React.useEffect(() => {
    if (!tracklist || !tracklist.length || !duration) { setActiveTLIndex(null); return; }
    const pos = positionRef.current || 0;
    let idx: number | null = null;
    for (let i = 0; i < tracklist.length; i++) {
      if (tracklist[i].start <= pos) idx = i; else break;
    }
    setActiveTLIndex(idx);
  }, [tracklist, duration, position]);

  // ---------- Peaks loading & parsing ----------
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(peaksUrl, { cache: "force-cache" });
        if (!res.ok) return;
        const raw = await res.json();
        const peaks = parsePeaks(raw);

        if (!peaks || peaks.length === 0) return;
        if (!cancelled) {
          peaksRef.current = peaks;
          redraw(); // draw immediately, even if duration isn't known yet
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn("Failed to load peaks:", e);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peaksUrl]);

  // ---------- Mixcloud widget ----------
  React.useEffect(() => {
    if (!apiReady || !iframeLoaded || !iframeRef.current || playerRef.current) return;
    const PlayerWidget = (window as any).Mixcloud?.PlayerWidget;
    if (typeof PlayerWidget !== "function") return;

    const player = PlayerWidget(iframeRef.current);
    playerRef.current = player;

    player.ready.then(async () => {
      setIsReady(true);
      try {
        const d = await player.getDuration?.();
        if (d) setDuration(d);
      } catch {}
      const ev = (player as any).events;
      ev?.play?.on?.(() => setIsPlaying(true));
      ev?.pause?.on?.(() => setIsPlaying(false));
      ev?.ended?.on?.(() => { setIsPlaying(false); setPosition(0); });
    }).catch(() => {});
    return () => { playerRef.current = null; };
  }, [apiReady, iframeLoaded]);

  // ---------- Position polling & redraw ----------
  const positionRef = React.useRef(0);

  React.useEffect(() => {
    if (!isReady) return;
    let raf = 0;
    const tick = () => {
      const p = playerRef.current;
      if (p && typeof p.getPosition === "function") {
        p.getPosition().then((pos: number) => {
          if (typeof pos === "number" && !Number.isNaN(pos)) {
            positionRef.current = pos;
            setPosition(pos);
            redraw();
          }
        }).catch(() => {});
      }
      if (p && !duration && typeof p.getDuration === "function") {
        p.getDuration().then((d: number) => d && setDuration(d)).catch(() => {});
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isReady, duration]);

  // ---------- Canvas sizing (robust) ----------
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const cssW = Math.max(320, parent.clientWidth || 800); // ensure non-zero
      canvas.width  = Math.floor(cssW * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width  = "100%";
      canvas.style.height = `${height}px`;
      redraw();
    };

    // initial sync + observer
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [height]);

  // ---------- Draw waveform ----------
  
  const PADDING = 20; // space on left/right/top/bottom for shadow

  const redraw = React.useCallback(() => {
    const canvas = canvasRef.current;
    const peaks = peaksRef.current;
    if (!canvas || !peaks) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width;
    const H = canvas.height;

    // --- background ---
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#11111100";
    ctx.fillRect(0, 0, W, H);

    // --- content rect (padding in device pixels) ---
    const pad = Math.round(PADDING * dpr);
    const X0 = pad;
    const Y0 = pad;
    const X1 = W - pad;
    const Y1 = H - pad;
    const CW = Math.max(1, X1 - X0);
    const CH = Math.max(1, Y1 - Y0);
    const mid = Y0 + CH / 2;

    // map peaks -> columns (same density as before, but for content width)
    const columns = Math.max(1, Math.floor(CW / 4)); // you had canvas.width/4
    const peaksFitted = fitPeaksToWidth(peaks, columns);

    // progress in columns (robust to DPR)
    const playedCols = (duration > 0)
      ? Math.min(columns, Math.floor((positionRef.current / duration) * columns))
      : 0;

    // palette
    const [futureColor, playedColor] = [
      [[0.1, 0.1, 0.1], [0.7, 0.7, 0.7]],
      [[0.2, 0.1, 0.05], [0.9, 0.8, 0.7]],
      [[0.1, 0.2, 0.35], [0.7, 0.85, 1.0]],
      [[0.0, 0.8, 0.7], [0.1, 0.2, 0.25]],
      [[0.9, 0.2, 0.6], [0.15, 0.05, 0.15]],
      [[0.7, 1.0, 0.4], [0.0, 0.4, 0.6]],
      [[0.9, 0.55, 0.2], [0.05, 0.02, 0.1]],
      [[0.0, 0.4, 0.6], [0.0, 0.05, 0.1]],
      [[0.3, 0.9, 0.6], [0.05, 0.1, 0.15]],
    ][5] as Color[]; // pick set #6 as you had

    const white: Color = [1, 1, 1];
    const floor = 0.03;

    // --- shadow for bars ---
    // --- SHADOW UNDERLAY (offscreen, no bar-edge darkening) ---
    const makeOrResizeShadow = (w: number, h: number) => {
      if (!shadowCanvasRef.current) shadowCanvasRef.current = document.createElement('canvas');
      const sc = shadowCanvasRef.current!;
      if (sc.width !== w || sc.height !== h) { sc.width = w; sc.height = h; }
      return sc;
    };

    const sc = makeOrResizeShadow(CW, CH);
    const sctx = sc.getContext('2d')!;
    sctx.clearRect(0, 0, CW, CH);

    // draw solid silhouettes to the shadow canvas (no blur here)
    for (let i = 0; i < columns; i++) {
      const x0 = Math.round((i    * CW) / columns);
      const x1 = Math.round(((i+1) * CW) / columns);
      const barW = Math.max(1, x1 - x0);

      const amp = Math.max(floor, Math.min(1, peaksFitted[i] ?? 0));
      const h = amp * (CH * 0.9);
      const y = Math.round((CH - h) / 2);

      sctx.fillStyle = "black";
      sctx.fillRect(x0, y, barW, h);
    }

    // paint the blurred shadow back onto the main canvas, *behind* the bars
    ctx.save();
    ctx.filter = 'blur(' + PADDING.toString() + 'px)';        // how soft the shadow feels
    ctx.globalAlpha = 0.25;          // shadow strength
    ctx.drawImage(sc, X0, Y0);
    ctx.restore();

    // --- CRISP BARS ON TOP (no shadow here) ---
    for (let i = 0; i < columns; i++) {
      const evenCol = Number((i % 2) === 0);

      const x0 = X0 + Math.round((i    * CW) / columns);
      const x1 = X0 + Math.round(((i+1) * CW) / columns);
      const barW = Math.max(1, x1 - x0);

      const amp = Math.max(floor, Math.min(1, peaksFitted[i] ?? 0));
      const h = amp * (CH * 0.9);
      const y = (Y0 + (CH - h) / 2);

      const darkness = mulColor(white, evenCol * 0.1);
      const intensityFactor = Math.pow(amp, 1 / 2);

      const col = i < playedCols
        ? mulColor(addColor(playedColor, darkness), intensityFactor)
        : mulColor(addColor(futureColor, darkness), intensityFactor);

      ctx.fillStyle = rgbf(col);
      ctx.fillRect(x0, y, barW, h);
    }

    ctx.restore();

    // --- playhead line aligned to content rect ---
    if (duration > 0) {
      const playedPx = X0 + Math.min(Math.round((positionRef.current / duration) * CW), CW - 1);
      ctx.fillStyle = "#000";
      ctx.fillRect(playedPx, Y0, 1, CH);
    }

    if (showDebug) {
      ctx.fillStyle = "#666";
      ctx.font = `${12 * (window.devicePixelRatio || 1)}px ui-sans-serif`;
      ctx.fillText(
        `peaks:${columns} dur:${duration.toFixed(1)} pos:${position.toFixed(1)}`,
        X0 + 6,
        Y0 + 14 * (window.devicePixelRatio || 1)
      );
    }
  }, [duration, position, showDebug]);

  // ---------- Interactions ----------
  const toggle = () => {
    const p = playerRef.current;
    if (!p) return;
    isPlaying ? p.pause?.() : p.play?.();
  };

  const restart = () =>
    playerRef.current?.seek?.(0)?.then?.(() => playerRef.current?.play?.());

  const seekCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const p = playerRef.current;
    if (!canvas || !p || !duration || typeof p.seek !== "function") return;

    const rect = canvas.getBoundingClientRect();
    const innerLeft  = rect.left + PADDING;
    const innerRight = rect.right - PADDING;
    const innerWidth = Math.max(1, innerRight - innerLeft);

    const x = Math.min(Math.max(e.clientX, innerLeft), innerRight);
    const ratio = (x - innerLeft) / innerWidth;

    p.seek(ratio * duration);
  };

  return (
    <div className="rounded-2xl border border-neutral-200 shadow-sm overflow-hidden bg-white">
      {(title || subtitle) && (
        <div className="px-4 pt-4">
          {title && <div className="font-medium">{title}</div>}
          {subtitle && <div className="text-sm text-neutral-500">{subtitle}</div>}
        </div>
      )}

      <div className="px-4 pt-4">
        <canvas
          ref={canvasRef}
          className="block w-full cursor-pointer"
          onClick={seekCanvas}
        />
        <div className="mt-2 flex justify-between text-xs text-neutral-500 tabular-nums">
          <span>{fmt(position)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      <div className="p-4 flex items-center gap-2">
        <button
          onClick={toggle}
          disabled={!isReady}
          className="px-3 py-1 rounded bg-neutral-900 text-white text-sm disabled:opacity-50 inline-flex items-center gap-1"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={restart}
          disabled={!isReady}
          className="px-3 py-1 rounded border text-sm inline-flex items-center gap-1"
        >
          <RotateCcw className="h-4 w-4" /> Restart
        </button>
        <div className="ml-auto text-xs text-neutral-500">Mixcloud stream</div>
      </div>

      <div className={hideIframe ? "h-0 overflow-hidden" : ""}>
        <iframe
          ref={iframeRef}
          onLoad={() => setIframeLoaded(true)}
          title="Mixcloud player"
          width="100%"
          height={hideIframe ? 0 : 120}
          frameBorder={0}
          allow="autoplay; encrypted-media; fullscreen; clipboard-write"
          src={`https://player-widget.mixcloud.com/widget/iframe/?feed=${encodeURIComponent(
            feed
          )}&hide_cover=1&mini=1&light=1`}
        />
      </div>

      {/* Tracklist */}
      <div className="border-t border-neutral-200">
        <button
          type="button"
          onClick={() => setTlOpen(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-neutral-50"
          aria-expanded={tlOpen}
        >
          <span className="text-sm font-medium">
            Tracklist{tracklist ? ` (${tracklist.length})` : ""}
          </span>
          <span className="text-xs text-neutral-500">{tlOpen ? "Hide" : "Show"}</span>
        </button>

        {tlOpen && (
          <div className="px-4 pb-3">
            {tlLoading && <div className="text-sm text-neutral-500">Loading…</div>}
            {tlError && <div className="text-sm text-red-600">Error: {tlError}</div>}
            {!tlLoading && !tlError && (!tracklist || tracklist.length === 0) && (
              <div className="text-sm text-neutral-500">No tracks found in CUE.</div>
            )}
            {!!tracklist?.length && (
              <ul className="mt-1 divide-y divide-neutral-200 rounded-md overflow-hidden">
                {tracklist.map((t, i) => {
                  const isActive = i === activeTLIndex;
                  return (
                    <li
                      key={`${t.start}-${i}`}
                      className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${
                        isActive ? "bg-neutral-100" : "hover:bg-neutral-50"
                      }`}
                      onClick={() => seekTo(t.start)}
                      title="Seek to this track"
                    >
                      <span className="text-xs tabular-nums text-neutral-500 w-14">
                        {fmt(t.start)}
                      </span>
                      <span className={`text-sm ${isActive ? "font-medium text-neutral-900" : "text-neutral-700"}`}>
                        {t.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- helpers ---------------- */

function parsePeaks(raw: any): Float32Array | null {
  // 0) wavesurfer-style: flat array of numbers/strings in [-1..1] or [0..1]
  if (Array.isArray(raw) && typeof raw[0] !== "object") {
    return normalizeArray(raw);
  }

  // 1) audiowaveform default: { data:[...] } (values 0..255 or 0..65535)
  if (raw && Array.isArray(raw.data) && typeof raw.data[0] !== "object") {
    return normalizeArray(raw.data);
  }

  // 2) min/max pairs per column: [[min,max], ...]
  if (Array.isArray(raw) && Array.isArray(raw[0])) {
    const merged = (raw as any[]).map((p) => {
      if (Array.isArray(p) && p.length >= 2) return Math.max(Math.abs(Number(p[0]) || 0), Math.abs(Number(p[1]) || 0));
      return 0;
    });
    return normalizeArray(merged);
  }

  // 3) { data: { min:[], max:[] } }
  if (raw && raw.data && Array.isArray(raw.data.min) && Array.isArray(raw.data.max)) {
    const minA = raw.data.min, maxA = raw.data.max;
    const L = Math.min(minA.length, maxA.length);
    const merged = new Array(L);
    for (let i = 0; i < L; i++) merged[i] = Math.max(Math.abs(Number(minA[i]) || 0), Math.abs(Number(maxA[i]) || 0));
    return normalizeArray(merged);
  }

  // 4) { peaks:[...] }
  if (raw && Array.isArray(raw.peaks) && typeof raw.peaks[0] !== "object") {
    return normalizeArray(raw.peaks);
  }

  // 5) Interleaved multi-channel arrays: { channels: 2, data:[L0,R0,L1,R1,...] }
  if (raw && Array.isArray(raw.data) && typeof raw.data[0] !== "object" && typeof raw.channels === "number" && raw.channels > 1) {
    const ch = raw.channels;
    const src = raw.data;
    const cols = Math.floor(src.length / ch);
    const merged = new Array(cols);
    for (let i = 0; i < cols; i++) {
      let m = 0;
      for (let c = 0; c < ch; c++) m = Math.max(m, Math.abs(Number(src[i * ch + c]) || 0));
      merged[i] = m;
    }
    return normalizeArray(merged);
  }

  return null;
}

function fitPeaksToWidth(src: Float32Array, targetCols: number): Float32Array {
  if (targetCols <= 0) return src;
  const out = new Float32Array(targetCols);
  const scale = src.length / targetCols;
  for (let i = 0; i < targetCols; i++) {
    const start = Math.floor(i * scale);
    const end = Math.min(src.length, Math.floor((i + 1) * scale) || (start + 1));
    let m = 0;
    for (let j = start; j < end; j++) m = Math.max(m, src[j]);
    out[i] = m;
  }
  return out;
}

function normalizeArray(arr: any[]): Float32Array {
  // Coerce everything to numbers (handles "123" strings too)
  const nums = arr.map((v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  });

  // If values are in [-1..1], scale by max abs; if in 0..255/65535, still fine.
  let max = 0;
  for (const v of nums) {
    const a = Math.abs(v);
    if (a > max) max = a;
  }
  const denom = max > 0 ? max : 1;

  const out = new Float32Array(nums.length);
  for (let i = 0; i < nums.length; i++) {
    out[i] = Math.min(1, Math.abs(nums[i]) / denom);
  }
  return out;
}

function fmt(t: number) {
  const s = Math.max(0, Math.floor(t || 0));
  const m = Math.floor(s / 60), r = s % 60, h = Math.floor(m / 60), mm = m % 60;
  return h > 0 ? `${h}:${mm.toString().padStart(2,"0")}:${r.toString().padStart(2,"0")}` : `${mm}:${r.toString().padStart(2,"0")}`;
}

// Clamp helper
const clamp = (v: number, min = 0., max = 1.) => Math.min(max, Math.max(min, v));

/** Convert a Color array to CSS rgba() string */
function rgbf(c: Color): string {
  const [r, g, b, a = 1] = c;
  return `rgba(${Math.round(clamp(r) * 255)}, ${Math.round(clamp(g) * 255)}, ${Math.round(clamp(b) * 255)}, ${clamp(a)})`;
}

/** Multiply color by scalar (e.g. brighten/darken) */
function mulColor(c: Color, k: number): Color {
  const [r, g, b] = c;
  return [clamp(r * k), clamp(g * k), clamp(b * k)];
}

/** Add colors (component-wise) */
function addColor(a: Color, b: Color): Color {
  return [
    clamp(a[0] + b[0]),
    clamp(a[1] + b[1]),
    clamp(a[2] + b[2]),
    clamp((a[3] ?? 1) + (b[3] ?? 1) - 1),
  ];
}

function parseCue(cueText: string): TLItem[] {
  const lines = cueText.split(/\r?\n/);
  type Track = { artist?: string; title?: string; start?: number };
  const tracks: Track[] = [];
  let cur: Track | null = null;

  const toSecondsFromFrames = (mm: number, ss: number, ff: number) =>
    mm * 60 + ss + ff / 75;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    // Start new track
    if (/^TRACK\s+\d+\s+AUDIO\b/i.test(line)) {
      cur = {};
      tracks.push(cur);
      continue;
    }

    if (!cur) continue;

    // Title / Performer
    const mTitle = line.match(/^TITLE\s+"(.+?)"\s*$/i);
    if (mTitle) { cur.title = mTitle[1]; continue; }

    const mPerf = line.match(/^PERFORMER\s+"(.+?)"\s*$/i);
    if (mPerf) { cur.artist = mPerf[1]; continue; }

    const mIdx = line.match(/^INDEX\s+01\s+(\d{1,2}):(\d{2}):(\d{2})$/i);
    if (mIdx) {
      const h = parseInt(mIdx[1], 10);
      const m = parseInt(mIdx[2], 10);
      const s = parseInt(mIdx[3], 10);

      // assume hh:mm:ss if hours < 10, otherwise mm:ss:frames (rare)
      // since Rekordbox exports 00:00:00, treat as hh:mm:ss always
      cur.start = h * 3600 + m * 60 + s;
    }
    // Non-standard hh:mm:ss fallback (if your export writes that)
    const mIdxHMS = line.match(/^INDEX\s+01\s+(\d{1,2}):(\d{2}):(\d{2})$/i);
    if (mIdxHMS) {
      const hh = parseInt(mIdxHMS[1], 10);
      const mm = parseInt(mIdxHMS[2], 10);
      const ss = parseInt(mIdxHMS[3], 10);
      cur.start = hh * 3600 + mm * 60 + ss;
      continue;
    }

    // Ignore per-track FILE lines (Rekordbox)
    if (/^FILE\s+/i.test(line)) continue;
  }

  // Build UI-friendly items
  const items: TLItem[] = tracks
    .filter(t => typeof t.start === "number")
    .map(t => {
      const artist = t.artist?.trim();
      const title = t.title?.trim();
      return {
        start: t.start as number,
        artist,
        title,
        label: [artist, title].filter(Boolean).join(" — ") || "Untitled",
      };
    })
    .sort((a, b) => a.start - b.start);

  // Deduplicate identical start times
  return items.filter((t, i, arr) => i === 0 || t.start !== arr[i - 1].start);
}
