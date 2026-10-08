import { Github, Linkedin, Mail } from "lucide-react";
import { PillLink } from "@/components/common/PillLink";
import { GeometryArt } from "@/components/decor/GeometryArt";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { sectionIds, type Profile } from "@/data";
import { externalLinkProps } from "@/lib/links";

type ContactProps = { heading: string; intro: string; profile: Profile };

/** Closing call to action on a gradient panel. */
export function Contact({ heading, intro, profile }: ContactProps) {
  return (
    <Section id={sectionIds.contact}>
      <Container>
        <div className="group reveal relative grad-lavender flow-panel overflow-hidden rounded-[var(--radius-card)] px-5 py-16 text-center sm:py-24 md:py-32">
          <GeometryArt variant="wave" className="geometry-contact pointer-events-none absolute" />
          <div className="relative">
            <h2 className="display text-[clamp(44px,7vw,88px)]">{heading}</h2>
            <p className="mt-6 text-muted-foreground">{intro}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <PillLink
                variant="primary"
                icon={<Mail className="h-4 w-4" />}
                href={`mailto:${profile.email}`}
              >
                Email me
              </PillLink>
              <PillLink
                icon={<Github className="h-4 w-4" />}
                href={profile.github}
                {...externalLinkProps}
              >
                GitHub
              </PillLink>
              <PillLink
                icon={<Linkedin className="h-4 w-4" />}
                href={profile.linkedin}
                {...externalLinkProps}
              >
                LinkedIn
              </PillLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
