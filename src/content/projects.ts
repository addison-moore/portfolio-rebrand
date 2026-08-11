import type { Project, ProjectSlug } from "./types";

import plateTrackerHero from "@/assets/projects/plate-tracker/plate-tracker-hero.png";
import plateTracker1 from "@/assets/projects/plate-tracker/plate-tracker-1.jpg";
import plateTracker2 from "@/assets/projects/plate-tracker/plate-tracker-2.jpg";
import plateTracker3 from "@/assets/projects/plate-tracker/plate-tracker-3.jpg";
import plateTracker4 from "@/assets/projects/plate-tracker/plate-tracker-4.jpg";
import plateTracker5 from "@/assets/projects/plate-tracker/plate-tracker-5.jpg";
import plateTracker6 from "@/assets/projects/plate-tracker/plate-tracker-6.jpg";

import tradingHero from "@/assets/projects/trading-platforms/trading-platforms_hero.png";
import northLaptop from "@/assets/projects/trading-platforms/38North_laptop.png";
import oracleLaptop from "@/assets/projects/trading-platforms/oracle-insights_laptop.png";

import freelanceHero from "@/assets/projects/freelance/freelance.png";
import aya1 from "@/assets/projects/freelance/aya_1.png";
import aya2 from "@/assets/projects/freelance/aya_2.png";
import aya3 from "@/assets/projects/freelance/aya_3.png";
import aya4 from "@/assets/projects/freelance/aya_4.png";
import aya5 from "@/assets/projects/freelance/aya_5.png";
import aya6 from "@/assets/projects/freelance/aya_6.png";
import aya7 from "@/assets/projects/freelance/aya_7.png";
import aya8 from "@/assets/projects/freelance/aya_8.png";
import aya9 from "@/assets/projects/freelance/aya_9.png";
import aya10 from "@/assets/projects/freelance/aya_10.png";
import aya11 from "@/assets/projects/freelance/aya_11.png";
import aya12 from "@/assets/projects/freelance/aya_12.png";

import multicamHero from "@/assets/projects/multicam/multicam.png";
import multicam2 from "@/assets/projects/multicam/multicam2.gif";
// Despite the original .gif extension, this file is an AVIF image sequence.
import multicam3 from "@/assets/projects/multicam/multicam3.avif";
import multicam4 from "@/assets/projects/multicam/multicam4.gif";
import multicam5 from "@/assets/projects/multicam/multicam5.gif";
import multicamRig0 from "@/assets/projects/multicam/MultiCam_0.jpg";
import multicamRig1 from "@/assets/projects/multicam/MultiCam_1.jpg";

const PLATE_TRACKER_SHOTS = [
  plateTracker1,
  plateTracker2,
  plateTracker3,
  plateTracker4,
  plateTracker5,
  plateTracker6,
];

// Ordered as the original markup had them: aya_5 leads, then 1–4, then 6–12.
const AYA_SHOTS = [
  aya5,
  aya1,
  aya2,
  aya3,
  aya4,
  aya6,
  aya7,
  aya8,
  aya9,
  aya10,
  aya11,
  aya12,
];

