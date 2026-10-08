// Shapes of everything in src/data. The compiler checks your edits against these,
// so a typo in a field name or an unknown gradient is caught before it reaches the site.

/** Accent gradients available for cards. Each maps to a `grad-*` style (see lib/gradients.ts). */
export const GRADIENTS = ["peach", "lavender", "mint", "sky", "butter"] as const;
export type Gradient = (typeof GRADIENTS)[number];

/**
 * A link is either a real URL or empty. An empty/missing link still shows its button, but
 * sends visitors to the "haven't added that yet" page instead of a dead end.
 */
export type LinkUrl = string | undefined;

export type Metric = { value: string; label: string };

/** Large, highlighted project shown in "Selected work". */
export type FeaturedProject = {
  title: string;
  /** Small line above the title: context, mentor, dates. */
  meta: string;
  description: string;
  /** Up to four headline numbers. Use an empty list to hide the block. */
  metrics: Metric[];
  tags: string[];
  gradient: Gradient;
  github?: LinkUrl;
  kaggle?: LinkUrl;
};

/** Smaller project shown in "More projects". */
export type Project = {
  title: string;
  text: string;
  tags: string[];
  gradient: Gradient;
  /** Optional. When missing, the GitHub button is hidden (the Kaggle one is always shown). */
  github?: LinkUrl;
  kaggle?: LinkUrl;
};

export type ExperienceItem = {
  /** Display date range, e.g. "May – Jul '26". */
  date: string;
  role: string;
  org: string;
  text: string;
};

export type SkillGroup = { group: string; items: string[] };

export type Profile = {
  name: string;
  email: string;
  github: string;
  linkedin: string;
  /** Path or URL of the resume PDF. Leave empty until it exists. */
  resume: LinkUrl;
};
