# Architecture

How the site is organised, how to add to it, and how it reaches the live address.

## Where things live

```
src/
├─ data/                 EVERY word, link and number on the site (typed). Edit content here.
│  ├─ copy.ts            headings and paragraphs for each section
│  ├─ projects.ts        featured projects and "more projects"
│  ├─ experience.ts      work history
│  ├─ skills.ts          skill groups
│  ├─ profile.ts         name, email, GitHub, LinkedIn, resume
│  ├─ site.ts            page title, link-preview text, section ids, menu links
│  └─ types.ts           the shape of all of the above (the compiler checks your edits)
│
├─ routes/               URLs only. Kept deliberately thin.
│  ├─ __root.tsx         the HTML shell: <head>, fonts, backdrop (shared by every page)
│  └─ index.tsx          "/" -> HomePage, plus its <head> tags
│
├─ components/
│  ├─ HomePage.tsx       the page, top to bottom: the ordered list of sections
│  ├─ sections/          one file per section: Hero, FeaturedWork, MoreProjects, Experience, About, Contact
│  ├─ cards/             FeaturedProjectCard (large) and ProjectCard (compact)
│  ├─ layout/            Container, Section, SectionHead, SiteHeader, SiteFooter, SkipLink
│  ├─ common/            small building blocks: PillLink (buttons), TagList, ProjectLinks
│  ├─ decor/             GeometryArt, CustomCursor, GraphBackdrop
│  ├─ overlays/          ComingSoonOverlay ("haven't added that yet")
│  └─ ui/                generated shadcn components. Not used by the page today; don't hand-edit.
│
├─ hooks/                useReveal (fade-in on scroll)
├─ lib/                  links.ts (link handling), gradients.ts, seo.ts (<head> tags), utils.ts (cn)
├─ styles.css            entry point; imports everything in styles/
├─ styles/               fonts, tokens (colours), base, utilities, motion, decor, sections
└─ test/                 data, page, SEO and project-rule tests

public/                  files served as-is: fonts/, og.jpg (link preview), favicon, robots.txt, sitemap.xml
scripts/                 export-static.mjs (build the static site), verify-static.mjs (check it), routes.mjs
deploy/                  ready-made GitHub Actions workflow for auto-deploy (see below)
docs/                    this file and DESIGN_SYSTEM.md
```

## How a page is built

```
src/data/*  ──►  HomePage  ──►  sections/*  ──►  cards/*, common/*   (all styled with tokens)
 (content)       (order)        (layout)          (building blocks)
```

- **Data flows one way.** `HomePage` reads from `src/data` and hands each section exactly what it needs as
  props. Sections never import data directly, so they stay reusable and easy to test.
- **Dependencies point downward.** `data` imports nothing from the app. Components never import routes.
  Tests enforce this (`src/test/project-contract.test.ts`).
- **One place for each decision.** Section spacing is in `Section`, width in `Container`, button look in
  `PillLink`, colours in `tokens.css`. Change it there and the whole site follows.

## Everyday recipes

| I want to… | Do this |
| --- | --- |
| Change any text | Edit the matching file in `src/data/` |
| Add a featured project | Copy a block in `src/data/projects.ts` → `featured`. Cards alternate sides automatically |
| Add a smaller project | Copy a block in `src/data/projects.ts` → `projects` |
| Add a job or role | Copy a block in `src/data/experience.ts` (newest first) |
| Add a skill | Add it to a group in `src/data/skills.ts` |
| Link a project's GitHub/Kaggle | Paste the full URL into its `github` / `kaggle` field. Empty means "coming soon" |
| Enable the resume button | Put `resume.pdf` in `public/`, set `resume: "/resume.pdf"` in `src/data/profile.ts` |
| Change a colour or font | Edit `src/styles/tokens.css` (and `fonts.css` for a new font file in `public/fonts/`) |
| Add a new look used in several places | Add an `@utility` to `src/styles/utilities.css` |
| Add a section | 1) new file in `components/sections/` built with `<Section>` + `<Container>` + `<SectionHead>`; 2) its text in `data/copy.ts`; 3) one line in `HomePage.tsx`; 4) an id in `data/site.ts` if the menu should link to it |
| Add a page | New file in `src/routes/` (for example `blog.tsx`), then add its URL to `public/sitemap.xml`. The static build finds it automatically |
| Change the link-preview image | Replace `public/og.jpg` (1200×630) |

Alternate the angled section bands (`cut="forward"` / `cut="reverse"` on `Section`) so neighbours differ.

## Building and checking

```sh
bun install
bun run dev            # local development
bun run check          # everything below, in order (run before publishing)
```

`check` = `typecheck` → `lint` → `test` → `build:static` → `verify:static`:

- **typecheck:** TypeScript validates every edit against the shapes in `src/data/types.ts`.
- **lint:** code style and common mistakes.
- **test:** content validity, the page structure, every link, the menu, the overlay, SEO tags, and the project
  rules (no raw colours, thin routes, small components, one-way imports).
- **build:static:** builds the site and renders every page to plain HTML in `dist/`.
- **verify:static:** checks `dist/`: every referenced file exists, every in-page link lands, no render-blocking
  external requests, canonical/sharing tags, one `<h1>`, sitemap lists every page, size budget.

## How the live site works

The live site is **https://soemon007.github.io**, served by GitHub Pages from the
[`Soemon007/Soemon007.github.io`](https://github.com/Soemon007/Soemon007.github.io) repo. That repo holds only the
**built output** (the contents of `dist/`). This repo is the source.

To publish by hand: `bun run check`, then copy the contents of `dist/` into the Pages repo and push `main`.
Never edit files in the Pages repo directly; the next publish overwrites them.

### Turning on auto-deploy (optional)

`deploy/deploy-pages.yml` is a GitHub Actions workflow that runs `bun run check` on every push to `main`
(including Lovable's) and, if everything passes, publishes the result and confirms it is live. A change that
fails the checks is never published. It is not active until you:

1. Create a deploy key and store it as a secret:

   ```sh
   ssh-keygen -t ed25519 -N "" -C "rehan-portfolio deploy" -f deploy_key
   gh repo deploy-key add deploy_key.pub --repo Soemon007/Soemon007.github.io --allow-write --title "rehan-portfolio deploy"
   gh secret set PAGES_DEPLOY_KEY --repo Soemon007/rehan-portfolio < deploy_key
   rm deploy_key deploy_key.pub
   ```

2. Put the workflow where GitHub looks for it: on github.com choose **Add file → Create new file**, name it
   `.github/workflows/deploy-pages.yml`, and paste in the contents of `deploy/deploy-pages.yml`.

### If the site looks stale

GitHub Pages occasionally leaves a deployment queued. In the Pages repo's **Actions** tab, cancel the stuck
"pages build and deployment" run and re-run it. Browsers may also cache the page for up to 10 minutes.
