// Single source for work history, imported by both the site
// (src/content/experience.ts) and the resume generator (resume/content.mjs),
// so titles and durations cannot drift between them.
//
// Durations replace date ranges throughout. Bullets are keyed so each variant
// can select and order them without the wording changing between documents.

export const roles = [
  {
    id: "self",
    company: "Self-employed",
    title: "Data Analyst, Full Stack Software Engineer",
    duration: "1 yr 8 mos",
    location: "San Francisco",
    bullets: {
      analysis:
        "Used data analytics to identify inefficiencies in an event contracts market, analyzing datasets in Python to optimize trading strategies.",
      build:
        "Built a full-stack application and database to ingest and analyze market data and automate trading strategies.",
      result:
        "Traded over 2 million contracts and achieved over $70k in quarterly profits prior to the market closing.",
    },
  },
  {
    id: "stratus",
    company: "Stratus Data",
    title: "Data Science Consultant, Software Engineer",
    duration: "1 yr 8 mos",
    location: "San Francisco / Remote",
    bullets: {
      nasco:
        "Developed data pipelines using SQL, Python, DBT and Snowflake for Nasco Healthcare. Created visualizations that identified supply chain bottlenecks and increased monthly OTIF shipments by over 20%.",
      hancock:
        "Analyzed profitability across employees, branches and regions for Hancock Askew & Co. Delivered a staffing analysis designed to save $200k in overtime pay during tax season.",
      miner:
        "Scraped millions of manually written invoices using Python, regex and natural language processing for The Miner Corporation, producing a standardized parts catalog that saved sales representatives thousands of hours annually.",
      caremessage:
        "Analyzed millions of outreach messages from community healthcare centers for CareMessage using Python and NLP, identifying response-rate trends and writing a messaging guide that lifted response rates by up to 30%.",
      platform:
        "As the sole full-stack engineer, built and launched Stratus Apps, a client-facing web portal, plus internal tooling that let data scientists ship client dashboards themselves.",
    },
  },
  {
    id: "quantum",
    company: "Quantum Metric",
    title: "Customer Success Engineer",
    duration: "1 yr",
    location: "San Francisco / Remote",
    bullets: {
      book: "Primary customer success engineer servicing over $5M in contracts for brands including StubHub, Western Union, eBay, Lululemon and CSAA Insurance.",
      stakeholders:
        "Created data visualizations, met daily with stakeholders and presented findings at quarterly business reviews.",
      enablement: "Hosted regular on-site events and led customer trainings.",
      growth:
        "Helped account executives generate leads and expand contracts with existing clients by introducing new teams to the product.",
      code: "Wrote clean, readable instrumentation code to gather analytics data and help brands measure their KPIs.",
    },
  },
  {
    id: "bosco",
    company: "The Bosco",
    title: "Product Designer",
    duration: "3 yrs 4 mos",
    location: "San Francisco",
    bullets: {
      products:
        "Lead designer on new core products generating over $10M in revenue, including The Bosco Lite and The Bosco Multicam.",
      team: "Launched The Bosco's San Francisco office; hired and managed a team of 6.",
    },
  },
];
