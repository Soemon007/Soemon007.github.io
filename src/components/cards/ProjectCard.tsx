import { ProjectLinks } from "@/components/common/ProjectLinks";
import { TagList } from "@/components/common/TagList";
import type { Project } from "@/data";
import { gradientClass } from "@/lib/gradients";

/** Compact project card for the "More projects" grid. */
export function ProjectCard({ project }: { project: Project }) {
  const { title, text, tags, gradient, github, kaggle } = project;

  return (
    <article className="group reveal lift flex flex-col rounded-[var(--radius-card)] border bg-card p-6 sm:p-8">
      <div aria-hidden className={`${gradientClass[gradient]} flow-panel h-10 w-10 rounded-full`} />
      <h3 className="mt-6 text-xl font-normal tracking-tight">{title}</h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{text}</p>
      <TagList tags={tags} className="mt-6" />
      <ProjectLinks
        github={github}
        kaggle={kaggle}
        kaggleLabel="Kaggle Writeup"
        hideGithubWhenMissing
        size="sm"
        className="mt-6"
      />
    </article>
  );
}
