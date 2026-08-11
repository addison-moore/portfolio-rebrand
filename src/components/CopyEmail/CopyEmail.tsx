"use client";

import { useEffect, useRef, useState } from "react";
import { ClipboardIcon } from "@/components/icons/ClipboardIcon";
import styles from "./CopyEmail.module.css";

const RESET_DELAY_MS = 1200;

type CopyEmailProps = {
  email: string;
};

export function CopyEmail({ email }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopied(false), RESET_DELAY_MS);
  }

  return (
    <button type="button" className={styles.button} onClick={copy}>
      {copied ? (
        <span>Copied to clipboard!</span>
      ) : (
        <>
          <span className={styles.email}>{email}</span>
          <ClipboardIcon className={styles.icon} />
        </>
      )}
      <span className={styles.srOnly} role="status">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
