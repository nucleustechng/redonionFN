import type { AnchorHTMLAttributes } from "react";

type Size = "md" | "lg";
type Variant = "primary" | "outline" | "light";

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-[15px]",
  lg: "min-h-13 px-7 text-base sm:text-[17px]",
};

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25",
  outline: "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
  light: "bg-white text-ink hover:bg-white/90",
};

/** Call-to-action link in the site's button styles. */
export default function CtaLink({
  size = "lg",
  variant = "primary",
  className = "",
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { size?: Size; variant?: Variant }) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
