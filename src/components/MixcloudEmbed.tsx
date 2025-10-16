// components/MixcloudEmbed.tsx
import React from "react";

type Props = {
  /** e.g. "/YourMixcloudName/desert-dawn-2025/" */
  feed: string;
  /** mini = true gives a compact 120px tall player */
  mini?: boolean;
  /** hide the big cover image (nice for compact lists) */
  hideCover?: boolean;
  /** title for a11y */
  title?: string;
};

const MixcloudEmbed: React.FC<Props> = ({
  feed,
  mini = true,
  hideCover = true,
  title = "Mixcloud player",
}) => {
  const src = `https://www.mixcloud.com/widget/iframe/?feed=${encodeURIComponent(
    feed
  )}&hide_cover=${hideCover ? 1 : 0}&mini=${mini ? 1 : 0}`;

  return (
    <div className="rounded-2xl overflow-hidden shadow">
      <iframe
        title={title}
        src={src}
        width="100%"
        height={mini ? 120 : 480}
        frameBorder={0}
        allow="autoplay"
        loading="lazy"
      />
    </div>
  );
};

export default MixcloudEmbed;