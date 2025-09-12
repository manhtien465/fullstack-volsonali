"use client";

interface GAMBannerAdProps {
  adId: string; // ID of the div container
  sizes?: (string | number[])[]; // Slot sizes like ['fluid', [250, 250]]
  style?: React.CSSProperties; // Optional inline styles
}

export default function GAMBannerAd({ adId, sizes, style }: GAMBannerAdProps) {
  return (
    <div id={adId} style={style}>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              googletag.cmd.push(function() { 
                googletag.display('${adId}');
              });
          `,
        }}
      />
    </div>
  );
}
