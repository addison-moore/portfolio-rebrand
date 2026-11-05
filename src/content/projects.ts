import type {
  Project,
  ProjectCard,
  ProjectSlug,
  Variant,
  VariantId,
} from "./types";

import croniumCanvas from "@/assets/projects/cronium/cronium-canvas.png";
import croniumDashboard from "@/assets/projects/cronium/cronium-dashboard.png";
import croniumEditor from "@/assets/projects/cronium/cronium-editor.png";
import croniumRun from "@/assets/projects/cronium/cronium-run.png";

import familyArchiveLetter from "@/assets/projects/family-archive/family-archive-letter.png";
import familyArchiveMedia from "@/assets/projects/family-archive/family-archive-media.png";
import familyArchiveProfile from "@/assets/projects/family-archive/family-archive-profile.png";
import familyArchiveTree from "@/assets/projects/family-archive/family-archive-tree.png";

import tradingHero from "@/assets/projects/trading-platforms/trading-platforms_hero.png";
import northLaptop from "@/assets/projects/trading-platforms/38North_laptop.png";
import oracleLaptop from "@/assets/projects/trading-platforms/oracle-insights_laptop.png";

import ayaGrid from "@/assets/projects/freelance/aya-grid.jpg";
import aya1 from "@/assets/projects/freelance/aya_1.png";
import aya2 from "@/assets/projects/freelance/aya_2.png";
import aya3 from "@/assets/projects/freelance/aya_3.png";
import aya4 from "@/assets/projects/freelance/aya_4.png";
import aya5 from "@/assets/projects/freelance/aya_5.png";
import aya6 from "@/assets/projects/freelance/aya_6.png";
import aya7 from "@/assets/projects/freelance/aya_7.png";
import aya8 from "@/assets/projects/freelance/aya_8.png";
import aya9 from "@/assets/projects/freelance/aya_9.png";
import aya10 from "@/assets/projects/freelance/aya_10.png";
import aya11 from "@/assets/projects/freelance/aya_11.png";
import aya12 from "@/assets/projects/freelance/aya_12.png";

import multicamHero from "@/assets/projects/multicam/multicam.png";
import multicam2 from "@/assets/projects/multicam/multicam2.gif";
// Despite the original .gif extension, this file is an AVIF image sequence.
import multicam3 from "@/assets/projects/multicam/multicam3.avif";
import multicam4 from "@/assets/projects/multicam/multicam4.gif";
import multicam5 from "@/assets/projects/multicam/multicam5.gif";
import multicamRig0 from "@/assets/projects/multicam/MultiCam_0.jpg";
import multicamRig1 from "@/assets/projects/multicam/MultiCam_1.jpg";

// Ordered as the original markup had them: aya_5 leads, then 1–4, then 6–12.
// Fictional data in the real apps. Cronium's jobs genuinely ran and FamilyArchive's
// Hartwell family is the demo archive its own marketing site shows.
const CRONIUM_CANVAS = {
  image: croniumCanvas,
  alt: "A Cronium workflow on the canvas, branching on success, failure and always",
  crisp: true,
};
const CRONIUM_DASHBOARD = {
  image: croniumDashboard,
  alt: "The Cronium dashboard, with event, execution and server counts above recent activity",
  crisp: true,
};
const CRONIUM_EDITOR = {
  image: croniumEditor,
  alt: "Editing a Python event's script in Cronium's code editor",
  crisp: true,
};
const CRONIUM_RUN = {
  image: croniumRun,
  alt: "A Cronium workflow run, with each step's status, duration and the data it passed on",
  crisp: true,
};

