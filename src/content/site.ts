/**
 * Absolute origin, used for the sitemap and robots records. Only read on the
 * server, and both of those routes are generated during `next build`, so this
 * has to be set at build time — see the SITE_URL build arg in the Dockerfile.
 */
export const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
