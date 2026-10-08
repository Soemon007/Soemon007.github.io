import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSnapScroll } from "@/hooks/useSnapScroll";

// A tiny page: a short section (0 to 600) followed by a tall one (700 to 2700) in an 800px window.
function Demo() {
  useSnapScroll();
  return (
    <main>
      <section id="short" />
      <section id="tall" />
    </main>
  );
}

let scrollY = 0;
const scrollTo = vi.fn();

function setMedia({ fine = true, reduced = false } = {}) {
  window.matchMedia = ((query: string) => ({
    matches: query.includes("hover: hover") ? fine : query.includes("reduce") ? reduced : false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
}

/** A wheel gesture that the browser has already scrolled by `to`, followed by the quiet that ends it. */
function scrollWheel(to: number, init: WheelEventInit = { deltaY: 60 }) {
  scrollY = to;
  window.dispatchEvent(new WheelEvent("wheel", init));
  vi.advanceTimersByTime(200);
  vi.advanceTimersByTime(1000);
}

beforeEach(() => {
  vi.useFakeTimers({
    toFake: [
      "setTimeout",
      "clearTimeout",
      "Date",
      "requestAnimationFrame",
      "cancelAnimationFrame",
      "performance",
    ],
  });
  scrollY = 0;
  scrollTo.mockClear();
  window.scrollTo = scrollTo as unknown as typeof window.scrollTo;
  Object.defineProperty(window, "scrollY", { configurable: true, get: () => scrollY });
  Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    value: 2800,
  });
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function (this: Element) {
    const top = this.id === "tall" ? 700 : 0;
    return { top: top - scrollY, height: this.id === "tall" ? 2000 : 600 } as DOMRect;
  });
  setMedia();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("useSnapScroll", () => {
  it("glides to the next section after a small wheel scroll in a short section", () => {
    render(<Demo />);
    scrollWheel(60);
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 700, behavior: "instant" });
  });

  it("glides back up from a short section", () => {
    render(<Demo />);
    scrollY = 500;
    scrollWheel(500, { deltaY: -60 });
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: "instant" });
  });

  it("does nothing for keyboard scrolling, even right after a wheel", () => {
    render(<Demo />);
    window.dispatchEvent(new WheelEvent("wheel", { deltaY: 60 }));
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
    scrollWheel(60, { deltaY: 0 });
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("does nothing when scrolling happens without a wheel", () => {
    render(<Demo />);
    scrollY = 60;
    window.dispatchEvent(new Event("scroll"));
    vi.advanceTimersByTime(2000);
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("does nothing for pinch-zoom or sideways scrolling", () => {
    render(<Demo />);
    scrollWheel(60, { deltaY: 60, ctrlKey: true });
    scrollWheel(60, { deltaY: 5, deltaX: 80 });
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("does nothing for reduced motion or on touch screens", () => {
    setMedia({ reduced: true });
    render(<Demo />);
    scrollWheel(60);
    expect(scrollTo).not.toHaveBeenCalled();
    cleanup();

    setMedia({ fine: false });
    render(<Demo />);
    scrollWheel(60);
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("stops gliding the moment the user scrolls again", () => {
    render(<Demo />);
    scrollY = 60;
    window.dispatchEvent(new WheelEvent("wheel", { deltaY: 60 }));
    vi.advanceTimersByTime(200);
    vi.advanceTimersByTime(100); // a glide is now under way
    const calls = scrollTo.mock.calls.length;
    expect(calls).toBeGreaterThan(0);

    window.dispatchEvent(new WheelEvent("wheel", { deltaY: -30 }));
    vi.advanceTimersByTime(80);
    expect(scrollTo.mock.calls.length).toBe(calls);
  });
});
