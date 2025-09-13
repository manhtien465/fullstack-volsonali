import React from "react";
import { getStrapiMedia } from "@/lib/utils";
import GridMotion from "@/components/custom/grid-motion/grid-motion";

export function GridMotionLayout(data: Readonly<any>) {
  if (!data || !data.items) return null;

  // Convert original items using getStrapiMedia
  const originalItems = data.items.map((image: any) =>
    getStrapiMedia(image.url)
  );

  // Ensure at least 14 items by repeating
  const MIN_ITEMS = 14;
  const repeatedItems = Array.from({ length: MIN_ITEMS }, (_, i) =>
    originalItems[i % originalItems.length]
  );
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">

    <GridMotion items={repeatedItems} gradientColor={data.gradientColor} />
    </section>
  );
}
