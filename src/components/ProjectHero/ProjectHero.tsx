import Image from "next/image";
import {
  CroniumWordmark,
  FamilyArchiveWordmark,
} from "@/components/icons/Wordmarks";
import type { ProjectHeroContent, ProjectSlug } from "@/content/types";
import { montserrat } from "@/fonts";
import croniumLogo from "@/assets/projects/cronium/cronium-logo.png";
import styles from "./ProjectHero.module.css";

type ProjectHeroProps = {
  slug: ProjectSlug;
  hero: ProjectHeroContent;
};

export function ProjectHero({ slug, hero }: ProjectHeroProps) {
  if (hero.kind === "product") {
    return (
      <header className={`${styles.product} ${styles[slug]}`}>
        <div className={styles.brand}>
          {slug === "cronium" ? (
            <>
              <Image
                className={styles.logo}
                src={croniumLogo}
                alt=""
                sizes="56px"
              />
              <CroniumWordmark className={styles.wordmark} aria-hidden="true" />
            </>
          ) : (
            <FamilyArchiveWordmark
              className={styles.wordmark}
              aria-hidden="true"
            />
          )}
        </div>

        <Image
          className={`${styles.window} ${styles.left}`}
          src={hero.left.image}
          alt={hero.left.alt}
          quality={90}
          sizes="640px"
        />
        <Image
          className={`${styles.window} ${styles.right}`}
          src={hero.right.image}
          alt={hero.right.alt}
          quality={90}
          sizes="640px"
        />
        <Image
          className={`${styles.window} ${styles.main}`}
          src={hero.main.image}
          alt={hero.main.alt}
          quality={90}
          preload
          sizes="(max-width: 1100px) 92vw, 1060px"
        />
      </header>
    );
  }

  return (
    <header className={styles.hero}>
      <Image
        src={hero.image}
        alt={hero.alt}
        fill
        priority
        sizes="100vw"
        className={styles.image}
      />
      {/*
        The font variable is scoped here rather than to the root layout so
        next/font only preloads the file on routes that render this hero. At
        the root it was fetched on the home page, which never displays it.
      */}
      {hero.overlayTitle ? (
        <h1 className={`${styles.overlayTitle} ${montserrat.variable}`}>
          {hero.overlayTitle}
        </h1>
      ) : null}
    </header>
  );
}
