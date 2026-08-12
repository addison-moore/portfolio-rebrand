import type { Metadata } from "next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Footer } from "@/components/Footer/Footer";
import "./normalize.css";
import "./globals.css";

const GTM_ID = "GTM-P9P26H3";
const GA_ID = "G-T0G631EZ4W";

export const metadata: Metadata = {
  title: "Addison Moore",
  description: "Addison Moore software engineer portfolio",
  authors: [{ name: "Addison Moore" }],
  keywords: ["Addison Moore", "software engineer", "portfolio", "freelance"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const analyticsEnabled = process.env.NODE_ENV === "production";

  return (
    <html lang="en">
      {analyticsEnabled ? <GoogleTagManager gtmId={GTM_ID} /> : null}
      <body>
        {children}
        <Footer />
      </body>
      {analyticsEnabled ? <GoogleAnalytics gaId={GA_ID} /> : null}
    </html>
  );
}
