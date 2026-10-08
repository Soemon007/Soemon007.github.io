import { useEffect } from "react";

/**
 * Plays the entrance of anything marked `reveal` (a fade-up) or `reveal-band` (a section's angled band
 * dropping in, added by <Section cut>) as it scrolls into view. Call once per page. To animate an
 * element, just add `reveal` to its className.
 *
 * Content is only hidden once JavaScript is running (the `js` class on <html>), so the
 * pre-rendered page is fully readable before the scripts load, and without them. It is also
 * always shown for reduced motion and when printing (see styles/motion.css).
 */
export function useReveal() {
  // Runs after every render so newly mounted or re-rendered elements are always picked up.
  useEffect(() => {
    const all = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not([data-in]), .reveal-band:not([data-in])"),
    );
    const show = (el: Element) => el.setAttribute("data-in", "");

    if (typeof IntersectionObserver === "undefined") {
      all.forEach(show);
      return;
    }

    // Anything already on screen stays visible; only what is below the fold animates in.
    const pending = all.filter((el) => el.getBoundingClientRect().top >= window.innerHeight);
    all.filter((el) => !pending.includes(el)).forEach(show);
    document.documentElement.classList.add("js");

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" },
    );
    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}
