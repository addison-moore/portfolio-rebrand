import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CopyEmail } from "@/components/CopyEmail/CopyEmail";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { ProjectCard } from "@/components/ProjectCard/ProjectCard";
import { Section } from "@/components/Section/Section";
import { profile } from "@/content/profile";
import { getRole } from "@/content/experience";
import { cardFor, getProjectsFor } from "@/content/projects";
import { getVariant, variantIds } from "@/content/variants";
import pdfIcon from "@/assets/pdf.png";
import styles from "./page.module.css";

export function generateStaticParams() {
  return variantIds.map((variant) => ({ variant }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[variant]">): Promise<Metadata> {
  const { variant: id } = await params;

  return getVariant(id) ? { alternates: { canonical: "/" } } : {};
}

export default async function Home({ params }: PageProps<"/[variant]">) {
  const { variant: id } = await params;
  const variant = getVariant(id);

  if (!variant) notFound();

  return (
    <>
      <PageTitle>{profile.name}</PageTitle>
      <main>
        <header>
          <Image
            className={styles.avatar}
            src={profile.avatar}
            alt={profile.avatarAlt}
            priority
          />
        </header>

        <Section title="Intro">
          <div>
            {variant.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Section>

        {variant.history ? (
          <>
            <Section title="Experience">
              <div>
                {variant.history.roles.map(({ id, bullets }) => {
                  const role = getRole(id);
                  if (!role) return null;

                  return (
                    <div className={styles.role} key={id}>
                      <p className={styles.roleHead}>
                        <span className={styles.company}>{role.company}</span>
                        {" — "}
                        {role.title}
                        <span className={styles.duration}>{role.duration}</span>
                      </p>
                      <ul className={styles.roleBullets}>
                        {bullets.map((key) => {
                          const text = role.bullets[key];
                          return text ? <li key={key}>{text}</li> : null;
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section title="Skills">
              {variant.history.skills.map((column, index) => (
                <ul key={index}>
                  {column.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              ))}
            </Section>
          </>
        ) : null}

        <Section title="Projects" variant="cards">
          <div className={styles.cards}>
            {getProjectsFor(variant).map((project, index) => (
              <ProjectCard
                key={project.slug}
                slug={project.slug}
                title={project.title}
                copy={cardFor(project, variant.id)}
                preload={index === 0 && !variant.history}
              />
            ))}
          </div>
        </Section>

        <Section title="Get in touch">
          <div className={styles.contact}>
            <p>
              <CopyEmail email={profile.email} />
            </p>
            <div className={styles.resume}>
              <a href={variant.resumeHref}>
                <span>Resume</span>
                <Image className={styles.pdf} src={pdfIcon} alt="" />
              </a>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
