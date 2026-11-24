/* eslint-disable @next/next/no-img-element */
import type { ImgHTMLAttributes } from "react";

interface CustomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

/** Plain <img> that never overflows its container. Lazy by default. */
export default function CustomImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  decoding = "async",
  ...props
}: CustomImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={`responsive-image ${className}`.trim()}
      {...props}
    />
  );
}
