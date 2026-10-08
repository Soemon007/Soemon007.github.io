import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Centres content and gives it the site's standard width and side padding. Use inside every section. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-5 md:px-8", className)}>{children}</div>
  );
}
