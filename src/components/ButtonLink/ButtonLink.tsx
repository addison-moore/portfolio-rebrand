import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./ButtonLink.module.css";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
};

export function ButtonLink({ href, children }: ButtonLinkProps) {
  const isInternal = href.startsWith("/");

  if (isInternal) {
    return (
      <Link href={href} className={styles.buttonLink}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={styles.buttonLink}>
      {children}
    </a>
  );
}
