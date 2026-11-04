import type { ProjectSlug, Variant, VariantId, VariantRole } from "./types";

// Current open-source work leads, then the older portfolio pieces.
const ALL_PROJECTS: ProjectSlug[] = [
  "cronium",
  "family-archive",
  "trading-platforms",
  "freelance",
  "multicam",
];

const CLOSING =
  "I'm currently open to new opportunities, so feel free to get in touch!";

// Bullet selections mirror the résumé variants, so a reader who has both sees
// the same emphasis in each.
const ROLES_GENERAL: VariantRole[] = [
  { id: "self", bullets: ["build", "analysis", "result"] },
  { id: "stratus", bullets: ["nasco", "hancock", "platform"] },
  { id: "quantum", bullets: ["book", "stakeholders"] },
  { id: "bosco", bullets: ["products", "team"] },
];

const ROLES_DEV: VariantRole[] = [
  { id: "self", bullets: ["build", "analysis", "result"] },
  { id: "stratus", bullets: ["platform", "miner"] },
  { id: "quantum", bullets: ["code", "book"] },
  { id: "bosco", bullets: ["products", "team"] },
];

const ROLES_DATA: VariantRole[] = [
  { id: "self", bullets: ["analysis", "build", "result"] },
  { id: "stratus", bullets: ["nasco", "hancock", "caremessage", "platform"] },
  { id: "quantum", bullets: ["book", "stakeholders", "growth"] },
  { id: "bosco", bullets: ["products", "team"] },
];

const INTRO_GENERAL = [
  "Hi, I'm Addison, a software engineer and data solutions consultant from the San Francisco Bay Area. Over about ten years I've built business intelligence for enterprise clients, shipped full-stack products end to end, and released open-source tools.",
  "I've worked with dozens of enterprise clients and picked up a wide range of tools and languages along the way, most of it in service of helping people find value in their data.",
  CLOSING,
];

const SKILLS_GENERAL = [
  [
    "Javascript, Typescript",
    "SCSS, Bootstrap, Emotion",
    "React, React-Native",
    "Python, Django, Flask",
    "Babel, Jest, Eslint",
    "HTML5 + CSS3",
    "Sketch, Figma",
    "Conversational French",
  ],
  [
    "Docker, Linux, NGINX",
    "BigQuery, Firebase, Snowflake",
    "MongoDB, PostgreSQL",
    "Jupyter Lab, Pandas, Numpy",
    "RESTful APIs, Express",
    "Apache Airflow, DAGs",
    "Git, GCP, AWS Lambda",
    "Tableau, Power BI, DAX",
  ],
];

const INTRO_DEV = [
  "Hi, I'm Addison, a software engineer and product-minded builder from the San Francisco Bay Area. I've been writing code for about ten years, and I do my best work on small teams where the person designing the thing is also the person who ships it.",
  "I've designed, built and released several open-source products end to end, including Cronium, a self-hosted automation platform, and FamilyArchive, a private home for a family's photos and history. Since 2017 I've been building systems that automate trading on crypto and prediction markets.",
  CLOSING,
];

const SKILLS_DEV = [
  [
    "Python, Javascript, Typescript",
    "React, React-Native, Next.js",
    "Node.js, Express, RESTful APIs",
    "Django, Flask",
    "HTML5 + CSS3, SCSS",
    "Babel, Jest, Eslint",
    "Sketch, Figma",
    "Conversational French",
  ],
  [
    "Docker, Linux, NGINX",
    "Proxmox, VMs, self-hosting",
    "MongoDB, PostgreSQL, MySQL",
    "Git, GCP, AWS Lambda",
    "BigQuery, Snowflake, Firebase",
    "Pandas, Numpy, Jupyter Lab",
    "Apache Airflow, DAGs, DBT",
    "Tableau, Power BI",
  ],
];

const INTRO_DATA = [
  "Hi, I'm Addison, a data solutions consultant and customer success engineer from the San Francisco Bay Area, with six years implementing business intelligence for enterprise clients.",
  "Most recently I was a data science consultant at Stratus Data and a customer success engineer at Quantum Metric. I've built data pipelines, created visualizations that moved operational metrics, and translated complex technical work for the people who had to act on it.",
  CLOSING,
];

const SKILLS_DATA = [
  [
    "Tableau, Power BI, DAX",
    "BigQuery, Snowflake, GCP",
    "Pandas, Numpy, Jupyter Lab",
    "Apache Airflow, DAGs, DBT",
    "PostgreSQL, MySQL, MongoDB",
    "SQL optimization",
    "Data visualization",
    "Business intelligence",
  ],
  [
    "Python, Javascript, Typescript",
    "Django, Flask",
    "RESTful APIs, Express",
    "React, React-Native",
    "Docker, Linux, NGINX",
    "Git, GCP, AWS Lambda",
    "Firebase",
    "Conversational French",
  ],
];

export const variants: Variant[] = [
  {
    id: "general",
    title: "Addison Moore",
    description:
      "Software engineer and data solutions consultant in the San Francisco Bay Area.",
    intro: INTRO_GENERAL,
    skills: SKILLS_GENERAL,
    roles: ROLES_GENERAL,
    resumeHref: "/resume-general.pdf",
    projects: ALL_PROJECTS,
    indexable: true,
  },
  {
    id: "dev",
    title: "Addison Moore",
    description:
      "Software engineer and product-minded builder in the San Francisco Bay Area.",
    intro: INTRO_DEV,
    skills: SKILLS_DEV,
    roles: ROLES_DEV,
    resumeHref: "/resume-dev.pdf",
    projects: ["cronium", "family-archive", "trading-platforms", "multicam"],
    indexable: false,
  },
  {
    id: "data",
    title: "Addison Moore",
    description:
      "Data solutions consultant and customer success engineer in the San Francisco Bay Area.",
    intro: INTRO_DATA,
    skills: SKILLS_DATA,
    roles: ROLES_DATA,
    resumeHref: "/resume-data.pdf",
    projects: ["cronium", "family-archive", "trading-platforms"],
    indexable: false,
  },
];

export const DEFAULT_VARIANT: VariantId = "general";

export const variantIds = variants.map((variant) => variant.id);

export function isVariantId(value: string): value is VariantId {
  return variantIds.some((id) => id === value);
}

export function getVariant(id: string): Variant | undefined {
  return variants.find((variant) => variant.id === id);
}

/**
 * Resolves the leading host label: dev.addisonmoore.me and dev.localhost:4311
 * both select "dev". Anything unrecognised, the apex and www included, is the
 * general variant.
 *
 * Kept free of any import that pulls in image assets, because middleware
 * imports this.
 */
export function variantIdForHost(host: string): VariantId {
  const label = host.split(":")[0].toLowerCase().split(".")[0];
  return isVariantId(label) ? label : DEFAULT_VARIANT;
}
