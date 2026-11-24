import { Bricolage_Grotesque } from "next/font/google";

// Variable font; the optical-size axis keeps large headings tight and body text open.
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  variable: "--font-bricolage",
});
