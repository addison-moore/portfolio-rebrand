import avatar from "@/assets/me_bw.jpeg";

/** Identity shared by every variant. Anything that differs lives in variants.ts. */
export const profile = {
  name: "Addison Moore",
  email: "addisondrewmoore@gmail.com",
  avatar,
  avatarAlt: "Addison Moore",
  social: {
    github: "https://github.com/addison-moore",
    linkedin: "https://www.linkedin.com/in/addison-moore/",
  },
} as const;
