import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { PillLink } from "@/components/common/PillLink";
import { Container } from "@/components/layout/Container";
import { navLinks, profile, sectionIds } from "@/data";

const MENU_ID = "mobile-menu";

/** Sticky top bar: name, section links, and a collapsible menu on small screens. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/75 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <a href={`#${sectionIds.top}`} className="text-[17px] font-medium tracking-tight">
          {profile.name}
        </a>
        <nav className="hidden gap-6 text-[14px] text-muted-foreground md:flex lg:gap-8">
          {navLinks.map(({ label, href }) => (
            <a key={href} href={href} className="link-flow hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
        <PillLink
          variant="primary"
          href={`#${sectionIds.contact}`}
          className="hidden !py-2 text-sm md:inline-flex"
        >
          Get in touch
        </PillLink>
        <button
          className="md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls={MENU_ID}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </Container>
      {open && (
        <nav id={MENU_ID} className="border-t bg-background md:hidden">
          <Container className="flex flex-col gap-4 py-5">
            {navLinks.map(({ label, href }) => (
              <a key={href} href={href} onClick={close}>
                {label}
              </a>
            ))}
            <PillLink
              variant="primary"
              href={`#${sectionIds.contact}`}
              onClick={close}
              className="w-fit"
            >
              Get in touch
            </PillLink>
          </Container>
        </nav>
      )}
    </header>
  );
}
