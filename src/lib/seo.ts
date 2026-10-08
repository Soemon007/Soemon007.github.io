import { profile, site } from "@/data";

/** Everything the home page puts in <head>: title, link previews, canonical URL, structured data. */
export function homeHead() {
  const image = `${site.url}${site.shareImage}`;

  return {
    meta: [
      { title: site.title },
      { name: "description", content: site.description },
      { name: "theme-color", content: "#ffffff" },
      { property: "og:title", content: site.shareTitle },
      { property: "og:description", content: site.shareDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${site.url}/` },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: site.shareImageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: site.shareTitle },
      { name: "twitter:description", content: site.shareDescription },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: `${site.url}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          url: site.url,
          description: site.description,
          affiliation: {
            "@type": "CollegeOrUniversity",
            name: "Indian Institute of Technology Bombay",
          },
          sameAs: [profile.github, profile.linkedin],
        }),
      },
    ],
  };
}
