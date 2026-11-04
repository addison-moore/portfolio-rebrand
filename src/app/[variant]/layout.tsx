import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { originForVariant } from "@/content/site";
import { getVariant } from "@/content/variants";

export async function generateMetadata({
  params,
}: LayoutProps<"/[variant]">): Promise<Metadata> {
  const { variant: id } = await params;
  const variant = getVariant(id);

  if (!variant) return {};

  return {
    metadataBase: new URL(originForVariant(variant.id)),
    title: variant.title,
    description: variant.description,
    // Targeted variants are pasted into applications, not discovered. Paired
    // with the per-host robots.txt so both signals agree.
    robots: variant.indexable ? undefined : { index: false, follow: false },
  };
}

export default async function VariantLayout({
  children,
  params,
}: LayoutProps<"/[variant]">) {
  const { variant } = await params;

  if (!getVariant(variant)) notFound();

  return children;
}
