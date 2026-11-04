import { test, expect, type Page } from "@playwright/test";

// The general variant carries all of these; narrower variants carry a subset.
const PROJECTS = [
  { slug: "cronium", title: "Cronium" },
  { slug: "family-archive", title: "FamilyArchive" },
  { slug: "trading-platforms", title: "Trading Platforms" },
  { slug: "freelance", title: "Freelance" },
  { slug: "multicam", title: "Multicam" },
];

const PROJECT_LINK =
  /href="\/(cronium|family-archive|trading-platforms|freelance|multicam)"/g;

/** Uncaught exceptions, rather than console noise from third-party embeds. */
function collectPageErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  return errors;
}

test("home renders and lists every project", async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto("/");

  await expect(page).toHaveTitle("Addison Moore");
  await expect(
    page.getByRole("heading", { name: "Addison Moore" }),
  ).toBeVisible();

  for (const project of PROJECTS) {
    await expect(page.locator(`a[href="/${project.slug}"]`)).toBeVisible();
  }

  expect(errors).toEqual([]);
});

for (const project of PROJECTS) {
  test(`${project.slug} renders`, async ({ page }) => {
    const errors = collectPageErrors(page);
    const response = await page.goto(`/${project.slug}`);

    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(`${project.title} — Addison Moore`);
    await expect(
      page.getByRole("heading", { name: project.title }).first(),
    ).toBeVisible();

    // The footer is in the root layout, so it should be on every page.
    await expect(page.locator("footer")).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("unknown slug returns 404", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  expect(response?.status()).toBe(404);
});

test("home links through to a project page", async ({ page }) => {
  await page.goto("/");
  await page.locator('a[href="/cronium"]').click();
  await expect(page).toHaveURL(/\/cronium$/);
  await expect(page).toHaveTitle("Cronium — Addison Moore");
});

test("carousel advances, tracks position and loops", async ({ page }) => {
  await page.goto("/cronium");

  const bullets = page.locator('[aria-label^="Go to slide"]');
  await expect(bullets).toHaveCount(4);
  await expect(bullets.first()).toHaveAttribute("aria-current", "true");

  await page.getByLabel("Next slide").click();
  await expect(bullets.nth(1)).toHaveAttribute("aria-current", "true");

  // Wrapping backwards from the first slide should land on the last.
  await page.getByLabel("Previous slide").click();
  await page.getByLabel("Previous slide").click();
  await expect(bullets.nth(3)).toHaveAttribute("aria-current", "true");

  // Jumping directly by bullet works too.
  await bullets.nth(2).click();
  await expect(bullets.nth(2)).toHaveAttribute("aria-current", "true");
});

test("email copies to the clipboard", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");

  await page
    .getByRole("button", { name: /addisondrewmoore@gmail\.com/ })
    .click();

  await expect(page.getByText("Copied to clipboard!")).toBeVisible();
  const clipboard = await page.evaluate(() => navigator.clipboard.readText());
  expect(clipboard).toBe("addisondrewmoore@gmail.com");

  // The label resets itself shortly afterwards.
  await expect(page.getByText("Copied to clipboard!")).toBeHidden({
    timeout: 5000,
  });
});

test("serves robots.txt and a sitemap covering every route", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("User-Agent: *");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const project of PROJECTS) {
    expect(xml).toContain(`/${project.slug}`);
  }
});

test("resume is served as a PDF", async ({ request }) => {
  const response = await request.get("/resume.pdf");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("pdf");
});

// --- Variant routing -------------------------------------------------------
// The variant is chosen from the request host, so these drive the Host header
// directly rather than relying on *.localhost resolving.

function withHost(baseURL: string | undefined, label: string) {
  const { port } = new URL(baseURL ?? "http://127.0.0.1:3100");
  return { Host: `${label}.localhost:${port}` };
}

test("the apex host serves the indexable general variant", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Allow: /");

  const home = await request.get("/");
  expect(await home.text()).not.toContain('name="robots"');
});

for (const label of ["dev", "data"]) {
  test(`${label} host resolves to its own variant and is not indexable`, async ({
    request,
    baseURL,
  }) => {
    const headers = withHost(baseURL, label);

    const robots = await request.get("/robots.txt", { headers });
    expect(await robots.text()).toContain("Disallow: /");

    const home = await request.get("/", { headers });
    expect(home.status()).toBe(200);
    expect(await home.text()).toContain('name="robots" content="noindex');

    // The sitemap for a non-indexable host lists nothing.
    const sitemap = await request.get("/sitemap.xml", { headers });
    expect(await sitemap.text()).not.toContain("<loc>");
  });
}

test("each variant links and serves its own resume", async ({
  request,
  baseURL,
}) => {
  const expected = {
    "": "/resume-general.pdf",
    dev: "/resume-dev.pdf",
    data: "/resume-data.pdf",
  };

  for (const [label, href] of Object.entries(expected)) {
    const headers = label ? withHost(baseURL, label) : undefined;
    const home = await request.get("/", headers ? { headers } : {});
    expect(await home.text()).toContain(`href="${href}"`);

    const pdf = await request.get(href);
    expect(pdf.status()).toBe(200);
    expect(pdf.headers()["content-type"]).toContain("pdf");
  }
});

test("every variant shows work history with durations, not dates", async ({
  request,
  baseURL,
}) => {
  for (const label of ["", "dev", "data"]) {
    const headers = label ? withHost(baseURL, label) : undefined;
    const html = await (
      await request.get("/", headers ? { headers } : {})
    ).text();

    expect(html).toContain("Experience");
    for (const company of [
      "Self-employed",
      "Stratus Data",
      "Quantum Metric",
      "The Bosco",
    ]) {
      expect(html).toContain(company);
    }
    expect(html).toContain("3 yrs 4 mos");

    // Month names would mean a date range slipped back in.
    expect(html).not.toMatch(
      /\b(January|February|March|April|June|July|August|September|October|November|December)\b/,
    );
  }
});

test("variants show different copy and different projects", async ({
  request,
  baseURL,
}) => {
  const read = async (label: string) => {
    const headers = label ? withHost(baseURL, label) : undefined;
    return (await request.get("/", headers ? { headers } : {})).text();
  };

  const [general, dev, data] = await Promise.all([
    read(""),
    read("dev"),
    read("data"),
  ]);

  // Each leads with its own positioning.
  expect(dev).toContain("product-minded builder");
  expect(data).toContain("customer success engineer");
  expect(general).not.toContain("product-minded builder");

  // data carries a narrowed project list; general carries all five.
  const links = (html: string) => [...html.matchAll(PROJECT_LINK)].length;
  expect(links(general)).toBe(5);
  expect(links(data)).toBe(3);

  // data carries both open-source projects but none of the older pieces.
  expect(data).toContain('href="/cronium"');
  expect(data).toContain('href="/family-archive"');
  expect(data).not.toContain('href="/multicam"');

  // Both of those cards are reframed for the data audience.
  expect(data).toContain("recurring data jobs");
  expect(data).toContain("structured family records");
  expect(general).not.toContain("structured family records");
});

test("internal variant segments are not reachable", async ({ request }) => {
  for (const path of [
    "/general",
    "/build",
    "/data",
    "/general/cronium",
    "/build/freelance",
  ]) {
    expect((await request.get(path)).status()).toBe(404);
  }
});
