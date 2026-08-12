import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { ProjectBlocks } from "@/components/ProjectBlocks/ProjectBlocks";
import { ProjectHero } from "@/components/ProjectHero/ProjectHero";
import { Section } from "@/components/Section/Section";
import { getProject, projectSlugs } from "@/content/projects";

// Project pages live at the site root, as they always have. Unknown slugs fall
// through to notFound() below. Leaving dynamicParams at its default keeps that
// path quiet — setting it to false makes Next log an internal NoFallbackError
// for every 404, which on a public site means one per bot probe.

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: `${project.title} — Addison Moore`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <>
      <ProjectHero
        image={project.hero.image}
        alt={project.hero.alt}
        overlayTitle={project.hero.overlayTitle}
      />
      <PageTitle variant="project" offset={project.titleOffset}>
        {project.title}
      </PageTitle>
      <main>
        <ProjectBlocks blocks={project.blocks} />
        <Section variant={project.next.align}>
          <ButtonLink href={project.next.href}>{project.next.label}</ButtonLink>
        </Section>
      </main>
    </>
  );
}
