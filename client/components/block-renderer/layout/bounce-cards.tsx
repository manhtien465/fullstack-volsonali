import BounceCards from "@/components/custom/bounce-cards/bounceCards";
import { getStrapiMedia } from "@/lib/utils";
import React from "react";


export function BounceCardsLayout(data: Readonly<any>) {
    const images = [
        "https://picsum.photos/400/400?grayscale",
        "https://picsum.photos/500/500?grayscale",
        "https://picsum.photos/600/600?grayscale",
        "https://picsum.photos/700/700?grayscale",
        "https://picsum.photos/300/300?grayscale"
      ];
      
      const transformStyles = [
        "rotate(5deg) translate(-150px)",
        "rotate(0deg) translate(-70px)",
        "rotate(-5deg)",
        "rotate(5deg) translate(70px)",
        "rotate(-5deg) translate(150px)"
      ];
  if (!data ) return null;
  return (
    <div className="container flex flex-col items-center overflow-hidden">
        <BounceCards
               className="custom-bounceCards"
               images={data.images.map((image:any)=>getStrapiMedia(image.url)) ?? images}
               containerWidth={data.containerWidth ?? 500}
               containerHeight={data.containerHeight?? 250}
               animationDelay={data.animationDelay ?? 1}
               animationStagger={data.animationStagger?? 0.08}
               easeType={data.easeType ?? "elastic.out(1, 0.5)"}
               transformStyles={data.transformStyles??transformStyles}
               enableHover={true}
            />
    </div>
  );
}
