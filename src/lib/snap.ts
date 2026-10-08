/**
 * Decides where the page should glide to when the user stops scrolling, so moving through the sections
 * feels snappy: a short section hands over to its neighbour as soon as you scroll, while a section taller
 * than the screen scrolls freely and only hands over when you are near its edge.
 *
 * This is pure arithmetic (no DOM), so it is easy to test. hooks/useSnapScroll.ts feeds it real positions.
 */

export type SnapInput = {
  /** Current scroll position. */
  y: number;
  /** Which way the user was scrolling: 1 is down, -1 is up. */
  direction: 1 | -1;
  /** The scroll position at which each section sits neatly at the top, in page order. */
  starts: number[];
  /** Height of each section, in the same order. */
  heights: number[];
  /** Height of the visible window. */
  viewport: number;
  /** The furthest the page can scroll. */
  maxScroll: number;
};

/** Movements smaller than this are treated as a wobble, not as an intention to move on. */
export const WOBBLE = 24;

/** A section at most this tall (as a fraction of the window) counts as "short": it fits on one screen. */
const SHORT = 0.95;

/** For tall sections, the hand-over only starts this close (as a fraction of the window) to the edge. */
const NEAR = 0.5;

/** The scroll position to glide to, or null to leave the page where it is. */
export function snapTarget({ y, direction, starts, heights, viewport, maxScroll }: SnapInput) {
  // The section whose resting position is at or just above the top of the window.
  let current = -1;
  starts.forEach((start, index) => {
    if (start <= y + 1) current = index;
  });
  if (current === -1) return null;

  const start = starts[current] ?? 0;
  const isShort = (heights[current] ?? Infinity) <= viewport * SHORT;
  const into = y - start;
  const clamp = (value: number) => Math.min(Math.max(value, 0), maxScroll);

  if (direction > 0) {
    const next = starts[current + 1];
    if (next === undefined) return null;
    const handOver = isShort ? into > WOBBLE : next - y <= viewport * NEAR;
    return handOver ? clamp(next) : null;
  }

  if (into <= WOBBLE) return null;
  return isShort || into <= viewport * NEAR ? clamp(start) : null;
}
