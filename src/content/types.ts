import type { StaticImageData } from "next/image";

export type ProjectSlug =
  "plate-tracker" | "trading-platforms" | "freelance" | "multicam";

export type GalleryImage = {
  image: StaticImageData;
  alt: string;
  /** Set for animated GIFs, which gain nothing from the image optimizer. */
  unoptimized?: boolean;
};

export type ExternalLink = {
  label: string;
  href: string;
};

/** Items that can sit together inside a single gallery section. */
export type GalleryItem =
  | { kind: "video"; src: string; width: number; height: number }
  | { kind: "embed"; src: string; title: string; width: number; height: number }
  | { kind: "grid"; images: GalleryImage[] };

/**
 * Project pages are an ordered sequence of these. The order and mix genuinely
 * differ per project, so the page is driven by the list rather than a fixed
 * set of named slots.
 */
export type Block =
  /** An empty `title` renders the label column as a spacer, as the original did. */
  | { kind: "prose"; title?: string; paragraphs: string[]; cta?: ExternalLink }
  | { kind: "stack"; title: string; columns: string[][] }
  | { kind: "gallery"; items: GalleryItem[] }
  | {
      kind: "carousel";
      variant: "single" | "multi";
      label: string;
      images: GalleryImage[];
    }
  | { kind: "image"; image: GalleryImage }
  | { kind: "repoLink"; title: string; label: string; href: string };

export type Project = {
  slug: ProjectSlug;
  title: string;
  description: string;
  hero: {
    image: StaticImageData;
    alt: string;
    /** Large title laid over the hero. Only two projects use one. */
    overlayTitle?: string;
  };
  /** Nudge for the rotated title, tuned per project to the text length. */
  titleOffset: { top: number; left: number };
  /** How the project reads on the home page, with the name highlighted. */
  card: { before: string; highlight: string; after: string };
  blocks: Block[];
  next: { href: string; label: string; align: "left" | "centered" };
};
