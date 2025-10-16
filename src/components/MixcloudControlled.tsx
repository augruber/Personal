import * as React from "react";
import { useMixcloudApi } from "../lib/useMixcloudApi";
import { Play, Pause, RotateCcw } from "lucide-react";

declare global { interface Window { Mixcloud?: any } }

export default function MixcloudControlled({
  feed,
  title,
  subtitle,
  hideIframe = true,
}: {
  feed: string; title?: string; subtitle?: string; hideIframe?: boolean;
}) {
  const apiReady = useMixcloudApi();
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);
  const playerRef = React.useRef<any>(null);

  const [iframeLoaded, setIframeLoaded] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [position, setPosition] = React.useState(0);

  // instantiate AFTER script + iframe load
  React.useEffect(() => {
    if (!apiReady || !iframeLoaded || !iframeRef.current || playerRef.current) return;

    const PlayerWidget = (window as any).Mixcloud?.PlayerWidget;
    if (typeof PlayerWidget !== "function") return;

    const player = PlayerWidget(iframeRef.current);
    playerRef.current = player;

    player.ready
      .then(async () => {
        setIsReady(true);

        // duration is sometimes late
        try {
          const d = await player.getDuration?.();
          if (d) setDuration(d);
        } catch {}

        // wire events only after ready, defensively
        const ev = (player as any).events;
        ev?.play?.on?.(() => setIsPlaying(true));
        ev?.pause?.on?.(() => setIsPlaying(false));
        ev?.ended?.on?.(() => { setIsPlaying(false); setPosition(0); });
      })
      .catch(() => { /* ignore */ });

    return () => { playerRef.current = null; };
  }, [apiReady, iframeLoaded]);

  // ✅ poll position ONLY after ready, and guard method presence
  React.useEffect(() => {
    if (!isReady) return;
    let raf = 0;

    const tick = () => {
      const p = playerRef.current;
      if (p && typeof p.getPosition === "function") {
        p.getPosition()
          .then((pos: number) => {
            if (typeof pos === "number" && !Number.isNaN(pos)) setPosition(pos || 0);
          })
          .catch(() => {});
      }

      if (p && !duration && typeof p.getDuration === "function") {
        p.getDuration()
          .then((d: number) => d && setDuration(d))
          .catch(() => {});
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isReady, duration]);

  const pct = duration ? (position / duration) * 100 : 0;

  const playPause = () => {
    const p = playerRef.current;
    if (!p) return;
    // ✅ guard methods
    if (isPlaying) {
      p.pause?.();
    } else {
      p.play?.(); // may require a user gesture the first time
    }
  };

  const restart = () =>
    playerRef.current?.seek?.(0)?.then?.(() => playerRef.current?.play?.());

  const seekToPercent = (e: React.MouseEvent<HTMLDivElement>) => {
    const p = playerRef.current;
    if (!p || !duration || typeof p.seek !== "function") return;
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
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
        <div
          className="relative h-3 bg-neutral-100 rounded cursor-pointer"
          onClick={seekToPercent}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        >
          <div className="absolute inset-y-0 left-0 bg-neutral-900 rounded" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-xs text-neutral-500 tabular-nums">
          <span>{fmt(position)}</span><span>{fmt(duration)}</span>
        </div>
      </div>

      <div className="p-4 flex items-center gap-2">
        <button onClick={playPause} disabled={!isReady}
          className="px-3 py-1 rounded bg-neutral-900 text-white text-sm disabled:opacity-50 inline-flex items-center gap-1">
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={restart} disabled={!isReady}
          className="px-3 py-1 rounded border text-sm inline-flex items-center gap-1">
          <RotateCcw className="h-4 w-4" /> Restart
        </button>
        <div className="ml-auto text-xs text-neutral-500">Mixcloud stream</div>
      </div>

      {/* Keep iframe in DOM. Use player-widget host and fire onLoad. */}
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
    </div>
  );
}

function fmt(t: number) {
  const s = Math.max(0, Math.floor(t || 0));
  const m = Math.floor(s / 60), r = s % 60, h = Math.floor(m / 60), mm = m % 60;
  return h > 0 ? `${h}:${mm.toString().padStart(2,"0")}:${r.toString().padStart(2,"0")}` : `${mm}:${r.toString().padStart(2,"0")}`;
}
