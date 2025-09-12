"use client";

import { useEffect } from "react";

interface GAMBannerAdProps {
  adId: string; // ID of the div container
  sizes?: (string | number[])[]; // Slot sizes like ['fluid', [250, 250]]
  style?: React.CSSProperties; // Optional inline styles
}

export default function GAMAdUnit({ adId, sizes, style }: GAMBannerAdProps) {
   useEffect(() => {
    try {
      if (!window.googletag?.cmd) return;

      window.googletag.cmd.push(function () {
        let slot = window.googletag.pubads().getSlots().find((s:any) => s.getSlotElementId() === adId);
        // Hiển thị lại slot
        window.googletag.display(adId);
        window.googletag.pubads().refresh([slot]);
      });
    } catch (err) {
      console.error("GAM error:", err);
    }
  }, [adId, sizes]);

  return (
    <div id={adId} style={style} className="flex justify-center items-center my-2">
      {/* <script
        dangerouslySetInnerHTML={{
          __html: `
              googletag.cmd.push(function() { 
                googletag.display('${adId}');
              });
          `,
        }}
      /> */}
    </div>
  );
}
