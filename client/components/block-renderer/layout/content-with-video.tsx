import React from "react";
import type { ContentWithVideoProps } from "@/types";
import { cn } from "@/lib/utils";

import { Video } from "../blocks/video";


export function ContentWithVideo(data: Readonly<ContentWithVideoProps>) {
  if (!data ) return null;
  const { reverse, video, heading, subHeading, text,isDisplayText } = data;
  const revereStyle = reverse ? "md:flex-row-reverse" : "md:flex-row";

  return (
    <section
      className={cn("container flex flex-col gap-10 py-24 md:items-center md:gap-24", revereStyle)}
    >
      <div className="relative flex-1">
    
       <Video {...video} ></Video>
     
      </div>
     {isDisplayText ? <div className="flex flex-1 flex-col items-start gap-5">
        <div className="flex flex-col gap-3">
          <span className="font-bold uppercase text-primary text-left">{subHeading}</span>
          <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-left">
            {heading}
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-lg text-left">
          {text}
        </p>
        
      </div>
      :
      <div className="flex flex-1 flex-col items-start gap-5"></div>
      }
    </section>
  );
}
