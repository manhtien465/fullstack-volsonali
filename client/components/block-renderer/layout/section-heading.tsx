import React from "react";
import { cn } from "@/lib/utils";
import type { SectionHeadingProps } from "@/types";

export function SectionHeading(data: Readonly<SectionHeadingProps>) {
  if (!data) return null;
  const { heading, subHeading, text, centered = true } = data;

  const headingStyle = centered ? "flex flex-col text-center" : "";

  return (
    <div className={cn("container items-center justify-between gap-2 py-4", headingStyle)}>
      <div className="flex flex-col gap-3">
        <h1
          
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">{heading}</h1>
        {subHeading && <h3 className="text-2xl font-bold text-gray-900 mb-3">{subHeading}</h3>}
      {text &&  <p className="text-lg text-muted-foreground max-w-2xl">{text}</p>}

      </div>
    </div>
  );
}
