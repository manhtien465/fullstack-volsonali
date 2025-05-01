import React from "react";
import CircularGallery from "@/components/custom/circular-gallery/circular-gallery";
import { getStrapiMedia } from "@/lib/utils";

export function CircularGalleryLayout(data: Readonly<any>) {
  if (!data || !data.items) return null;

  return (
    <div style={{ height: `${data.height?? 600}px` }}  className='relative overflow-hidden'>
      <CircularGallery
        items={data.items.map((image: any) => ({
          image: getStrapiMedia(image.url),
          text: image.caption,
        }))}
        bend={data.bend ?? 1}
        textColor={data.textColor}
        borderRadius={data.borderRadius}
      />
    </div>
  );
}
