import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Addison Moore",
  description: "Addison Moore software engineer portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
