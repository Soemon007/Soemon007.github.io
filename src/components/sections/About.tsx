import { GeometryArt } from "@/components/decor/GeometryArt";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { sectionIds, type SkillGroup } from "@/data";

type AboutProps = { label: string; text: string; skills: SkillGroup[] };

/** A short bio next to the skills list. */
export function About({ label, text, skills }: AboutProps) {
  return (
    <Section id={sectionIds.about} cut="reverse" className="relative">
      <GeometryArt variant="wave" className="geometry-about pointer-events-none absolute" />
      <Container className="relative">
        <p className="label-mono reveal">{label}</p>
        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
          <p className="reveal text-2xl font-light leading-snug tracking-tight md:text-[28px]">
            {text}
          </p>
          <div className="reveal flex flex-col gap-8">
            {skills.map(({ group, items }) => (
              <div key={group}>
                <p className="label-mono">{group}</p>
                <p className="mt-2 leading-relaxed">{items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
