// Edit everything on the site from this file.
// To add a project, copy one block below and change the text.
// gradient options: "peach" | "lavender" | "mint" | "sky" | "butter"
export type Gradient = "peach" | "lavender" | "mint" | "sky" | "butter";

export const profile = {
  name: "Rehan Mallik",
  email: "25b0408@iitb.ac.in",
  github: "https://github.com/Soemon007",
  linkedin: "https://www.linkedin.com/in/Rehan-Mallik",
  // Leave a link empty ("") to send visitors to the "haven't added that yet" page.
  resume: "",
};

export type Feature = {
  title: string;
  meta: string;
  description: string;
  metrics: { value: string; label: string }[];
  tags: string[];
  /** Optional links. Leave empty ("") to hide the button. */
  github?: string;
  kaggle?: string;
  gradient: Gradient;
};

export const featured: Feature[] = [
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

export const projects: { title: string; text: string; tags: string[]; gradient: Gradient; github?: string; kaggle?: string }[] = [
  { title: "Multi-Asset Portfolio Optimisation", text: "4-bucket goals-based portfolio, CAPM screening of 23 securities, 6 equities at beta 0.55, Excel model with Treynor and Jensen's Alpha.", tags: ["Finance", "Excel"], gradient: "mint" },
  { title: "Joystick Pick-up & Place Bot", text: "Sub-1.75 kg ESP32 bot, 5 DC motors and servo gripper, carries 250 g up 10°/20°/30° inclines.", tags: ["ESP32", "Robotics"], gradient: "butter" },
  { title: "Automated M&A Teaser Deck Builder", text: "Python pipeline with APIs and scraping, ~1 min per deck. First freshman team in Kelp Hackathon finals.", tags: ["Python", "Automation"], gradient: "peach" },
  { title: "Quantitative Finance Reading Project", text: "Probability, stochastic processes and trading methodology.", tags: ["Quant", "Theory"], gradient: "sky" },
  { title: "Strategic Analysis of BEL", text: "Porter's Five Forces, SWOT and BCG Matrix.", tags: ["Strategy"], gradient: "lavender" },
];

export const experience = [
  { date: "May – Jul '26", role: "Product Manager Intern", org: "Loyalty Rewardz", text: "My very first corporate internship, where I learnt a lot on how a company functions." },
  { date: "Apr '26 – Present", role: "Editor", org: "IIT Tech Ambit", text: "We work together to publish articles on a monthly cadence, on a wide variety of fun and interesting topics!" },
  { date: "Dec '25 – Feb '26", role: "Junior Engineer", org: "IITB Rocket Team", text: "For a brief, but fun while, I was part of IITB Rocket Team in the Payload subdivision." },
];

export const skills = [
  { group: "Languages", items: ["Python", "C++", "HTML"] },
  { group: "Libraries", items: ["NumPy", "Pandas", "PyTorch", "OpenCV", "Matplotlib", "Seaborn"] },
  { group: "Tools", items: ["Git", "Fusion 360", "AutoCAD", "LaTeX", "MATLAB", "SolidWorks", "Aspen", "Adobe Illustrator"] },
];