export const projects: Project[] = [
  {
    slug: "plate-tracker",
    title: "Plate Tracker",
    description:
      "A React-Native app built around OpenALPR that scans license plates and checks them against a database of stolen vehicles.",
    hero: {
      image: plateTrackerHero,
      alt: "Plate Tracker running on a phone",
    },
    titleOffset: { top: 585, left: -245 },
    card: {
      before: "Built ",
      highlight: "Plate Tracker",
      after: ", a mobile app to help people find their stolen vehicles.",
    },
    blocks: [
      {
        kind: "prose",
        title: "Summary",
        paragraphs: [
          "Plate Tracker is a React-Native mobile application built around the OpenALPR library (Automatic License Plate Recognition). It allows users to scan vehicle license plates and automatically check them against a database of thousands of stolen vehicles. Users can register their stolen vehicles in the app and receive a notification if their license plate is scanned.",
        ],
      },
      {
        kind: "stack",
        title: "Stack",
        columns: [
          ["React-Native", "OpenALPR", "React-Native-Paper"],
          ["MongoDB", "Express", "Node.js"],
          ["JWT", "BCyrpt", "MLab"],
        ],
      },
      {
        kind: "gallery",
        items: [
          {
            kind: "video",
            src: "/video/plate-tracker.mp4",
            width: 300,
            height: 600,
          },
        ],
      },
      {
        kind: "prose",
        title: "Inspiration",
        paragraphs: [
          "I was inspired to build this app when my own motorcycle was stolen. I searched the internet for online communities that could support me in recovering my vehicle. I found local Facebook pages and bulletin boards fractured across the internet but no primary resource where data was aggregated. There are over 750,000 vehicles stolen in the US each year. Until now there has never been a centralized place for people to share information about stolen vehicles.",
        ],
      },
      {
        kind: "carousel",
        variant: "multi",
        label: "Plate Tracker screenshots",
        images: PLATE_TRACKER_SHOTS.map((image) => ({
          image,
          alt: "Plate Tracker Screenshot",
        })),
      },
      {
        kind: "prose",
        title: "Features",
        paragraphs: [
          "Users can add stolen vehicles to their profile and receive alerts when their vehicle is identified or their license plate is scanned by another user. They can choose whether they'd like to receive notifications about other stolen vehicles in their area. They can create public posts about their vehicle or other suspicious vehicles and view a feed of posts from other users in their area.",
        ],
      },
      {
        kind: "repoLink",
        title: "Github",
        label: "Plate Tracker",
        href: "https://github.com/addison912/PlateTracker",
      },
    ],
    next: {
      href: "/trading-platforms",
      label: "Next Project →",
      align: "left",
    },
  },

  {
    slug: "trading-platforms",
    title: "Trading Platforms",
    description:
      "Two proprietary trading platforms for automated crypto arbitrage and negative-risk alerting.",
    hero: {
      image: tradingHero,
      alt: "A candlestick trading chart",
      overlayTitle: "Trading Platforms",
    },
    titleOffset: { top: 700, left: -348 },
    card: {
      before: "Designed and built ",
      highlight: "trading platforms",
      after:
        " for automated arbitrage trading and negative risk notifications.",
    },
    blocks: [
      {
        kind: "prose",
        title: "Summary",
        paragraphs: [
          "I built two propietary trading platforms from the ground up. Both platforms make it easy to automate trading and configure alerts.",
          "38North is a trading platform for identifying arbitrage opportunities and automating trading strategies between multiple cryptocurrency exchanges. It was originally built to take advantage of the 'Kimchi Premium' between US and South Korean exchanges.",
        ],
      },
      {
        kind: "image",
        image: {
          image: northLaptop,
          alt: "Laptop displaying 38 North trading",
        },
      },
      {
        // Deliberately unlabelled: the original used an empty heading here to
        // keep this paragraph aligned with the one above.
        kind: "prose",
        title: "",
        paragraphs: [
          "Oracle Insights is and application for analyzing and automating trading on Predictit. It allows for easy configuration of volitility and arbitrage alerts.",
        ],
      },
      {
        kind: "image",
        image: {
          image: oracleLaptop,
          alt: "Laptop displaying Oracle Insights",
        },
      },
      {
        kind: "stack",
        title: "Stack",
        columns: [
          ["React", "Typescript", "Emotion"],
          ["Webpack", "Babel", "Eslint"],
          ["MongoDB", "Express", "Node.js"],
          ["NGINX", "JWT", "Google OAuth"],
        ],
      },
    ],
    next: { href: "/freelance", label: "Next Project →", align: "centered" },
  },

  {
    slug: "freelance",
    title: "Freelance",
    description:
      "Freelance web development: bespoke sites with custom content management, including photographer Aya Brackett's portfolio.",
    hero: {
      image: freelanceHero,
      alt: "The Aya Brackett website",
      overlayTitle: "Freelance",
    },
    titleOffset: { top: 580, left: -168 },
    card: {
      before: "Worked as a ",
      highlight: "freelance",
      after: " web developer to build beautiful sites with custom CMS.",
    },
    blocks: [
      {
        kind: "prose",
        title: "Summary",
        paragraphs: [
          "As a freelance web developer I've created beautifully designed websites with custom content management to suit my clients needs.",
          "I recently built a new website for photographer, Aya Brackett. The site features a custom built admin panel that allows for easy editing and and drag and drop reorganization of galleries, photos, and blog posts.",
        ],
        cta: {
          label: "Visit the website →",
          href: "https://www.ayabrackett.com/",
        },
      },
      {
        kind: "carousel",
        variant: "single",
        label: "AyaBrackett.com screenshots",
        images: AYA_SHOTS.map((image) => ({
          image,
          alt: "AyaBrackett.com Screenshot",
        })),
      },
      {
        kind: "stack",
        title: "Stack",
        columns: [
          ["React", "React DnD", "Sass"],
          ["Parcel", "Babel", "Eslint"],
          ["MongoDB", "Express", "Node.js"],
          ["Google OAuth", "JWT"],
        ],
      },
    ],
    next: { href: "/multicam", label: "Next Project →", align: "centered" },
  },

  {
    slug: "multicam",
    title: "Multicam",
    description:
      "Product design, prototyping and manufacturing of the Multicam, a synchronised multi-camera rig built for The Bosco.",
    hero: {
      image: multicamHero,
      alt: "The Multicam rig",
    },
    titleOffset: { top: 585, left: -163 },
    card: {
      before: "Designed, prototyped and built the ",
      highlight: "Multicam",
      after: " for The Bosco.",
    },
    blocks: [
      {
        kind: "prose",
        title: "Summary",
        paragraphs: [
          "As product designer for The Bosco I had the opportunity to conceptualize and create several new products, including the Multicam. As lead designer on this project, I engineered, prototyped and commissioned manufacturing of the Multicam. I worked with our developers to design an elegant software solution for aligning, syncing, and simultaneously firing all of the cameras.",
        ],
      },
      {
        kind: "gallery",
        items: [
          {
            kind: "embed",
            src: "https://player.vimeo.com/video/191719994?color=e7ab18&title=0&byline=0&portrait=0",
            title: "Multicam",
            width: 640,
            height: 360,
          },
          {
            kind: "grid",
            images: [
              {
                image: multicam2,
                alt: "Animation captured with the Multicam",
                unoptimized: true,
              },
              {
                image: multicam3,
                alt: "Animation captured with the Multicam",
                unoptimized: true,
              },
              {
                image: multicamRig0,
                alt: "The Multicam rig set up in a studio",
              },
              {
                image: multicamRig1,
                alt: "The Multicam rig capturing a jump",
              },
              {
                image: multicam4,
                alt: "Animation captured with the Multicam",
                unoptimized: true,
              },
              {
                image: multicam5,
                alt: "Animation captured with the Multicam",
                unoptimized: true,
              },
            ],
          },
        ],
      },
    ],
    next: { href: "/", label: "Back to Portfolio →", align: "left" },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const projectSlugs = projects.map(
  (project) => project.slug,
) as ProjectSlug[];
