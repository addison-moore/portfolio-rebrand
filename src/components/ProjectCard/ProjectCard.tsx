import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  CroniumWordmark,
  FamilyArchiveWordmark,
  TradingWordmark,
} from "@/components/icons/Wordmarks";
import type { ProjectCard as CardCopy, ProjectSlug } from "@/content/types";
import croniumCode from "@/assets/projects/cronium/cronium-code.png";
import croniumGraph from "@/assets/projects/cronium/cronium-graph.png";
import croniumLogo from "@/assets/projects/cronium/cronium-logo.png";
import familyArchiveInvitation from "@/assets/projects/family-archive/family-archive-invitation.jpg";
import familyArchiveTelegram from "@/assets/projects/family-archive/family-archive-telegram.jpg";
import familyArchiveTree from "@/assets/projects/family-archive/family-archive-tree.png";
import ayaGrid from "@/assets/projects/freelance/aya-grid.jpg";
import multicamLoop from "@/assets/projects/multicam/multicam-loop.webp";
import multicamStill from "@/assets/projects/multicam/multicam-still.webp";
import multicamStudio from "@/assets/projects/multicam/MultiCam_1.jpg";
import northScreen from "@/assets/projects/trading-platforms/38north-screen.png";
import oracleScreen from "@/assets/projects/trading-platforms/oracle-insights-screen.png";
import candles from "@/assets/projects/trading-platforms/trading-platforms_hero.png";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  slug: ProjectSlug;
  title: string;
  copy: CardCopy;
  /** The first card is usually the largest thing above the fold. */
  preload?: boolean;
};

/*
 * Each card wears its own project's look: the palette, type, corner radius and
 * button style are all lifted from the real thing, so the cards are deliberately
 * not variations on one template. The imagery is decorative here (alt=""), since
 * the link's text already says where it goes and the project page describes it.
 */
export function ProjectCard({ slug, title, copy, preload }: ProjectCardProps) {
  return (
    <Link href={`/${slug}`} className={`${styles.card} ${styles[slug]}`}>
      <div className={styles.layout}>
        <div className={styles.text}>
          <h3 className={styles.title}>
            <Name slug={slug} title={title} />
          </h3>
          <p className={styles.kicker}>{copy.kicker}</p>
          <p className={styles.blurb}>{copy.blurb}</p>
          <span className={styles.cta}>
            View project <span aria-hidden="true">→</span>
          </span>
        </div>
        <div className={styles.art}>
          <Art slug={slug} preload={preload} />
        </div>
      </div>
    </Link>
  );
}

function Name({
  slug,
  title,
}: {
  slug: ProjectSlug;
  title: string;
}): ReactNode {
  switch (slug) {
    case "cronium":
      return (
        <>
          <Image
            className={styles.logo}
            src={croniumLogo}
            alt=""
            sizes="48px"
          />
          <CroniumWordmark className={styles.wordmark} />
        </>
      );
    case "family-archive":
      return <FamilyArchiveWordmark className={styles.wordmark} />;
    case "trading-platforms":
      return <TradingWordmark className={styles.wordmark} />;
    case "multicam":
      return (
        <>
          {title}
          {/* The rig's row of eight lenses, which fire in sequence on hover. */}
          <span className={styles.lenses} aria-hidden="true">
            {Array.from({ length: 8 }, (_, lens) => (
              <i key={lens} style={{ "--lens": lens } as CSSProperties} />
            ))}
          </span>
        </>
      );
    default:
      return title;
  }
}

function Art({
  slug,
  preload,
}: {
  slug: ProjectSlug;
  preload?: boolean;
}): ReactNode {
  switch (slug) {
    case "cronium":
      return (
        <>
          <Image
            className={styles.croniumGraph}
            src={croniumGraph}
            alt=""
            quality={90}
            preload={preload}
            sizes="(max-width: 750px) 130vw, (max-width: 1200px) 90vw, 70vw"
          />
          <Image
            className={styles.croniumCode}
            src={croniumCode}
            alt=""
            quality={90}
            sizes="(max-width: 750px) 60vw, 30vw"
          />
        </>
      );

    case "family-archive":
      return (
        <>
          <Image
            className={styles.archiveTree}
            src={familyArchiveTree}
            alt=""
            quality={90}
            sizes="(max-width: 750px) 130vw, (max-width: 1200px) 90vw, 70vw"
          />
          <Image
            className={styles.archiveInvitation}
            src={familyArchiveInvitation}
            alt=""
            sizes="200px"
          />
          <Image
            className={styles.archiveTelegram}
            src={familyArchiveTelegram}
            alt=""
            sizes="260px"
          />
        </>
      );

    case "trading-platforms":
      return (
        <>
          <Image
            className={styles.candles}
            src={candles}
            alt=""
            sizes="(max-width: 900px) 100vw, 60vw"
          />
          <Image
            className={styles.oracleScreen}
            src={oracleScreen}
            alt=""
            sizes="(max-width: 750px) 80vw, 40vw"
          />
          <Image
            className={styles.northScreen}
            src={northScreen}
            alt=""
            quality={90}
            sizes="(max-width: 750px) 100vw, 50vw"
          />
        </>
      );

    case "freelance":
      return (
        <Image
          className={styles.ayaGrid}
          src={ayaGrid}
          alt=""
          sizes="(max-width: 900px) 90vw, 40vw"
        />
      );

    case "multicam":
      return (
        <>
          <Image
            className={styles.multicamStudio}
            src={multicamStudio}
            alt=""
            sizes="(max-width: 900px) 90vw, 40vw"
          />
          {/* Real output from the rig. A still for anyone who asks for less motion. */}
          <picture className={styles.multicamLoop}>
            <source
              media="(prefers-reduced-motion: reduce)"
              srcSet={multicamStill.src}
            />
            <img
              src={multicamLoop.src}
              width={multicamLoop.width}
              height={multicamLoop.height}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </picture>
        </>
      );
  }
}
