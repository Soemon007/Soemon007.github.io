import { CustomCursor } from "@/components/decor/CustomCursor";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { ComingSoonOverlay } from "@/components/overlays/ComingSoonOverlay";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Hero } from "@/components/sections/Hero";
import { MoreProjects } from "@/components/sections/MoreProjects";
import { copy, experience, featured, profile, projects, skills } from "@/data";
import { useReveal } from "@/hooks/useReveal";
import { useSnapScroll } from "@/hooks/useSnapScroll";

/**
 * The whole page, top to bottom. To reorder, add or remove a section, edit the list below;
 * each section's content comes from src/data.
 */
export function HomePage() {
  useReveal();
  useSnapScroll();

  return (
    <div className="min-h-screen">
      <CustomCursor />
      <ComingSoonOverlay />
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <Hero headline={copy.hero.headline} intro={copy.hero.intro} profile={profile} />
        <FeaturedWork label={copy.work.label} title={copy.work.title} projects={featured} />
        <MoreProjects label={copy.more.label} title={copy.more.title} projects={projects} />
        <Experience
          label={copy.experience.label}
          title={copy.experience.title}
          items={experience}
        />
        <About label={copy.about.label} text={copy.about.text} skills={skills} />
        <Contact heading={copy.contact.heading} intro={copy.contact.intro} profile={profile} />
      </main>
      <SiteFooter />
    </div>
  );
}
