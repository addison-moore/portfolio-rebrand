import avatar from "@/assets/me_bw.jpeg";

export const profile = {
  name: "Addison Moore",
  email: "addisondrewmoore@gmail.com",
  avatar,
  avatarAlt: "Addison Moore",
  resumeHref: "/resume.pdf",
  intro: [
    "Hi, I'm Addison, I’m a data solutions consultant and software engineer from the San Francisco Bay Area with 9+ years of experience working in tech. Over the past five years, I’ve worked with dozens of enterprise clients and gained experience with a variety of tools and languages to help my clients find value in their data.",
    "I'm currently open to new opportunities, so feel free to get in touch!",
  ],
  skills: [
    [
      "Javascript, Typescript",
      "SCSS, Bootstrap, Emotion",
      "React, React-Native",
      "Python, Django, Flask",
      "Babel, Jest, Eslint",
      "HTML5 + CSS3",
      "Sketch, Figma",
      "Conversational French",
    ],
    [
      "Docker, Linux, NGINX",
      "BigQuery, Firebase, Snowflake",
      "MongoDB, PostgreSQL",
      "Jupyter Lab, Pandas, Numpy",
      "RESTful APIs, Express",
      "Apache Airflow, DAGs",
      "Git, GCP, AWS Lambda",
      "Tableau, Power BI, DAX",
    ],
  ],
  social: {
    github: "https://github.com/addison912",
    linkedin: "https://www.linkedin.com/in/addison-moore/",
  },
} as const;
