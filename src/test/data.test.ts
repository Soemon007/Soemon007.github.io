import { describe, expect, it } from "vitest";
import {
  GRADIENTS,
  copy,
  experience,
  featured,
  navLinks,
  profile,
  projects,
  sectionIds,
  site,
  skills,
} from "@/data";

// These tests read src/data and fail with a clear message when an edit would produce a broken
// or inconsistent page: a typo'd gradient, a half-filled project, a malformed link.

const isLinkOrEmpty = (value: string | undefined) =>
  value === undefined || value === "" || /^https?:\/\/\S+$/.test(value);

const filled = (value: string) => value.trim().length > 0;

/** Fails with "<project>: <field> is empty" instead of a bare true/false mismatch. */
function expectFilled(owner: string, fields: Record<string, string>) {
  for (const [field, value] of Object.entries(fields)) {
    expect(filled(value), `${owner}: "${field}" is empty`).toBe(true);
  }
}

describe("featured projects", () => {
  it.each(featured.map((p) => [p.title, p] as const))("%s is complete", (_title, project) => {
    expectFilled(project.title, {
      title: project.title,
      meta: project.meta,
      description: project.description,
    });
    expect(project.tags.length, `${project.title}: add at least one tag`).toBeGreaterThan(0);
    expect(GRADIENTS, `${project.title}: unknown gradient "${project.gradient}"`).toContain(
      project.gradient,
    );
    expect(project.metrics.length, `${project.title}: at most 4 metrics`).toBeLessThanOrEqual(4);
    for (const metric of project.metrics) {
      expectFilled(project.title, { "metric value": metric.value, "metric label": metric.label });
    }
  });

  it("has links that are empty or full http(s) URLs", () => {
    for (const p of featured) {
      expect(
        isLinkOrEmpty(p.github),
        `${p.title}: github must be empty or a full https:// URL`,
      ).toBe(true);
      expect(
        isLinkOrEmpty(p.kaggle),
        `${p.title}: kaggle must be empty or a full https:// URL`,
      ).toBe(true);
    }
  });
});

describe("more projects", () => {
  it.each(projects.map((p) => [p.title, p] as const))("%s is complete", (_title, project) => {
    expectFilled(project.title, { title: project.title, text: project.text });
    expect(project.tags.length, `${project.title}: add at least one tag`).toBeGreaterThan(0);
    expect(GRADIENTS, `${project.title}: unknown gradient "${project.gradient}"`).toContain(
      project.gradient,
    );
    expect(
      isLinkOrEmpty(project.github),
      `${project.title}: github must be empty or a full URL`,
    ).toBe(true);
    expect(
      isLinkOrEmpty(project.kaggle),
      `${project.title}: kaggle must be empty or a full URL`,
    ).toBe(true);
  });
});

describe("whole site", () => {
  it("never repeats a project title (titles are used as React keys)", () => {
    const titles = [...featured, ...projects].map((p) => p.title);
    const repeated = titles.filter((t, i) => titles.indexOf(t) !== i);
    expect(repeated, "These project titles appear more than once").toEqual([]);
  });

  it("has complete experience entries", () => {
    expect(experience.length).toBeGreaterThan(0);
    for (const item of experience) {
      expectFilled(item.role || "an experience entry", {
        date: item.date,
        role: item.role,
        org: item.org,
        text: item.text,
      });
    }
    const roles = experience.map((e) => e.role);
    expect(new Set(roles).size, "experience roles are used as React keys").toBe(roles.length);
  });

  it("has skill groups with items", () => {
    expect(skills.length).toBeGreaterThan(0);
    for (const skill of skills) {
      expect(filled(skill.group)).toBe(true);
      expect(skill.items.length).toBeGreaterThan(0);
    }
  });

  it("has a valid profile", () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(profile.github).toMatch(/^https:\/\//);
    expect(profile.linkedin).toMatch(/^https:\/\//);
    expect(profile.resume === "" || /^(\/|https?:\/\/)\S+$/.test(profile.resume ?? "")).toBe(true);
  });

  it("has a canonical site address without a trailing slash", () => {
    expect(site.url).toMatch(/^https:\/\/[^/]+$/);
    expect(site.shareImage).toMatch(/^\//);
  });

  it("has copy for every section", () => {
    expect(filled(copy.hero.headline) && filled(copy.hero.intro)).toBe(true);
    expect(filled(copy.about.text)).toBe(true);
    expect(filled(copy.contact.heading)).toBe(true);
  });

  it("points every menu link at a real section id", () => {
    const ids = Object.values(sectionIds) as string[];
    for (const link of navLinks) {
      expect(
        ids,
        `Menu link "${link.label}" points at ${link.href}, which is not a section id in data/site.ts`,
      ).toContain(link.href.slice(1));
    }
  });
});
