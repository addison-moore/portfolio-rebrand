import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits .next/standalone with a self-contained server.js, so the runtime
  // image does not need node_modules.
  output: "standalone",
};

export default nextConfig;
