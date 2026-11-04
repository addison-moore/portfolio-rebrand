import type { StaticImageData } from "next/image";

export type ProjectSlug =
  "cronium" | "family-archive" | "trading-platforms" | "freelance" | "multicam";

/**
 * Each variant is a differently framed cut of the same material, served from
 * its own host. "general" is the superset and lives at the apex domain.
 */
export type VariantId = "general" | "dev" | "data";

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

/** How a project reads on the home page, with the name highlighted. */
export type ProjectCard = {
  before: string;
  highlight: string;
  after: string;
};

/** Per-variant overrides, for the fields that need to read differently. */
export type ProjectFraming = {
  card?: ProjectCard;
  description?: string;
};

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
  card: ProjectCard;
  blocks: Block[];
  /**
   * Alignment of the trailing navigation button. It varies per page in the
   * original markup with no discernible rule, so it stays per project. Where
   * the button points is derived from the variant's ordering instead.
   */
  nextAlign: "left" | "centered";
  framing?: Partial<Record<VariantId, ProjectFraming>>;
};

/** One job. Bullets are keyed so variants select without rewording them. */
export type RoleRecord = {
  id: string;
  company: string;
  title: string;
  /** How long the job lasted, in place of a date range. */
  duration: string;
  location: string;
  /** Not every role defines every key, so lookups can miss. */
  bullets: Record<string, string | undefined>;
};

/** A variant's selection from a role's bullets, in display order. */
export type VariantRole = {
  id: string;
  bullets: string[];
};

export type Variant = {
  id: VariantId;
  /** Used for <title> and the OG title. */
  title: string;
  description: string;
  intro: string[];
  skills: string[][];
  resumeHref: string;
  /** Work history, in reverse-chronological order for every variant. */
  roles: VariantRole[];
  /** Ordered subset, driving both the home list and the next-project chain. */
  projects: ProjectSlug[];
  /** Targeted variants are handed out directly, not discovered via search. */
  indexable: boolean;
};
