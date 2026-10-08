import { describe, expect, it } from "vitest";
import { WOBBLE, snapTarget, type SnapInput } from "@/lib/snap";

// Positions measured from the real page on an 800px-tall window: the hero, About and Contact fit on one
// screen; Work, More and Experience are taller than the screen.
const page: Omit<SnapInput, "y" | "direction"> = {
  starts: [0, 706, 2919, 4258, 5224, 5875],
  heights: [681, 2169, 1294, 922, 608, 769],
  viewport: 800,
  maxScroll: 6029,
};
const down = (y: number) => snapTarget({ ...page, y, direction: 1 });
const up = (y: number) => snapTarget({ ...page, y, direction: -1 });

describe("scrolling down", () => {
  it("hands a short section over to the next one as soon as you scroll", () => {
    expect(down(WOBBLE + 10)).toBe(706); // hero -> work
    expect(down(5224 + 60)).toBe(5875); // about -> contact
  });

  it("ignores a wobble and a page that is already resting on a section", () => {
    expect(down(0)).toBeNull();
    expect(down(WOBBLE)).toBeNull();
    expect(down(706)).toBeNull();
  });

  it("lets a tall section scroll freely, until you are near its end", () => {
    expect(down(706 + 100)).toBeNull();
    expect(down(2400)).toBeNull(); // 519px from the next section
    expect(down(2600)).toBe(2919); // 319px away: hand over
  });

  it("does nothing past the last section, so the footer stays reachable", () => {
    expect(down(5875 + 120)).toBeNull();
  });
});

describe("scrolling up", () => {
  it("returns to the start of a short section you are inside", () => {
    expect(up(5875 - 60)).toBe(5224); // from contact back to about
    expect(up(681)).toBe(0); // from work back to the hero
  });

  it("hands over near the top of a tall section, and leaves it alone elsewhere", () => {
    expect(up(1000)).toBe(706); // 294px below the top of work
    expect(up(2859)).toBeNull(); // tail of work, far from its top
  });

  it("ignores a wobble above a section start", () => {
    expect(up(706 + 10)).toBeNull();
    expect(up(0)).toBeNull();
  });
});

describe("edge cases", () => {
  it("never targets a position the page cannot reach", () => {
    expect(snapTarget({ ...page, y: 5300, direction: 1, maxScroll: 5500 })).toBe(5500);
  });

  it("does nothing on a page without sections", () => {
    expect(snapTarget({ ...page, starts: [], heights: [], y: 100, direction: 1 })).toBeNull();
  });

  it("treats every section as tall when the window is very short", () => {
    const small = { ...page, viewport: 400 };
    expect(snapTarget({ ...small, y: 40, direction: 1 })).toBeNull();
  });
});
