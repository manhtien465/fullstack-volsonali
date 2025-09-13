import type {  ImageCarouselProps } from "@/types";

import {
  Carousel,
  CarouselPrevious,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import { ImageBanner } from "@/components/custom/image-banner";


export function ImageCarousel(data: Readonly<ImageCarouselProps>) {
  if (!data) return null;
  return (
    <section className="container flex flex-col items-center gap-6 py-12 sm:gap-7">
      <Carousel opts={{ loop: true, align: "start" }} className="mt-6 w-full px-4 xl:px-0">
        <CarouselPrevious className="-left-6 size-7 xl:-left-12 xl:size-8" />
        <CarouselContent className="pb-4">
         {data.imageItems.map((el)=>{
         return    <CarouselItem key={el.id}>
            <ImageBanner
                src={el.image?.url}
                alt={el.image?.name}
                width={data.width}
                height={data.height}
                style={{ objectFit: "cover" }}
                className="rounded-xl border border-border shadow-lg object-fit"
              />
               </CarouselItem>
         
         })}
        </CarouselContent>
        <CarouselNext className="-right-6 size-7 xl:-right-12 xl:size-8" />
      </Carousel>
    </section>
  );
}
