import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  /** Anchor id, so the menu can link to the section. Use a value from `sectionIds` in data/site.ts. */
  id?: string;
  /**
   * Tinted band with angled top and bottom edges (the "section cut").
   * `forward` slopes one way, `reverse` the other, so neighbouring bands alternate.
   */
  cut?: "forward" | "reverse";
  className?: string;
  children: ReactNode;
};

/**
 * One full-width section of the page. It owns the vertical spacing, so every section
 * breathes the same amount. Put a <Container> inside it.
 */
export function Section({ id, cut, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-28 lg:py-36",
        cut && "section-cut reveal-band",
        cut === "reverse" && "section-cut-reverse",
        className,
      )}
    >
      {children}
    </section>
  );
}
