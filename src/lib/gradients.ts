import type { Gradient } from "@/data/types";

// Class names are written out in full (not built from strings) so Tailwind can find them.
// The gradients themselves are defined in styles/utilities.css.
export const gradientClass: Record<Gradient, string> = {
  peach: "grad-peach",
  lavender: "grad-lavender",
  mint: "grad-mint",
  sky: "grad-sky",
  butter: "grad-butter",
};
