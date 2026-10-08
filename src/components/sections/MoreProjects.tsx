import { ProjectCard } from "@/components/cards/ProjectCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHead } from "@/components/layout/SectionHead";
import type { Project } from "@/data";

type MoreProjectsProps = { label: string; title: string; projects: Project[] };

/** "More projects": a staggered grid of compact cards. */
export function MoreProjects({ label, title, projects }: MoreProjectsProps) {
  return (
    <Section cut="forward" className="more-layout">
      <Container>
        <SectionHead label={label} title={title} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
