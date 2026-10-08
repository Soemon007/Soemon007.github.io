// Site-wide settings: page title, link-preview text, and the page's section anchors.

export const site = {
  /** Public address of the live site (no trailing slash). Used for canonical and share links. */
  url: "https://soemon007.github.io",
  title: "Rehan Mallik",
  shareTitle: "Rehan Mallik",
  description: "Portfolio of Rehan Mallik, Chemical Engineering student at IIT Bombay.",
  shareDescription: "Portfolio of Rehan Mallik, Chemical Engineering student at IIT Bombay.",
  /** Link-preview image, 1200×630, served from /public. */
  shareImage: "/og.jpg",
  shareImageAlt: "Rehan Mallik, Chemical engineering student at IIT Bombay",
  /** Shown in the footer. A fixed number, so the page never differs between build and visit. */
  copyrightYear: 2026,
};

/**
 * The element ids of the page's sections. Sections and the navigation both read from here,
 * so a menu link can never point at a section that does not exist.
 */
export const sectionIds = {
  top: "top",
  work: "work",
  experience: "experience",
  about: "about",
  contact: "contact",
} as const;

/** Links in the header menu, in order. */
export const navLinks = [
  { label: "Work", href: `#${sectionIds.work}` },
  { label: "Experience", href: `#${sectionIds.experience}` },
  { label: "About", href: `#${sectionIds.about}` },
  { label: "Contact", href: `#${sectionIds.contact}` },
] as const;
