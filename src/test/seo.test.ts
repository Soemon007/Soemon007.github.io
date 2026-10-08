import { describe, expect, it } from "vitest";
import { site } from "@/data";
import { homeHead } from "@/lib/seo";

describe("home page <head>", () => {
  const head = homeHead();
  const meta = (key: string) =>
    head.meta.find(
      (m) => ("name" in m && m.name === key) || ("property" in m && m.property === key),
    );

  it("has a title and description", () => {
    expect(head.meta.some((m) => "title" in m && m.title === site.title)).toBe(true);
    expect(meta("description")).toMatchObject({ content: site.description });
  });

  it("has complete link-preview tags with an absolute image address", () => {
    for (const key of ["og:title", "og:description", "og:image", "og:url", "twitter:image"]) {
      expect(meta(key), key).toBeDefined();
    }
    expect(meta("og:image")).toMatchObject({ content: `${site.url}${site.shareImage}` });
    expect(meta("twitter:card")).toMatchObject({ content: "summary_large_image" });
  });

  it("declares the canonical address", () => {
    expect(head.links).toContainEqual({ rel: "canonical", href: `${site.url}/` });
  });

  it("includes valid structured data", () => {
    const script = head.scripts.find((s) => s.type === "application/ld+json");
    const data = JSON.parse(script?.children ?? "{}");
    expect(data["@type"]).toBe("Person");
    expect(data.url).toBe(site.url);
  });
});
