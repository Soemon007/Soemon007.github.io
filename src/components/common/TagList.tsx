import { cn } from "@/lib/utils";

/** A wrapped row of small pill-shaped labels, such as the technologies a project used. */
export function TagList({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="tag-flow rounded-full border px-3 py-1 font-mono text-[11px] text-muted-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
