import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useReveal } from "@/hooks/useReveal";

// jsdom has no layout and no IntersectionObserver, so both are stood in for here.

type Callback = (entries: Partial<IntersectionObserverEntry>[]) => void;
let callback: Callback = () => {};

class FakeObserver {
  constructor(cb: Callback) {
    callback = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

function Demo() {
  useReveal();
  return (
    <>
      <div id="above" className="reveal" />
      <div id="below" className="reveal" />
      <section id="band-above" className="section-cut reveal-band" />
      <section id="band-below" className="section-cut reveal-band" />
    </>
  );
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("IntersectionObserver", FakeObserver);
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function (this: Element) {
    return { top: this.id.endsWith("below") ? 5000 : 100 } as DOMRect;
  });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
  document.documentElement.classList.remove("js");
});

describe("useReveal", () => {
  it("shows what is already on screen and hides only what is below the fold", () => {
    const { container } = render(<Demo />);
    expect(container.querySelector("#above")).toHaveAttribute("data-in");
    expect(container.querySelector("#below")).not.toHaveAttribute("data-in");
    expect(document.documentElement).toHaveClass("js");
  });

  it("reveals a hidden element when it scrolls into view, and not before", () => {
    const { container } = render(<Demo />);
    const below = container.querySelector("#below") as HTMLElement;

    act(() => vi.advanceTimersByTime(60_000));
    expect(below, "must not fade in on a timer, only on scroll").not.toHaveAttribute("data-in");

    act(() => callback([{ target: below, isIntersecting: true }]));
    expect(below).toHaveAttribute("data-in");
  });

  it("treats a section band like any other entrance: visible if on screen, otherwise waits for scroll", () => {
    const { container } = render(<Demo />);
    const above = container.querySelector("#band-above") as HTMLElement;
    const below = container.querySelector("#band-below") as HTMLElement;
    expect(above).toHaveAttribute("data-in");
    expect(below).not.toHaveAttribute("data-in");

    act(() => callback([{ target: below, isIntersecting: true }]));
    expect(below).toHaveAttribute("data-in");
  });
});
