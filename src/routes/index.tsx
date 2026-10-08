import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Github, Linkedin, Mail, Menu, X, Download, BarChart3, ArrowLeft } from "lucide-react";
import { CustomCursor } from "@/components/CustomCursor";
import { profile, featured, projects, experience, skills } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rehan Mallik · ML, Quant & Product · IIT Bombay" },
      { name: "description", content: "Portfolio of Rehan Mallik, Chemical Engineering student at IIT Bombay building ML systems for medicine and markets." },
      { property: "og:title", content: "Rehan Mallik · ML, Quant & Product" },
      { property: "og:description", content: "Building intelligent systems for medicine and markets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const gradClass = { peach: "grad-peach", lavender: "grad-lavender", mint: "grad-mint", sky: "grad-sky", butter: "grad-butter" } as const;

function useReveal() {
  // Runs after every render so newly mounted or re-rendered elements are always picked up.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not([data-in])"));
    const show = (el: Element) => el.setAttribute("data-in", "");
    if (typeof IntersectionObserver === "undefined") {
      els.forEach(show);
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" },
    );
    els.forEach((el) => io.observe(el));
    // Safety net: never leave content hidden.
    const t = window.setTimeout(() => els.forEach(show), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  });
}

const Container = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-[1200px] px-5 md:px-8 ${className}`}>{children}</div>
);

const Tag = ({ children }: { children: ReactNode }) => (
  <span className="tag-flow rounded-full border px-3 py-1 font-mono text-[11px] text-muted-foreground">{children}</span>
);

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Links with no URL yet go to the "haven't added that yet" page. */
const SOON = "#soon";
const linkProps = (url?: string) => (url ? { href: url, ...ext } : { href: SOON });

function ProjectLinks({ github, kaggle, className = "", small, kaggleLabel = "View on Kaggle", alwaysGithub = true }: { github?: string | undefined; kaggle?: string | undefined; className?: string; small?: boolean; kaggleLabel?: string; alwaysGithub?: boolean }) {
  const cls = `pill pill-secondary ${small ? "!px-4 !py-2 text-sm" : ""}`;
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {(github || alwaysGithub) && <a {...linkProps(github)} className={cls}><Github className="h-4 w-4" />View on GitHub</a>}
      <a {...linkProps(kaggle)} className={cls}><BarChart3 className="h-4 w-4" />{kaggleLabel}</a>
    </div>
  );
}

const links = [["Work", "#work"], ["Experience", "#experience"], ["About", "#about"], ["Contact", "#contact"]];

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a href="#contact" className="block bg-band py-2.5 text-center text-[13px] text-foreground">
        Open to summer 2027 internships in quant, ML and product <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
      </a>
      <header className="sticky top-0 z-50 border-b bg-background/75 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between">
          <a href="#top" className="text-[17px] font-medium tracking-tight">Rehan Mallik</a>
          <nav className="hidden gap-6 text-[14px] text-muted-foreground md:flex lg:gap-8">
            {links.map(([l, h]) => <a key={h} href={h} className="link-flow hover:text-foreground">{l}</a>)}
          </nav>
          <a href="#contact" className="pill pill-primary hidden !py-2 text-sm md:inline-flex">Get in touch</a>
          <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </Container>
        {open && (
          <nav className="border-t bg-background md:hidden">
            <Container className="flex flex-col gap-4 py-5">
              {links.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
              <a href="#contact" onClick={() => setOpen(false)} className="pill pill-primary w-fit">Get in touch</a>
            </Container>
          </nav>
        )}
      </header>
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-16 sm:pt-24 md:pb-28 md:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb left-[8%] top-[5%] h-80 w-80 bg-peach" />
        <div className="orb right-[10%] top-[0%] h-96 w-96 bg-lavender [animation-delay:-6s]" />
        <div className="orb left-[30%] top-[40%] h-72 w-72 bg-mint [animation-delay:-12s]" />
        <div className="orb right-[25%] top-[45%] h-64 w-64 bg-sky [animation-delay:-3s]" />
        <div className="orb left-[55%] top-[15%] h-56 w-56 bg-butter [animation-delay:-9s]" />
      </div>
      <Container className="relative text-center">
        <h1 className="display reveal mx-auto max-w-5xl text-[clamp(40px,8vw,96px)]">
          Building and breaking models for fun.
        </h1>
        <p className="reveal mx-auto mt-8 max-w-2xl text-[17px] leading-relaxed text-muted-foreground md:text-lg">
          Hey there! I am Rehan Mallik and this is my website, where you'll
          find all the projects I've undertaken. Have fun!
        </p>
        <div className="reveal mt-10 flex flex-wrap justify-center gap-3">
          <a href="#work" className="pill pill-primary">View work</a>
          <a {...linkProps(profile.resume)} className="pill pill-secondary"><Download className="h-4 w-4" />Download resume</a>
        </div>
        <div className="reveal mt-8 flex justify-center gap-5 text-muted-foreground">
          <a href={profile.github} {...ext} aria-label="GitHub" className="hover:text-foreground"><Github className="h-5 w-5" /></a>
          <a href={profile.linkedin} {...ext} aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="h-5 w-5" /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-foreground"><Mail className="h-5 w-5" /></a>
        </div>
      </Container>
    </section>
  );
}

function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <div className="reveal mb-16">
      <p className="label-mono">{label}</p>
      <h2 className="display mt-4 max-w-3xl text-[clamp(36px,5vw,64px)]">{title}</h2>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="py-20 md:py-28 lg:py-36">
      <Container>
        <SectionHead label="Selected work" title="Research and systems I've built" />
        <div className="flex flex-col gap-8">
          {featured.map((f, i) => (
            <article key={f.title} className="group reveal lift grid overflow-hidden rounded-[var(--radius-card)] border bg-card md:grid-cols-2">
              <div className={`${gradClass[f.gradient]} flow-panel flex min-h-56 sm:min-h-72 items-center justify-center p-8 ${i % 2 ? "md:order-2" : ""}`}>
              </div>
              <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:p-12">
                <p className="label-mono">{f.meta}</p>
                <h3 className="mt-4 text-3xl font-normal tracking-tight md:text-4xl">{f.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{f.description}</p>
                {f.metrics.length > 0 && (
                  <dl className="mt-8 grid grid-cols-2 gap-6">
                    {f.metrics.map((m) => (
                      <div key={m.label}>
                        <dt className="display text-3xl sm:text-4xl">{m.value}</dt>
                        <dd className="label-mono mt-1 !text-[11px]">{m.label}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <div className="mt-8 flex flex-wrap gap-2">{f.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                <ProjectLinks github={f.github} kaggle={f.kaggle} className="mt-8" />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function More() {
  return (
    <section className="bg-band py-20 md:py-28 lg:py-36">
      <Container>
        <SectionHead label="More projects" title="Other things I've made" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article key={p.title} className="group reveal lift flex flex-col rounded-[var(--radius-card)] border bg-card p-6 sm:p-8">
              <div className={`${gradClass[p.gradient]} h-10 w-10 rounded-full`} />
              <h3 className="mt-6 text-xl font-normal tracking-tight">{p.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{p.text}</p>
              <div className="mt-6 flex flex-wrap gap-2">{p.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
              <ProjectLinks github={p.github} kaggle={p.kaggle} className="mt-6" small kaggleLabel="Kaggle Writeup" alwaysGithub={false} />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 lg:py-36">
      <Container>
        <SectionHead label="PROFESSIONAL EXPERIENCE" title="Where I've worked" />
        <ul className="timeline border-t">
          {experience.map((e, i) => (
            <li key={e.role} className="reveal relative grid gap-3 border-b py-10 pl-8 md:grid-cols-[200px_1fr] md:gap-10 md:pl-12">
              <span aria-hidden className={`timeline-dot timeline-dot-${i % 3}`} />
              <p className="label-mono pt-1">{e.date}</p>
              <div>
                <h3 className="text-2xl font-normal tracking-tight">{e.role === "Junior Engineer" ? "Junior Engineer · IITB Rocket Team" : <>{e.role} <span className="text-muted-foreground">· {e.org}</span></>}</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{e.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-band py-20 md:py-28 lg:py-36">
      <Container>
        <p className="label-mono reveal">About</p>
        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
          <p className="reveal text-2xl font-light leading-snug tracking-tight md:text-[28px]">
            I'm a Chemical Engineering undergrad at IIT Bombay with a Minor in AI & Data Science. I like problems where careful modelling meets messy real-world data, from medical imaging to markets. I'm happiest shipping things end to end, from research to product.
          </p>
          <div className="reveal flex flex-col gap-8">
            {skills.map((s) => (
              <div key={s.group}>
                <p className="label-mono">{s.group}</p>
                <p className="mt-2 leading-relaxed">{s.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 lg:py-36">
      <Container>
        <div className="group reveal grad-lavender flow-panel rounded-[var(--radius-card)] px-5 py-16 text-center sm:py-24 md:py-32">
          <h2 className="display text-[clamp(44px,7vw,88px)]">Wanna get in touch?</h2>
          <p className="mt-6 break-all text-muted-foreground">Here are ways you can contact me:</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${profile.email}`} className="pill pill-primary"><Mail className="h-4 w-4" />Email me</a>
            <a href={profile.github} {...ext} className="pill pill-secondary"><Github className="h-4 w-4" />GitHub</a>
            <a href={profile.linkedin} {...ext} className="pill pill-secondary"><Linkedin className="h-4 w-4" />LinkedIn</a>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Full-screen "haven't added that yet" message, shown when a link has no URL yet. */
