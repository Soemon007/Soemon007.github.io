import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHead } from "@/components/layout/SectionHead";
import { sectionIds, type ExperienceItem } from "@/data";

type ExperienceProps = { label: string; title: string; items: ExperienceItem[] };

/** Work history as a vertical timeline. On wide screens the heading stays pinned beside it. */
export function Experience({ label, title, items }: ExperienceProps) {
  return (
    <Section id={sectionIds.experience}>
      <Container className="experience-columns">
        <SectionHead label={label} title={title} />
        <ul className="timeline border-t">
          {items.map(({ date, role, org, text }, index) => (
            <li
              key={role}
              className="reveal relative grid gap-3 border-b py-10 pl-8 md:grid-cols-[200px_1fr] md:gap-10 md:pl-12"
            >
              <span aria-hidden className={`timeline-dot timeline-dot-${index % 3}`} />
              <p className="label-mono pt-1">{date}</p>
              <div>
                <h3 className="text-2xl font-normal tracking-tight">
                  {role} <span className="text-muted-foreground">· {org}</span>
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
