import type { FeaturedProject, Project } from "./types";

// To add a project: copy one block, change the text, save. Nothing else needs to change.
// gradient: "peach" | "lavender" | "mint" | "sky" | "butter"
// github / kaggle: a full URL, or leave empty ("") until it exists.

/** Large cards in "Selected work". The image side alternates left/right automatically. */
export const featured: FeaturedProject[] = [
  {
    title: "Multi-Modal Anaemia Screening",
    meta: "Research · Prof. Nirmal Punjabi · Aug '26 – Present",
    description:
      "This was my introduction to the world of research",
    metrics: [
      { value: "95.6%", label: "Accuracy" },
      { value: "99.1%", label: "F1 (5-fold CV)" },
      { value: "0.87", label: "Dice" },
      { value: "50K+", label: "Images" },
    ],
    tags: ["PyTorch", "OpenCV", "Computer Vision"],
    github: "",
    kaggle: "",
    gradient: "peach",
  },
  {
    title: "Algorithmic Trading with Deep RL",
    meta: "FinSearch '26 · Finance Club IITB",
    description:
      "A summer project with two of my favourite topics - Reinforcement Leaerning and Finance",
    metrics: [
      { value: "17.93%", label: "Backtested return" },
      { value: "0.746", label: "Sharpe" },
      { value: "15.77%", label: "Max drawdown" },
      { value: "+0.30pp", label: "Over ARIMA" },
    ],
    tags: ["PyTorch", "RL", "Quant"],
    github: "https://github.com/Soemon007",
    kaggle: "",
    gradient: "sky",
  },
  {
    title: "Corrective RAG Pipeline",
    meta: "Summer of Science",
    description:
        "A self-paced summer project where I got to learn a lot about generative and agentic AI",
    metrics: [],
    tags: ["LLMs", "RAG", "Agentic AI"],
    github: "",
    kaggle: "",
    gradient: "lavender",
  },
];

/** Compact cards in "More projects". */
export const projects: Project[] = [
  {
    title: "Multi-Asset Portfolio Optimisation",
    text: "My first real dive into the world of Finance",
    tags: ["Finance", "Excel"],
    gradient: "mint",
  },
  {
    title: "Joystick Pick-up & Place Bot",
    text: "A fun course project",
    tags: ["ESP32", "Robotics"],
    gradient: "butter",
  },
  {
    title: "Automated M&A Teaser Deck Builder",
    text: "Python pipeline with APIs and scraping, ~1 min per deck.",
    tags: ["Python", "Automation"],
    gradient: "peach",
  },
  {
    title: "Quantitative Finance Reading Project",
    text: "Reading project on Probability, stochastic processes and trading methodology.",
    tags: ["Quant", "Theory"],
    gradient: "sky",
  },
  {
    title: "Strategic Analysis of BEL",
    text: "Course project analysis using Porter's Five Forces, SWOT and BCG Matrix.",
    tags: ["Strategy"],
    gradient: "lavender",
  },
];
