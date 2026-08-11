import type { CSSProperties, ReactNode } from "react";
import styles from "./PageTitle.module.css";

type PageTitleProps = {
  children: ReactNode;
  /**
   * Project titles are underlined and hidden below 848px, where the rotated
   * layout stops working.
   */
  variant?: "home" | "project";
  /** Per-page nudge for the rotated title, which is tuned to the text length. */
  offset?: { top: number; left: number };
};

export function PageTitle({
  children,
  variant = "home",
  offset,
}: PageTitleProps) {
  const className = [styles.title, variant === "project" && styles.project]
    .filter(Boolean)
    .join(" ");

  const style = offset
    ? ({
        "--title-top": `${offset.top}px`,
        "--title-left": `${offset.left}px`,
      } as CSSProperties)
    : undefined;

  return (
    <h1 className={className} style={style}>
      {children}
    </h1>
  );
}
