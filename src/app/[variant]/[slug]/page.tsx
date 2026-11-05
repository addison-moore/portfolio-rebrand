import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { ProjectBlocks } from "@/components/ProjectBlocks/ProjectBlocks";
import { ProjectHero } from "@/components/ProjectHero/ProjectHero";
import { Section } from "@/components/Section/Section";
import { descriptionFor, getProject, projectNav } from "@/content/projects";
import { getVariant, variants } from "@/content/variants";

// Projects live at the host root, as they always have — the proxy supplies
// the variant segment. Unknown slugs, and slugs a variant does not carry, fall
// through to notFound(). Leaving dynamicParams at its default keeps that path
// quiet: setting it to false makes Next log an internal NoFallbackError for
// every 404, which on a public site means one per bot probe.

export function generateStaticParams() {
  return variants.flatMap((variant) =>
    variant.projects.map((slug) => ({ variant: variant.id, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[variant]/[slug]">): Promise<Metadata> {
  const { variant: id, slug } = await params;
  const variant = getVariant(id);
  const project = getProject(slug);

  if (!variant || !project || !variant.projects.includes(project.slug)) {
    return {};
  }

  return {
    title: `${project.title} — Addison Moore`,
    description: descriptionFor(project, variant.id),
    alternates: { canonical: `/${project.slug}` },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/[variant]/[slug]">) {
  const { variant: id, slug } = await params;
  const variant = getVariant(id);
  const project = getProject(slug);

  // A project the variant does not carry is absent from that site entirely,
  // rather than reachable but unlinked.
  if (!variant || !project || !variant.projects.includes(project.slug)) {
    notFound();
  }

  const nav = projectNav(variant, project.slug);

  return (
    <>
      <ProjectHero slug={project.slug} hero={project.hero} />
      <PageTitle variant="project" offset={project.titleOffset}>
        {project.title}
      </PageTitle>
      <main>
        <ProjectBlocks blocks={project.blocks} />
        <Section variant={project.nextAlign}>
          <ButtonLink href={nav.href}>{nav.label}</ButtonLink>
        </Section>
      </main>
    </>
  );
}
