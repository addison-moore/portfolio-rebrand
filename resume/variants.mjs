// Roles stay in the same (reverse-chronological) order in every variant.
// Without dates on the page a reader assumes that order, so only the choice
// and emphasis of bullets changes between documents, never the sequence.

export const resumeVariants = [
  {
    id: "general",
    file: "resume-general.pdf",
    website: "addisonmoore.me",
    summary:
      "Software engineer and data solutions consultant with ten years building software — business intelligence for enterprise clients, full-stack products shipped end to end, and open-source tools used in production. Proven track record of optimizing data pipelines, creating impactful visualizations, and translating complex technical concepts for stakeholders.",
    skillOrder: ["data", "languages", "frameworks", "server"],
    roles: [
      { id: "self", bullets: ["build", "analysis", "result"] },
      { id: "stratus", bullets: ["nasco", "hancock", "platform"] },
      { id: "quantum", bullets: ["book", "stakeholders"] },
      { id: "bosco", bullets: ["products", "team"] },
    ],
    projects: ["cronium", "familyArchive"],
  },
  {
    id: "dev",
    file: "resume-dev.pdf",
    website: "dev.addisonmoore.me",
    summary:
      "Software engineer with ten years writing code, most at home on a small team where the person designing the product also ships it. I have built and released several open-source products end to end, and have been building automated trading systems since 2017.",
    skillOrder: ["languages", "frameworks", "server", "data"],
    roles: [
      { id: "self", bullets: ["build", "analysis", "result"] },
      { id: "stratus", bullets: ["platform", "miner"] },
      { id: "quantum", bullets: ["code", "book"] },
      { id: "bosco", bullets: ["products", "team"] },
    ],
    projects: ["cronium", "familyArchive", "trading"],
  },
  {
    id: "data",
    file: "resume-data.pdf",
    website: "data.addisonmoore.me",
    summary:
      "Data solutions consultant and customer success engineer with 6+ years implementing business intelligence solutions for enterprise clients. Proven track record of optimizing data pipelines, creating impactful visualizations, and translating complex technical concepts for stakeholders.",
    skillOrder: ["data", "languages", "server", "frameworks"],
    roles: [
      { id: "self", bullets: ["analysis", "build", "result"] },
      {
        id: "stratus",
        bullets: ["nasco", "hancock", "caremessage", "platform"],
      },
      {
        id: "quantum",
        bullets: ["book", "stakeholders", "growth"],
      },
      { id: "bosco", bullets: ["products", "team"] },
    ],
    projects: ["cronium", "familyArchive"],
  },
];

export const skillLabels = {
  data: "Data",
  languages: "Languages",
  frameworks: "Frameworks & Libraries",
  server: "Server & Infrastructure",
};
