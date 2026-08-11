import Image, { type StaticImageData } from "next/image";
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
      {overlayTitle ? (
        <h1 className={styles.overlayTitle}>{overlayTitle}</h1>
      ) : null}
    </header>
  );
}