const FAMILY_ARCHIVE_TREE = {
  image: familyArchiveTree,
  alt: "The FamilyArchive family tree, with a person's details open beside it",
  crisp: true,
};
const FAMILY_ARCHIVE_MEDIA = {
  image: familyArchiveMedia,
  alt: "The FamilyArchive media library: portraits, letters, certificates and postcards",
  crisp: true,
};
const FAMILY_ARCHIVE_LETTER = {
  image: familyArchiveLetter,
  alt: "A scanned letter in FamilyArchive above the text read from it by OCR",
  crisp: true,
};
const FAMILY_ARCHIVE_PROFILE = {
  image: familyArchiveProfile,
  alt: "A person's profile in FamilyArchive's dark theme, with the media they are tagged in",
  crisp: true,
};

const AYA_SHOTS = [
  aya5,
  aya1,
  aya2,
  aya3,
  aya4,
  aya6,
  aya7,
  aya8,
  aya9,
  aya10,
  aya11,
  aya12,
];

export const projects: Project[] = [
  {
    slug: "cronium",
    title: "Cronium",
    description:
      "A self-hosted automation platform that schedules scripts, chains them into workflows, and runs them on your own servers.",
    hero: {
      kind: "product",
      main: CRONIUM_CANVAS,
      left: CRONIUM_DASHBOARD,
      right: CRONIUM_EDITOR,
    },
    titleOffset: { top: 875, left: -146 },
    card: {
      kicker: "Open source · Self-hosted",
      blurb:
        "A self-hosted automation platform for scheduling and monitoring scripts.",
    },
    framing: {
      data: {
        card: {
          kicker: "Open source · Self-hosted",
          blurb:
            "A self-hosted platform for scheduling and monitoring recurring data jobs.",
        },
      },
    },
    blocks: [
      {
        kind: "prose",
        title: "Summary",
        paragraphs: [
          "Cronium is a self-hosted automation platform. It schedules scripts written in Python, Node.js or Bash, chains them into workflows, and runs them inside isolated containers or on your own machines over SSH.",
          "A visual workflow builder branches on success, failure or a condition the script sets, and runs independent branches in parallel. Logs stream in real time, every execution is kept, and failures notify Slack, Discord, Teams or email.",
        ],
        cta: { label: "Visit the website →", href: "https://cronium.app" },
      },
      {
        kind: "stack",
        title: "Stack",
        columns: [
          ["TypeScript", "Next.js", "React"],
          ["Go", "PostgreSQL", "Shell"],
          ["Docker", "Docker Compose", "SSH"],
        ],
      },
      {
        kind: "carousel",
        variant: "single",
        label: "Cronium screenshots",
        images: [
          CRONIUM_DASHBOARD,
          CRONIUM_EDITOR,
          CRONIUM_RUN,
          CRONIUM_CANVAS,
        ],
      },
      {
        kind: "prose",
        title: "Security",
        paragraphs: [
          "Credentials are encrypted at rest and execution payloads are signed, so a runner only accepts work from the orchestrator it trusts. Roles are enforced on the server rather than in the interface, and API tokens allow events, workflows, servers and variables to be managed programmatically.",
        ],
      },
      {
        kind: "repoLink",
        title: "Github",
        label: "Cronium",
        href: "https://github.com/addison-moore/cronium",
      },
    ],
    nextAlign: "centered",
  },

  {
    slug: "family-archive",
    title: "FamilyArchive",
    description:
      "A free, self-hosted home for a family's tree, photos, home movies and scanned letters — searchable and private by default.",
    hero: {
      kind: "product",
      main: FAMILY_ARCHIVE_TREE,
      left: FAMILY_ARCHIVE_MEDIA,
      right: FAMILY_ARCHIVE_LETTER,
    },
    titleOffset: { top: 875, left: -256 },
    card: {
      kicker: "Open source · Self-hosted",
      blurb: "A private, self-hosted home for a family's photos and history.",
    },
    framing: {
      data: {
        card: {
          kicker: "Open source · Self-hosted",
          blurb:
            "A self-hosted archive that imports, merges and searches structured family records.",
        },
      },
    },
    blocks: [
      {
        kind: "prose",
        title: "Summary",
        paragraphs: [
          "FamilyArchive is a free, open-source, self-hosted home for a family's tree, photos, home movies and scanned letters — searchable, taggable and private by default. There is no company account, no cloud sync and no telemetry.",
          "Families import an existing tree from Ancestry, FamilySearch or Gramps over GEDCOM, and overlapping imports can be merged person by person. Scanned letters and certificates run through on-device OCR so the names inside them become searchable.",
        ],
        cta: {
          label: "Visit the website →",
          href: "https://family-archive.net",
        },
      },
      {
        kind: "stack",
        title: "Stack",
        columns: [
          ["TypeScript", "Next.js", "React"],
          ["Drizzle ORM", "PostgreSQL", "React Flow"],
          ["Docker", "Docker Compose", "S3-compatible storage"],
        ],
      },
      {
        kind: "carousel",
        variant: "single",
        label: "FamilyArchive screenshots",
        images: [
          FAMILY_ARCHIVE_MEDIA,
          FAMILY_ARCHIVE_LETTER,
          FAMILY_ARCHIVE_PROFILE,
          FAMILY_ARCHIVE_TREE,
        ],
      },
      {
        kind: "prose",
        // Short enough for the label column on a phone.
        title: "Teams",
        paragraphs: [
          "Admins and editors change things directly while contributors submit suggestions for an editor to review, and an audit log records what changed. Face detection runs locally, originals are never modified, and media lives on local disk or any S3-compatible storage.",
        ],
      },
      {
        kind: "repoLink",
        title: "Github",
        label: "FamilyArchive",
        href: "https://github.com/addison-moore/FamilyArchive",
      },
    ],
    nextAlign: "centered",
  },

  {
    slug: "trading-platforms",
    title: "Trading Platforms",
    description:
      "Two proprietary trading platforms for automated crypto arbitrage and negative-risk alerting.",
    hero: {
      kind: "banner",
      image: tradingHero,
      alt: "A candlestick trading chart",
      overlayTitle: "Trading Platforms",
    },
    titleOffset: { top: 700, left: -348 },
    card: {
      kicker: "38North · Oracle Insights",
      blurb:
        "Designed and built for automated arbitrage trading and negative risk notifications.",
    },
    blocks: [
      {
        kind: "prose",
        title: "Summary",
        paragraphs: [
          "I built two propietary trading platforms from the ground up. Both platforms make it easy to automate trading and configure alerts.",
          "38North is a trading platform for identifying arbitrage opportunities and automating trading strategies between multiple cryptocurrency exchanges. It was originally built to take advantage of the 'Kimchi Premium' between US and South Korean exchanges.",
        ],
      },
      {
        kind: "image",
        image: {
          image: northLaptop,
          alt: "Laptop displaying 38 North trading",
        },
      },
      {
        // Deliberately unlabelled: the original used an empty heading here to
        // keep this paragraph aligned with the one above.
        kind: "prose",
        title: "",
        paragraphs: [
          "Oracle Insights is and application for analyzing and automating trading on Predictit. It allows for easy configuration of volitility and arbitrage alerts.",
        ],
      },
      {
        kind: "image",
        image: {
          image: oracleLaptop,
          alt: "Laptop displaying Oracle Insights",
        },
      },
      {
        kind: "stack",
        title: "Stack",
        columns: [
          ["React", "Typescript", "Emotion"],
          ["Webpack", "Babel", "Eslint"],
          ["MongoDB", "Express", "Node.js"],
          ["NGINX", "JWT", "Google OAuth"],
        ],
      },
    ],
    nextAlign: "centered",
  },

  {
    slug: "freelance",
    title: "Freelance",
    description:
      "Freelance web development: bespoke sites with custom content management, including photographer Aya Brackett's portfolio.",
    hero: {
      kind: "site",
      title: "Freelance",
      kicker: "AyaBrackett.com",
      grid: {
        image: ayaGrid,
        alt: "Portraits in the photo grid on Aya Brackett's website",
      },
    },
    titleOffset: { top: 770, left: -168 },
    card: {
      kicker: "AyaBrackett.com",
      blurb:
        "Beautiful sites with custom CMS, built as a freelance web developer.",
    },
    blocks: [
      {
        kind: "prose",
        title: "Summary",
        paragraphs: [
          "As a freelance web developer I've created beautifully designed websites with custom content management to suit my clients needs.",
          "I recently built a new website for photographer, Aya Brackett. The site features a custom built admin panel that allows for easy editing and and drag and drop reorganization of galleries, photos, and blog posts.",
        ],
        cta: {
          label: "Visit the website →",
          href: "https://www.ayabrackett.com/",
        },
      },
      {
        kind: "carousel",
        variant: "single",
        label: "AyaBrackett.com screenshots",
        images: AYA_SHOTS.map((image) => ({
          image,
          alt: "AyaBrackett.com Screenshot",
        })),
      },
      {
        kind: "stack",
        title: "Stack",
        columns: [
          ["React", "React DnD", "Sass"],
          ["Parcel", "Babel", "Eslint"],
          ["MongoDB", "Express", "Node.js"],
          ["Google OAuth", "JWT"],
        ],
      },
    ],
    nextAlign: "centered",
  },

  {
    slug: "multicam",
    title: "Multicam",
    description:
      "Product design, prototyping and manufacturing of the Multicam, a synchronised multi-camera rig built for The Bosco.",
    hero: {
      kind: "banner",
      image: multicamHero,
      alt: "The Multicam rig",
    },
    titleOffset: { top: 585, left: -163 },
    card: {
      kicker: "The Bosco",
      blurb: "Designed, prototyped and built a synchronised multi-camera rig.",
    },
    blocks: [
      {
        kind: "prose",
        title: "Summary",
        paragraphs: [
          "As product designer for The Bosco I had the opportunity to conceptualize and create several new products, including the Multicam. As lead designer on this project, I engineered, prototyped and commissioned manufacturing of the Multicam. I worked with our developers to design an elegant software solution for aligning, syncing, and simultaneously firing all of the cameras.",
        ],
      },
      {
        kind: "gallery",
        images: [
          {
            image: multicam2,
            alt: "Animation captured with the Multicam",
            unoptimized: true,
          },
          {
            image: multicam3,
            alt: "Animation captured with the Multicam",
            unoptimized: true,
          },
          {
            image: multicamRig0,
            alt: "The Multicam rig set up in a studio",
          },
          {
            image: multicamRig1,
            alt: "The Multicam rig capturing a jump",
          },
          {
            image: multicam4,
            alt: "Animation captured with the Multicam",
            unoptimized: true,
          },
          {
            image: multicam5,
            alt: "Animation captured with the Multicam",
            unoptimized: true,
          },
        ],
      },
    ],
    nextAlign: "left",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const projectSlugs = projects.map(
  (project) => project.slug,
) as ProjectSlug[];

/** The variant's projects, in its order. */
export function getProjectsFor(variant: Variant): Project[] {
  return variant.projects
    .map((slug) => getProject(slug))
    .filter((project): project is Project => project !== undefined);
}

export function cardFor(project: Project, id: VariantId): ProjectCard {
  return project.framing?.[id]?.card ?? project.card;
}

export function descriptionFor(project: Project, id: VariantId): string {
  return project.framing?.[id]?.description ?? project.description;
}

/**
 * Where the trailing button goes. The last project in a variant returns to the
 * home page, every other one advances — which reproduces the original chain
 * for the full ordering, and stays correct for a narrowed one.
 */
export function projectNav(
  variant: Variant,
  slug: ProjectSlug,
): { href: string; label: string } {
  const index = variant.projects.indexOf(slug);
  const next = index === -1 ? undefined : variant.projects[index + 1];
  return next
    ? { href: `/${next}`, label: "Next Project →" }
    : { href: "/", label: "Back to Portfolio →" };
}
