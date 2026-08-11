import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import { PageTitle } from "@/components/PageTitle/PageTitle";
import { Section } from "@/components/Section/Section";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Not found — Addison Moore",
};

export default function NotFound() {
  return (
    <>
      <PageTitle>{profile.name}</PageTitle>
      <main>
        <Section title="404" variant="main">
          <div>
            <p>That page doesn’t exist.</p>
            <ButtonLink href="/">Back to Portfolio →</ButtonLink>
          </div>
        </Section>
      </main>
    </>
  );
}
