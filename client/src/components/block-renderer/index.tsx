// import type { Block } from "@/types";

// import { Hero } from "@/components/block-renderer/layout/hero";
// import { SectionHeading } from "@/components/block-renderer/layout/section-heading";
// import { ContentWithImage } from "@/components/block-renderer/layout/content-with-image";
// import { Pricing } from "@/components/block-renderer/layout/pricing";
// import { CardCarousel } from "@/components/block-renderer/layout/card-carousel";

// import { Video } from "@/components/block-renderer/blocks/video";
// import { Text } from "@/components/block-renderer/blocks/text";
// import { PricingPayment } from "./layout/pricing-payment";

// function blockRenderer(block: Block, index: number) {
//   switch (block.__component) {
//     case "layout.hero":
//       return <Hero key={index} {...block} />;
//     case "layout.card-grid":
//       return <CardCarousel key={index} {...block} />;
//     case "layout.section-heading":
//       return <SectionHeading key={index} {...block} />;
//     case "layout.content-with-image":
//       return <ContentWithImage key={index} {...block} />;
//     case "layout.price-grid":
//       return <Pricing key={index} {...block} />;
//     case "layout.price-grid-payment":
//       return <PricingPayment key={index} {...block} />;
//     case "blocks.video":
//       return <Video key={index} {...block} />;
//     case "blocks.text":
//       return <Text key={index} {...block} />;
//     default:
//       return null;
//   }
// }

// export function BlockRenderer({ blocks }: { blocks: Block[] }) {
//   return blocks.map((block, index) => blockRenderer(block, index));
// }


import { lazy, Suspense } from "react";
import type { Block } from "@/types";
import LoadingPage from "@/app/loading";

const Hero = lazy(() => import("@/components/block-renderer/layout/hero").then((mod) => ({ default: mod.Hero })));
const SectionHeading = lazy(() =>
  import("@/components/block-renderer/layout/section-heading").then((mod) => ({ default: mod.SectionHeading }))
);
const ContentWithImage = lazy(() =>
  import("@/components/block-renderer/layout/content-with-image").then((mod) => ({ default: mod.ContentWithImage }))
);
const Pricing = lazy(() => import("@/components/block-renderer/layout/pricing").then((mod) => ({ default: mod.Pricing })));
const CardCarousel = lazy(() =>
  import("@/components/block-renderer/layout/card-carousel").then((mod) => ({ default: mod.CardCarousel }))
);
const Video = lazy(() => import("@/components/block-renderer/blocks/video").then((mod) => ({ default: mod.Video })));
const Text = lazy(() => import("@/components/block-renderer/blocks/text").then((mod) => ({ default: mod.Text })));
const PricingPayment = lazy(() =>
  import("@/components/block-renderer/layout/pricing-payment").then((mod) => ({ default: mod.PricingPayment }))
);
const ImageCarousel = lazy(() => import("@/components/block-renderer/layout/image-carousel").then((mod) => ({ default: mod.ImageCarousel })));

const ContentWithVideo = lazy(() => import("@/components/block-renderer/layout/content-with-video").then((mod) => ({ default: mod.ContentWithVideo })));

const BounceCardsLayout = lazy(() => import("@/components/block-renderer/layout/bounce-cards").then((mod) => ({ default: mod.BounceCardsLayout })));

const CircularGalleryLayout = lazy(() => import("@/components/block-renderer/layout/circular-gallery").then((mod) => ({ default: mod.CircularGalleryLayout })));

const GridMotionLayout = lazy(() => import("@/components/block-renderer/layout/grid-motion").then((mod) => ({ default: mod.GridMotionLayout })));

const StackLayout = lazy(() => import("@/components/block-renderer/layout/stack").then((mod) => ({ default: mod.StackLayout })));

function blockRenderer(block: Block, index: number) {
  switch (block.__component) {
    case "layout.hero":
      return <Hero key={index} {...block} />;
    case "layout.card-grid":
      return <CardCarousel key={index} {...block} />;
    case "layout.section-heading":
      return <SectionHeading key={index} {...block} />;
    case "layout.content-with-image":
      return <ContentWithImage key={index} {...block} />;
    case "layout.price-grid":
      return <Pricing key={index} {...block} />;
    case "layout.price-grid-payment":
      return <PricingPayment key={index} {...block} />;
    case "layout.image-carousel":
      return <ImageCarousel key={index} {...block} />;
    case "layout.content-with-video":
      return <ContentWithVideo key={index} {...block} />;
    case "blocks.video":
      return <Video key={index} {...block} />;
    case "blocks.text":
      return <Text key={index} {...block} />;
    case "animation-elements.bounce-cards":
      return <BounceCardsLayout key={index} {...block} />;
    case "animation-elements.circular-gallery":
      return <CircularGalleryLayout key={index} {...block} />;
    case "animation-elements.grid-motion":
      return <GridMotionLayout key={index} {...block} />;
    case "animation-elements.stack":
      return <StackLayout key={index} {...block} />;
    default:
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <Suspense fallback={<LoadingPage/>}>
      {blocks.map((block, index) => blockRenderer(block, index))}
    </Suspense>
  );
}
