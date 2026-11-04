export { roles } from "../src/content/roles.mjs";

// Single source for every résumé variant. Durations replace date ranges
// throughout, so the same role text serves all three.

export const contact = {
  name: "Addison Moore",
  email: "addisondrewmoore@gmail.com",
  phone: "(510) 333-5490",
  linkedin: "linkedin.com/in/addison-moore",
  github: "github.com/addison-moore",
  location: "San Francisco, CA",
};

export const skills = {
  data: "Tableau, Power BI, Pandas, Snowflake, BigQuery, GCP, DBT, Jupyter, Apache Airflow, PostgreSQL, MySQL, MongoDB, business intelligence, data visualization, SQL optimization",
  languages: "Python, JavaScript/TypeScript, SQL, HTML, CSS, Bash, French",
  frameworks: "React, React Native, Next.js, Flask, Django",
  server: "Node.js, Express, Linux, Docker, NGINX, RESTful APIs, Proxmox, VMs",
};

export const projects = {
  cronium: {
    name: "Cronium",
    links: "cronium.app · github.com/addison-moore/cronium",
    summary:
      "Self-hosted automation platform that schedules, chains and monitors Python, Node.js and Bash scripts across servers over SSH. Visual workflow builder with conditional branching, streaming logs, encrypted credentials and role-based access. Docker Compose; AGPL-3.0.",
  },
  familyArchive: {
    name: "FamilyArchive",
    links: "family-archive.net · github.com/addison-moore/FamilyArchive",
    summary:
      "Self-hosted family history archive: family tree, photo and home-movie library, GEDCOM import and merge, on-device OCR of scanned documents and local face detection. Postgres with local or S3-compatible storage, contributor review and audit log. AGPL-3.0.",
  },
  trading: {
    name: "Trading platforms",
    links: "addisonmoore.me/trading-platforms",
    summary:
      "38North identifies arbitrage opportunities and automates strategies across cryptocurrency exchanges; Oracle Insights analyzes prediction markets and configures volatility and arbitrage alerts. Building automated trading systems since 2017.",
  },
};

export const education = [
  {
    institution: "General Assembly",
    detail: "Software Engineering Immersive, 4 month full-time program",
    location: "San Francisco",
  },
  {
    institution: "California State University, Monterey Bay",
    detail: "BA, Visual and Public Art (Digital Art and 3D Design)",
  },
  {
    institution: "Certificates",
    detail:
      "University of Michigan: Python Data Structures · Meta Backend Certificate",
  },
];
