import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits .next/standalone with a self-contained server.js so the Docker
  // runtime image does not need node_modules. Vercel builds through its own
  // output pipeline and does not use server.js, so leave it unset there
  // rather than producing a bundle nothing reads.
  output: process.env.VERCEL ? undefined : "standalone",
  images: {
    // Product screenshots are mostly thin text on flat colour, which the default
    // quality smears. Photographs stay at the default.
    qualities: [75, 90],
  },
};

export default nextConfig;
