import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PillLinkProps = ComponentProps<"a"> & {
  /** `primary` is the solid dark button; `secondary` is the outlined one. */
  variant?: "primary" | "secondary";
  /** `sm` is for compact cards. */
  size?: "md" | "sm";
  /** Small icon shown before the label (use `className="h-4 w-4"`). */
  icon?: ReactNode;
};

/** The site's rounded button-link. Use this for every button so they all look and behave the same. */
export function PillLink({
  variant = "secondary",
  size = "md",
  icon,
  className,
  children,
  ...props
}: PillLinkProps) {
  return (
    <a
      className={cn(
        "pill",
        variant === "primary" ? "pill-primary" : "pill-secondary",
        size === "sm" && "!px-4 !py-2 text-sm",
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </a>
  );
}
