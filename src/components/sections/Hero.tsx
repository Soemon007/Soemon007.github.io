import { Download, Github, Linkedin, Mail } from "lucide-react";
import { PillLink } from "@/components/common/PillLink";
import { GeometryArt } from "@/components/decor/GeometryArt";
import { Container } from "@/components/layout/Container";
import { sectionIds, type Profile } from "@/data";
import { externalLinkProps, linkProps } from "@/lib/links";

type HeroProps = { headline: string; intro: string; profile: Profile };

/** Opening section: headline, short intro, the two main buttons and social icons. */
export function Hero({ headline, intro, profile }: HeroProps) {
  return (
    <section
      id={sectionIds.top}
      className="relative overflow-hidden pb-20 pt-16 sm:pt-24 md:pb-28 md:pt-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <GeometryArt variant="orbit" className="geometry-hero-left" />
        <GeometryArt variant="fold" className="geometry-hero-right" />
      </div>
      <Container className="relative text-center">
        <h1 className="display reveal mx-auto max-w-5xl text-[clamp(40px,8vw,96px)]">{headline}</h1>
        <p className="reveal mx-auto mt-8 max-w-2xl text-[17px] leading-relaxed text-muted-foreground md:text-lg">
          {intro}
        </p>
        <div className="reveal mt-10 flex flex-wrap justify-center gap-3">
          <PillLink variant="primary" href={`#${sectionIds.work}`}>
            View work
          </PillLink>
          <PillLink icon={<Download className="h-4 w-4" />} {...linkProps(profile.resume)}>
            Download resume
          </PillLink>
        </div>
        <div className="reveal mt-8 flex justify-center gap-5 text-muted-foreground">
          <a
            href={profile.github}
            {...externalLinkProps}
            aria-label="GitHub"
            className="hover:text-foreground"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={profile.linkedin}
            {...externalLinkProps}
            aria-label="LinkedIn"
            className="hover:text-foreground"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-foreground">
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </Container>
    </section>
  );
}
