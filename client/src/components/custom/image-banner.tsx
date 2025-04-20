import Image from "next/image";
import { getStrapiURL } from "@/lib/utils";

interface StrapiImageProps {
  src: string;
  alt: string | null;
  className?: string;
  width?: number;
  height?: number;
  [key: string]: string | number | boolean | undefined | null | any;
}

export function ImageBanner({
  src,
  alt,
  className,
  width = 1400,
  height = 500, 
  ...rest
}: Readonly<StrapiImageProps>) {
  const imageUrl = getStrapiMedia(src);
  if (!imageUrl) return null;

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      <Image
        src={imageUrl}
        alt={alt || "No alt text provided."}
        className={className}
        width={width}
        height={height}
        {...rest}
      />
    </div>
  );
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return getStrapiURL() + url;
}