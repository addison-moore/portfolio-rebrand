import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { contact, education, projects, roles, skills } from "./content.mjs";
import { resumeVariants, skillLabels } from "./variants.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "public");
const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const roleById = Object.fromEntries(roles.map((role) => [role.id, role]));

const CSS = `
  @page { size: Letter; margin: 0.5in; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 9.5pt;
    line-height: 1.22;
    color: #111;
  }
  h1 { font-size: 18pt; margin: 0; letter-spacing: 0.02em; }
  .contact { font-size: 8.4pt; color: #333; margin: 2pt 0 7pt; }
  .contact span + span::before { content: " · "; color: #999; }
  .summary { margin: 0 0 7pt; }
  h2 {
    font-size: 9.5pt;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0 0 4pt;
    padding-bottom: 2pt;
    border-bottom: 0.75pt solid #111;
  }
  section { margin-bottom: 5.5pt; }
  .skill { margin-bottom: 2pt; }
  .skill b { font-weight: bold; }
  .role { margin-bottom: 4pt; page-break-inside: avoid; }
  .role-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12pt;
  }
  .role-title { font-weight: bold; }
  .role-meta { font-size: 8.4pt; color: #444; white-space: nowrap; }
  ul { margin: 2pt 0 0; padding-left: 14pt; }
  li { margin-bottom: 0; }
  .project { margin-bottom: 4pt; page-break-inside: avoid; }
  .project-name { font-weight: bold; }
  .project-links { font-size: 8.4pt; color: #444; }
  .edu { margin-bottom: 4pt; }
  .edu b { font-weight: bold; }
`;

function renderHtml(variant) {
  const skillRows = variant.skillOrder
    .map(
      (key) =>
        `<div class="skill"><b>${esc(skillLabels[key])}:</b> ${esc(skills[key])}</div>`,
    )
    .join("");

  const roleRows = variant.roles
    .map(({ id, bullets }) => {
      const role = roleById[id];
      const items = bullets
        .map((key) => `<li>${esc(role.bullets[key])}</li>`)
        .join("");
      return `
        <div class="role">
          <div class="role-head">
            <div class="role-title">${esc(role.company)} — ${esc(role.title)}</div>
            <div class="role-meta">${esc(role.duration)}</div>
          </div>
          <div class="role-meta">${esc(role.location)}</div>
          <ul>${items}</ul>
        </div>`;
    })
    .join("");

  const projectRows = variant.projects
    .map((key) => {
      const project = projects[key];
      return `
        <div class="project">
          <div><span class="project-name">${esc(project.name)}</span>
            <span class="project-links">${esc(project.links)}</span></div>
          <div>${esc(project.summary)}</div>
        </div>`;
    })
    .join("");

  const eduRows = education
    .map(
      (entry) =>
        `<div class="edu"><b>${esc(entry.institution)}</b> — ${esc(entry.detail)}</div>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${esc(contact.name)} — Resume</title><style>${CSS}</style></head>
<body>
  <h1>${esc(contact.name)}</h1>
  <div class="contact">
    <span>${esc(contact.location)}</span><span>${esc(contact.phone)}</span><span>${esc(contact.email)}</span><span>${esc(variant.website)}</span><span>${esc(contact.linkedin)}</span><span>${esc(contact.github)}</span>
  </div>
  <p class="summary">${esc(variant.summary)}</p>
  <section><h2>Technical Skills</h2>${skillRows}</section>
  <section><h2>Experience</h2>${roleRows}</section>
  ${projectRows ? `<section><h2>Projects</h2>${projectRows}</section>` : ""}
  <section><h2>Education</h2>${eduRows}</section>
</body></html>`;
}

const browser = await chromium.launch({ executablePath: CHROME });
await mkdir(outDir, { recursive: true });

for (const variant of resumeVariants) {
  const html = renderHtml(variant);
  if (process.env.KEEP_HTML) {
    await writeFile(join(here, `${variant.id}.html`), html);
  }
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await page.pdf({
    path: join(outDir, variant.file),
    format: "Letter",
    printBackground: true,
  });
  if (variant.id === "general") {
    // Keeps the long-standing /resume.pdf URL in step with the rewrite.
    await page.pdf({
      path: join(outDir, "resume.pdf"),
      format: "Letter",
      printBackground: true,
    });
  }
  console.log(`${variant.file.padEnd(20)} rendered`);
  await page.close();
}

await browser.close();
