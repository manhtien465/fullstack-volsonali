// block-registry.ts
import dynamic from "next/dynamic";
import { ComponentType } from "react";

export const blockRegistry: Record<string, ComponentType<any>> = {
  "layout.hero": dynamic(() => import("@/components/block-renderer/layout/hero").then(mod => mod.Hero), { ssr:true } ),
  "layout.section-heading": dynamic(() => import("@/components/block-renderer/layout/section-heading").then(mod => mod.SectionHeading),{ ssr:true }),
  "layout.content-with-image": dynamic(() => import("@/components/block-renderer/layout/content-with-image").then(mod => mod.ContentWithImage),{ ssr:true }),
  "layout.price-grid": dynamic(() => import("@/components/block-renderer/layout/pricing").then(mod => mod.Pricing),{ ssr:true }),
  "layout.price-grid-payment": dynamic(() => import("@/components/block-renderer/layout/pricing-payment").then(mod => mod.PricingPayment),{ ssr:true }),
  // "layout.image-carousel": dynamic(() => import("@/components/block-renderer/layout/image-carousel").then(mod => mod.ImageCarousel)),
  "layout.content-with-video": dynamic(() => import("@/components/block-renderer/layout/content-with-video").then(mod => mod.ContentWithVideo),{ ssr:true }),
  "layout.json": dynamic(() => import("@/components/block-renderer/json-renderer/json-renderer").then(mod => mod.JsonPageRenderer)),
  "layout.markdown": dynamic(() => import("@/components/block-renderer/layout/markdown").then(mod => mod.Markdown)),

  "blocks.video": dynamic(() => import("@/components/block-renderer/blocks/video").then(mod => mod.Video),{ ssr:true }),
  "blocks.text": dynamic(() => import("@/components/block-renderer/blocks/text").then(mod => mod.Text),{ ssr:true }),

  "layout.card-grid": dynamic(() => import("@/components/block-renderer/layout/card-carousel").then(mod => mod.CardCarousel),{ ssr:true }),
  "animation-elements.bounce-cards": dynamic(() => import("@/components/block-renderer/layout/bounce-cards").then(mod => mod.BounceCardsLayout),{ ssr:true }),
  "animation-elements.circular-gallery": dynamic(() => import("@/components/block-renderer/layout/circular-gallery").then(mod => mod.CircularGalleryLayout),{ ssr:true }),
  "animation-elements.grid-motion": dynamic(() => import("@/components/block-renderer/layout/grid-motion").then(mod => mod.GridMotionLayout),{ ssr:true }),
  "animation-elements.stack": dynamic(() => import("@/components/block-renderer/layout/stack").then(mod => mod.StackLayout),{ ssr:true }),

};
