import { Container } from "@/components/layout/Container";
import { profile, site } from "@/data";
import { externalLinkProps } from "@/lib/links";

export function SiteFooter() {
  return (
    <footer className="border-t py-10">
      <Container className="flex flex-col justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <span>{`© ${site.copyrightYear} ${profile.name}`}</span>
        <div className="flex gap-6">
          <a href={profile.github} {...externalLinkProps} className="hover:text-foreground">
            GitHub
          </a>
          <a href={profile.linkedin} {...externalLinkProps} className="hover:text-foreground">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-foreground">
            Email
          </a>
        </div>
      </Container>
    </footer>
  );
}
