import { GithubIcon } from "@/components/icons/GithubIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import styles from "./Footer.module.css";

const GITHUB_URL = "https://github.com/addison-moore";
const LINKEDIN_URL = "https://www.linkedin.com/in/addison-moore/";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        <a href={GITHUB_URL} aria-label="GitHub">
          <GithubIcon className={styles.icon} />
        </a>
        <a href={LINKEDIN_URL} aria-label="LinkedIn">
          <LinkedInIcon className={styles.icon} />
        </a>
      </div>
      <p>&copy; Addison Moore {new Date().getFullYear()}</p>
    </footer>
  );
}
