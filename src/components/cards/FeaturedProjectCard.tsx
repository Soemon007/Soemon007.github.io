import { ProjectLinks } from "@/components/common/ProjectLinks";
import { TagList } from "@/components/common/TagList";
import { GeometryArt, type GeometryVariant } from "@/components/decor/GeometryArt";
import type { FeaturedProject } from "@/data";
import { gradientClass } from "@/lib/gradients";
import { cn } from "@/lib/utils";

// Artwork cycles through these in order, so neighbouring cards never look the same.
const ART: GeometryVariant[] = ["orbit", "fold", "wave"];

type FeaturedProjectCardProps = {
  project: FeaturedProject;
  /** Position in the list. Odd cards put the artwork on the right. */
  index: number;
};

/** Large two-column project card: gradient artwork on one side, details and metrics on the other. */
export function FeaturedProjectCard({ project, index }: FeaturedProjectCardProps) {
  const { title, meta, description, metrics, tags, gradient, github, kaggle } = project;

  return (
    <article className="group reveal lift grid overflow-hidden rounded-[var(--radius-card)] border bg-card md:grid-cols-2">
      <div
        className={cn(
          gradientClass[gradient],
          "flow-panel flex min-h-56 items-center justify-center p-8 sm:min-h-72",
          index % 2 === 1 && "md:order-2",
        )}
      >
        <GeometryArt variant={ART[index % ART.length] ?? "orbit"} className="geometry-project" />
      </div>
      <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:p-12">
        <p className="label-mono">{meta}</p>
        <h3 className="mt-4 text-3xl font-normal tracking-tight md:text-4xl">{title}</h3>
        <p className="mt-4 leading-relaxed text-muted-foreground">{description}</p>
        {metrics.length > 0 && (
          <dl className="mt-8 grid grid-cols-2 gap-6">
            {metrics.map(({ value, label }) => (
              <div key={label}>
                <dt className="display text-3xl sm:text-4xl">{value}</dt>
                <dd className="label-mono mt-1 !text-[11px]">{label}</dd>
              </div>
            ))}
          </dl>
        )}
        <TagList tags={tags} className="mt-8" />
        <ProjectLinks github={github} kaggle={kaggle} className="mt-8" />
      </div>
    </article>
  );
}
