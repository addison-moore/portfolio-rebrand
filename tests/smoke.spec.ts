import { test, expect, type Page } from "@playwright/test";

const PROJECTS = [
  { slug: "plate-tracker", title: "Plate Tracker" },
  { slug: "trading-platforms", title: "Trading Platforms" },
  { slug: "freelance", title: "Freelance" },
  { slug: "multicam", title: "Multicam" },
];

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
  await expect(page.getByRole("heading", { name: "Addison Moore" })).toBeVisible();

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
  await page.locator('a[href="/plate-tracker"]').click();
  await expect(page).toHaveURL(/\/plate-tracker$/);
  await expect(page).toHaveTitle("Plate Tracker — Addison Moore");
});

test("carousel advances, tracks position and loops", async ({ page }) => {
  await page.goto("/plate-tracker");

  const bullets = page.locator('[aria-label^="Go to slide"]');
  await expect(bullets).toHaveCount(6);
  await expect(bullets.first()).toHaveAttribute("aria-current", "true");

  await page.getByLabel("Next slide").click();
  await expect(bullets.nth(1)).toHaveAttribute("aria-current", "true");

  // Wrapping backwards from the first slide should land on the last.
  await page.getByLabel("Previous slide").click();
  await page.getByLabel("Previous slide").click();
  await expect(bullets.nth(5)).toHaveAttribute("aria-current", "true");

  // Jumping directly by bullet works too.
  await bullets.nth(2).click();
  await expect(bullets.nth(2)).toHaveAttribute("aria-current", "true");
});

test("email copies to the clipboard", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");

  await page.getByRole("button", { name: /addisondrewmoore@gmail\.com/ }).click();

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
