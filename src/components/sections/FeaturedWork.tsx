import { FeaturedProjectCard } from "@/components/cards/FeaturedProjectCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHead } from "@/components/layout/SectionHead";
import { sectionIds, type FeaturedProject } from "@/data";

type FeaturedWorkProps = { label: string; title: string; projects: FeaturedProject[] };

/** "Selected work": the large project cards, stacked and slightly staggered on wide screens. */
export function FeaturedWork({ label, title, projects }: FeaturedWorkProps) {
  return (
    <Section id={sectionIds.work} cut="forward" className="work-layout">
      <Container>
        <SectionHead label={label} title={title} />
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <FeaturedProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
