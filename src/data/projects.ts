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
      "Non-invasive anaemia and haemoglobin assessment from ocular, palm and nail images. EfficientNet-B3 with transfer learning, benchmarked against five other CNN architectures.",
    metrics: [
      { value: "99.2%", label: "Accuracy" },
      { value: "99.1%", label: "F1 (5-fold CV)" },
      { value: "0.87", label: "Dice" },
      { value: "50K+", label: "Images" },
    ],
    tags: ["PyTorch", "OpenCV", "Computer Vision"],
    github: "https://github.com/Soemon007",
    kaggle: "",
    gradient: "peach",
  },
  {
    title: "Algorithmic Trading with Deep RL",
    meta: "FinSearch '26 · Finance Club IITB",
    description:
      "D3QN agent on NIFTY 50 with Double Q-learning, dueling networks, experience replay and soft target updates. 10-feature state with a Sortino-based reward penalising transaction costs and whipsaws.",
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
      "CRAG with retrieval-quality evaluation, context refinement and fallback retrieval, built for robustness against ambiguous or low-quality retrievals.",
    metrics: [],
    tags: ["LLMs", "RAG", "Agentic AI"],
    github: "https://github.com/Soemon007",
    kaggle: "",
    gradient: "lavender",
  },
];

/** Compact cards in "More projects". */
export const projects: Project[] = [
  {
    title: "Multi-Asset Portfolio Optimisation",
    text: "4-bucket goals-based portfolio, CAPM screening of 23 securities, 6 equities at beta 0.55, Excel model with Treynor and Jensen's Alpha.",
    tags: ["Finance", "Excel"],
    gradient: "mint",
  },
  {
    title: "Joystick Pick-up & Place Bot",
    text: "Sub-1.75 kg ESP32 bot, 5 DC motors and servo gripper, carries 250 g up 10°/20°/30° inclines.",
    tags: ["ESP32", "Robotics"],
    gradient: "butter",
  },
  {
    title: "Automated M&A Teaser Deck Builder",
    text: "Python pipeline with APIs and scraping, ~1 min per deck. First freshman team in Kelp Hackathon finals.",
    tags: ["Python", "Automation"],
    gradient: "peach",
  },
  {
    title: "Quantitative Finance Reading Project",
    text: "Probability, stochastic processes and trading methodology.",
    tags: ["Quant", "Theory"],
    gradient: "sky",
  },
  {
    title: "Strategic Analysis of BEL",
    text: "Porter's Five Forces, SWOT and BCG Matrix.",
    tags: ["Strategy"],
    gradient: "lavender",
  },
];
