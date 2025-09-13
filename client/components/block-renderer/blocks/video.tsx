"use client";

import { getStrapiMedia } from "@/lib/utils";
import { type VideoOnlyProps } from "@/types";


import dynamic from "next/dynamic";

const ReactVideoPlayer = dynamic(
  () => import("@/components/custom/react-player"),
  {
    ssr: false,
  }
);

function generateYouTubeUrl(data: {
  video: { videoId: string; start?: string; end?: string };
}) {
  const baseUrl = new URL("https://www.youtube.com/watch");
  baseUrl.searchParams.append("v", data.video?.videoId);
  if (data.video.start ?? data.video.end) {
    baseUrl.searchParams.append("start", data.video?.start ?? "0");
    baseUrl.searchParams.append("end", data.video?.end ?? "0");
  }
  return baseUrl.href;
}

export function Video(data: Readonly<VideoOnlyProps>) {
  if (!data) return null;

  const videoUrl =data.isYoutubeVideo ? generateYouTubeUrl({
    video: {
      videoId: data.video?.videoId,
      start: data.video?.start,
      end: data.video?.end,
    },
  }): getStrapiMedia(data.videoInternal?.url);

  return (
    <div className="relative aspect-video rounded-md overflow-hidden">
      <ReactVideoPlayer videoUrl={videoUrl ?? ''} />
    </div>
  );
}
