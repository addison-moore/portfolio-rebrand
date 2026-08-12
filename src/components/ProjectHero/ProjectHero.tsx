import Image, { type StaticImageData } from "next/image";
import { montserrat } from "@/fonts";
import styles from "./ProjectHero.module.css";

type ProjectHeroProps = {
  image: StaticImageData;
  alt: string;
  /** Large title laid over the image. Only some projects use one. */
  overlayTitle?: string;
};

export function ProjectHero({ image, alt, overlayTitle }: ProjectHeroProps) {
  return (
    <header className={styles.hero}>
      <Image
        src={image}
        alt={alt}
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
      {overlayTitle ? (
        <h1 className={`${styles.overlayTitle} ${montserrat.variable}`}>
          {overlayTitle}
        </h1>
      ) : null}
    </header>
  );
}
