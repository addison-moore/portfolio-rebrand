import Image from "next/image";
import Link from "next/link";
import { CopyEmail } from "@/components/CopyEmail/CopyEmail";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { Section } from "@/components/Section/Section";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import pdfIcon from "@/assets/pdf.png";
import styles from "./page.module.css";

export default function Home() {
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
            {profile.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Section>

        <Section title="Skills">
          {profile.skills.map((column, index) => (
            <ul key={index}>
              {column.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          ))}
        </Section>

        <Section title="Past Projects">
          <div>
            {projects.map((project) => (
              <div className={styles.project} key={project.slug}>
                <Link href={`/${project.slug}`}>
                  <p>
                    <span>
                      {project.card.before}
                      <span className={styles.projectName}>
                        {project.card.highlight}
                      </span>
                      {project.card.after}
                    </span>
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Get in touch">
          <div className={styles.contact}>
            <p>
              <CopyEmail email={profile.email} />
            </p>
            <div className={styles.resume}>
              <a href={profile.resumeHref}>
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