function Soon() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const sync = () => setOpen(window.location.hash === "#soon");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  if (!open) return null;
  const close = () => { history.replaceState(null, "", window.location.pathname); setOpen(false); };
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-background px-5 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb left-[15%] top-[15%] h-72 w-72 bg-peach" />
        <div className="orb right-[15%] top-[30%] h-80 w-80 bg-lavender [animation-delay:-6s]" />
        <div className="orb bottom-[10%] left-[40%] h-64 w-64 bg-mint [animation-delay:-12s]" />
      </div>
      <div className="relative">
        <h2 className="display text-[clamp(40px,8vw,88px)]">Oops, haven't added that yet :)</h2>
        <p className="mt-6 text-muted-foreground">Check back soon.</p>
        <button onClick={close} className="pill pill-primary mt-10"><ArrowLeft className="h-4 w-4" />Back to portfolio</button>
      </div>
    </div>
  );
}

function Index() {
  useReveal();
  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Soon />
      <Nav />
      <main>
        <Hero />
        <Work />
        <More />
        <Experience />
        <About />
        <Contact />
      </main>
      <footer className="border-t py-10">
        <Container className="flex flex-col justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <span>© 2026 Rehan Mallik</span>
          <div className="flex gap-6">
            <a href={profile.github} {...ext} className="hover:text-foreground">GitHub</a>
            <a href={profile.linkedin} {...ext} className="hover:text-foreground">LinkedIn</a>
            <a href={`mailto:${profile.email}`} className="hover:text-foreground">Email</a>
          </div>
        </Container>
      </footer>
    </div>
  );
}
