// BlockRenderer.tsx
import { Suspense } from "react";
import type { Block } from "@/types";
import LoadingPage from "@/app/loading";
import { blockRegistry } from "../block-registry/block-registry";

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <Suspense fallback={<LoadingPage />}>
      {blocks.map((block, index) => {
        const Component = blockRegistry[block.__component];
        if (!Component) return null;
        return <Component key={index} {...block} />;
      })}
    </Suspense>
  );
}
