import { Poppins } from "next/font/google";

// Poppins isn't a variable font, so load only the weights the site uses.
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});
