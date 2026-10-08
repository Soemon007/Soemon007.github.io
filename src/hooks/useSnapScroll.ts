import { useEffect } from "react";
import { COMING_SOON_HASH } from "@/lib/links";
import { snapTarget } from "@/lib/snap";

/** Quiet time after the last wheel or scroll event before deciding where to glide. */
const SETTLE_MS = 140;

/** Only react to scrolling driven by a wheel or trackpad this recently (not keys, links or the scrollbar). */
const WHEEL_WINDOW_MS = 700;

/** Glide time: scaled to the distance, within these limits. Short and fast-starting, so it feels snappy. */
const MIN_GLIDE_MS = 380;
const MAX_GLIDE_MS = 650;

/**
 * When you stop scrolling with the mouse wheel or trackpad, glides the page to the next (or previous)
 * section, so moving through the page feels snappy and alive. Call once per page.
 *
 * It only ever acts on mouse and trackpad scrolling on desktop. Keyboard scrolling, link jumps, touch,
 * scrollbar dragging and reduced motion are left completely alone, and any new input cancels a glide in
 * progress. Which scrolls count, and where they go, is decided by lib/snap.ts.
 */
export function useSnapScroll() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const allowed = () =>
      finePointer.matches && !reducedMotion.matches && window.location.hash !== COMING_SOON_HASH;

    let settleTimer = 0;
    let frame = 0;
    let gliding = false;
    let lastWheelAt = 0;
    // How far the wheel has asked to scroll in the current gesture (positive is down). The direction comes
    // from the wheel itself: by the time we look, the browser may already have moved the page.
    let gestureDelta: number | null = null;

    const stopGlide = () => {
      cancelAnimationFrame(frame);
      gliding = false;
    };

    const glideTo = (target: number) => {
      const from = window.scrollY;
      const distance = target - from;
      if (Math.abs(distance) < 2) return;

      const duration = Math.min(MAX_GLIDE_MS, Math.max(MIN_GLIDE_MS, Math.abs(distance) * 0.5));
      const startedAt = performance.now();
      gliding = true;

      const step = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 4); // fast start, soft landing, like --ease-snap
        window.scrollTo({ top: from + distance * eased, behavior: "instant" });
        if (progress < 1) frame = requestAnimationFrame(step);
        else gliding = false;
      };
      frame = requestAnimationFrame(step);
    };

    const settle = () => {
      const delta = gestureDelta;
      gestureDelta = null;
      if (!delta || !allowed() || Date.now() - lastWheelAt > WHEEL_WINDOW_MS) return;

      const y = window.scrollY;

      const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
      const target = snapTarget({
        y,
        direction: delta > 0 ? 1 : -1,
        // Rest each section where anchor links already put it (its scroll-margin-top).
        starts: sections.map((section) => {
          const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
          return Math.max(0, Math.round(section.getBoundingClientRect().top + y - margin));
        }),
        heights: sections.map((section) => section.getBoundingClientRect().height),
        viewport: window.innerHeight,
        maxScroll: document.documentElement.scrollHeight - window.innerHeight,
      });
      if (target !== null) glideTo(target);
    };

    const wait = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, SETTLE_MS);
    };

    const onWheel = (event: WheelEvent) => {
      // Pinch-zoom and sideways scrolling are not "scroll down the page".
      if (event.ctrlKey || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      stopGlide();
      lastWheelAt = Date.now();
      gestureDelta = (gestureDelta ?? 0) + event.deltaY;
      wait();
    };
    const onScroll = () => {
      if (!gliding && gestureDelta !== null) wait();
    };
    // Anything else that moves or grabs the page takes over: no snapping for that scroll.
    const onOtherInput = () => {
      stopGlide();
      window.clearTimeout(settleTimer);
      gestureDelta = null;
      lastWheelAt = 0;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onOtherInput);
    window.addEventListener("pointerdown", onOtherInput);
    window.addEventListener("touchstart", onOtherInput, { passive: true });
    window.addEventListener("hashchange", onOtherInput);
    return () => {
      stopGlide();
      window.clearTimeout(settleTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onOtherInput);
      window.removeEventListener("pointerdown", onOtherInput);
      window.removeEventListener("touchstart", onOtherInput);
      window.removeEventListener("hashchange", onOtherInput);
    };
  }, []);
}
