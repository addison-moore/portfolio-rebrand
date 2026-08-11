import localFont from "next/font/local";

// No weight descriptor, matching the original @font-face. The file is Light,
// but it was declared as the normal face, so text at font-weight 400 uses it
// directly rather than synthesising.
export const montserrat = localFont({
  src: "./Montserrat-Light.woff",
  variable: "--font-display",
});
