import localFont from "next/font/local";

// No weight descriptor, matching the original @font-face. The file is Light,
// but it was declared as the normal face, so text at font-weight 400 uses it
// directly rather than synthesising.
//
// preload is off because next/font emits the preload link on every route, and
// only the two project heroes with an overlay title ever render this face —
// preloading meant fetching 129KB on the home page to display nothing.
export const montserrat = localFont({
  src: "./Montserrat-Light.woff",
  variable: "--font-display",
  preload: false,
});
