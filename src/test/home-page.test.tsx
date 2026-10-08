import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { HomePage } from "@/components/HomePage";
import { copy, featured, navLinks, profile, projects, sectionIds } from "@/data";

// Renders the real page with the real data and checks the things that make it work:
// every section is there, every menu link lands somewhere, every button goes somewhere.

beforeEach(() => {
  window.location.hash = "";
});
afterEach(cleanup);

describe("home page structure", () => {
  it("has exactly one h1, the headline", () => {
    render(<HomePage />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(copy.hero.headline);
  });

  it("renders every section the menu links to", () => {
    const { container } = render(<HomePage />);
    for (const id of Object.values(sectionIds)) {
      expect(
        container.querySelector(`#${id}`),
        `No section on the page has id "${id}"`,
      ).not.toBeNull();
    }
    for (const { href } of navLinks) {
      expect(
        container.querySelector(href),
        `Menu link ${href} has nothing to land on`,
      ).not.toBeNull();
    }
    expect(container.querySelector("main#main")).not.toBeNull();
  });

  it("renders one card per project", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelectorAll("article")).toHaveLength(featured.length + projects.length);
  });

  it("shows the alternating section bands in the intended order", () => {
    const { container } = render(<HomePage />);
    const bands = Array.from(container.querySelectorAll("main > section.section-cut")).map((s) =>
      s.classList.contains("section-cut-reverse") ? "reverse" : "forward",
    );
    expect(bands).toEqual(["forward", "forward", "reverse"]);
  });
});

describe("home page links", () => {
  it("never leaves a link without a destination", () => {
    const { container } = render(<HomePage />);
    for (const a of container.querySelectorAll("a")) {
      const href = a.getAttribute("href");
      expect(href, a.textContent ?? "").toBeTruthy();
      expect(href, "placeholder link").not.toBe("#");
    }
  });

  it("opens outside links in a new tab without leaking the page", () => {
    const { container } = render(<HomePage />);
    for (const a of container.querySelectorAll('a[href^="http"]')) {
      expect(a.getAttribute("target"), a.getAttribute("href") ?? "").toBe("_blank");
      expect(a.getAttribute("rel")).toContain("noopener");
    }
  });

  it("sends links without a URL to the 'haven't added that yet' page", () => {
    const { container } = render(<HomePage />);
    const expected =
      featured.filter((p) => !p.github).length +
      featured.filter((p) => !p.kaggle).length +
      projects.filter((p) => !p.kaggle).length +
      (profile.resume ? 0 : 1);
    expect(container.querySelectorAll('a[href="#soon"]')).toHaveLength(expected);
  });

  it("hides the GitHub button on small cards that have no GitHub link", () => {
    const { container } = render(<HomePage />);
    const smallCards = Array.from(container.querySelectorAll("article")).slice(featured.length);
    smallCards.forEach((card, i) => {
      const hasGithubButton = card.textContent?.includes("View on GitHub");
      expect(hasGithubButton).toBe(Boolean(projects[i]?.github));
    });
  });
});

describe("interactions", () => {
  it("opens and closes the 'haven't added that yet' overlay", () => {
    render(<HomePage />);
    expect(screen.queryByText(copy.comingSoon.heading)).toBeNull();

    act(() => {
      window.location.hash = "#soon";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(screen.getByText(copy.comingSoon.heading)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: copy.comingSoon.back }));
    expect(screen.queryByText(copy.comingSoon.heading)).toBeNull();
    expect(window.location.hash).toBe("");
  });

  it("toggles the mobile menu and closes it with Escape", () => {
    render(<HomePage />);
    const toggle = screen.getByRole("button", { name: "Toggle menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById(toggle.getAttribute("aria-controls") ?? "")).not.toBeNull();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("reveals content when scroll observation is unavailable", () => {
    const { container } = render(<HomePage />);
    const hidden = container.querySelectorAll(".reveal:not([data-in])");
    expect(hidden).toHaveLength(0);
  });
});
