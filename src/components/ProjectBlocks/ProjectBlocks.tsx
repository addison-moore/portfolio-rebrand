import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import { Carousel } from "@/components/Carousel/Carousel";
import { Section } from "@/components/Section/Section";
import type { Block, GalleryItem } from "@/content/types";
import githubIcon from "@/assets/github.png";
import styles from "./ProjectBlocks.module.css";

export function ProjectBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <ProjectBlock key={index} block={block} first={index === 0} />
      ))}
    </>
  );
}

function ProjectBlock({ block, first }: { block: Block; first: boolean }) {
  switch (block.kind) {
    case "prose":
      return (
        <Section title={block.title} variant={first ? "main" : "default"}>
          {/*
            The paragraphs share one wrapper because the section body is a row
            flex container — as direct children they would sit side by side.
          */}
          <div>
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {block.cta ? (
              <ButtonLink href={block.cta.href}>{block.cta.label}</ButtonLink>
            ) : null}
          </div>
        </Section>
      );

    case "stack":
      return (
        <Section title={block.title}>
          {block.columns.map((column, index) => (
            <ul key={index}>
              {column.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
        </Section>
      );

    case "gallery":
      return (
        <Section variant="gallery">
          {block.items.map((item, index) => (
            <GalleryItemView key={index} item={item} />
          ))}
        </Section>
      );

    case "carousel":
      return (
        <Section variant="gallery">
          <Carousel
            variant={block.variant}
            label={block.label}
            slides={block.images.map((slide, index) => (
              <Image
                key={index}
                src={slide.image}
                alt={slide.alt}
                unoptimized={slide.unoptimized}
                quality={slide.crisp ? 90 : undefined}
                sizes="(max-width: 1120px) 100vw, 1120px"
              />
            ))}
          />
        </Section>
      );

    case "image":
      return (
        <Section>
          <div className={styles.singleImage}>
            <Image
              src={block.image.image}
              alt={block.image.alt}
              unoptimized={block.image.unoptimized}
            />
          </div>
        </Section>
      );

    case "repoLink":
      return (
        <Section title={block.title}>
          <a className={styles.repoLink} href={block.href}>
            <span>{block.label}</span>
            <Image className={styles.repoIcon} src={githubIcon} alt="" />
          </a>
        </Section>
      );
  }
}

function GalleryItemView({ item }: { item: GalleryItem }) {
  switch (item.kind) {
    case "video":
      return (
        <div className={styles.videoFrame}>
          {/* muted + playsInline so autoplay is honoured on mobile Safari. */}
          <video
            className={styles.video}
            width={item.width}
            height={item.height}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={item.src} type="video/mp4" />
          </video>
        </div>
      );

    case "embed":
      return (
        <div className={styles.videoFrame}>
          <iframe
            className={styles.embed}
            src={item.src}
            title={item.title}
            width={item.width}
            height={item.height}
            allowFullScreen
          />
        </div>
      );

    case "grid":
      return (
        <div className={styles.grid}>
          {item.images.map((entry, index) => (
            <Image
              key={index}
              src={entry.image}
              alt={entry.alt}
              unoptimized={entry.unoptimized}
            />
          ))}
        </div>
      );
  }
}
