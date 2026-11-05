import type { ReactNode } from "react";
import styles from "./Section.module.css";

type SectionVariant =
  "default" | "main" | "gallery" | "left" | "centered" | "cards";

type SectionProps = {
  /**
   * Label shown in the left-hand column. Omit for a section with no label
   * column at all; pass an empty string to keep the column as a spacer.
   */
  title?: string;
  variant?: SectionVariant;
  children: ReactNode;
};

export function Section({
  title,
  variant = "default",
  children,
}: SectionProps) {
  // Base layout comes from the global `section` rule; the module only carries
  // the variants.
  const className = styles[variant] ?? undefined;

  if (title === undefined) {
    return <section className={className}>{children}</section>;
  }

  return (
    <section className={className}>
      {/* h2, not the original h3 — the page heading is an h1, and skipping a
          level fails heading-order. The class sets size, weight and margin, so
          the tag change is not visible. */}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
