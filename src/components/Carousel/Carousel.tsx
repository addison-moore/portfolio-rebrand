"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./Carousel.module.css";

type CarouselProps = {
  slides: ReactNode[];
  /** "multi" steps 4 → 3 → 2 → 1 across breakpoints; "single" shows one. */
  variant?: "single" | "multi";
  label: string;
};

export function Carousel({ slides, variant = "single", label }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  // Embla advances one slide at a time, so there is a snap point per slide and
  // the initial one is always 0.
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className={styles.viewport} ref={emblaRef}>
        <div className={`${styles.container} ${styles[variant]}`}>
          {slides.map((slide, index) => (
            <div className={styles.slide} key={index}>
              <div className={styles.slideInner}>{slide}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Previous slide"
      >
        <span aria-hidden="true">&lt;</span>
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Next slide"
      >
        <span aria-hidden="true">&gt;</span>
      </button>

      <div className={styles.bullets}>
        {slides.map((_, index) => (
          <button
            type="button"
            key={index}
            className={`${styles.bullet} ${
              index === selectedIndex ? styles.bulletActive : ""
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selectedIndex}
          />
        ))}
      </div>
    </div>
  );
}
