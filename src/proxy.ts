import { NextResponse, type NextRequest } from "next/server";
import { isVariantId, variantIdForHost } from "@/content/variants";

/**
 * Resolves the variant from the request host and rewrites into its segment,
 * so dev.addisonmoore.me/cronium renders /dev/cronium while the
 * address bar keeps showing /cronium.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The variant segment is an internal detail. Serving it directly would give
  // every page a second URL with duplicate content.
  if (isVariantId(pathname.split("/")[1] ?? "")) {
    return new NextResponse(null, { status: 404 });
  }

  const variant = variantIdForHost(request.headers.get("host") ?? "");

  return NextResponse.rewrite(
    new URL(`/${variant}${pathname}`, request.nextUrl),
  );
}

export const config = {
  // Everything except Next's internals and anything with a file extension,
  // which covers public assets plus robots.txt and sitemap.xml — those read
  // the host themselves rather than being rewritten.
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
