# Design system

The visual rules of the site. Follow them and anything you add will look like it was always there.

## Character

A calm, editorial portfolio: white space, soft pastel gradients, a light serif for headlines, small monospace
labels, large rounded cards, and slow, subtle motion. Fine geometric line art adds a mathematical touch.
Nothing is loud: one dark button style, one outline style, no heavy shadows or saturated colours.

## Tokens (`src/styles/tokens.css`)

Every colour is defined once. Use the Tailwind name in components; never type a colour value.

| Token (Tailwind) | Used for |
| --- | --- |
| `background`, `card` | page and card surfaces (white) |
| `band` | tinted section bands and card gradient base |
| `foreground`, `primary` | text and the solid dark button |
| `muted-foreground` | secondary text, labels |
| `border` | hairlines |
| `peach` `lavender` `mint` `sky` `butter` | accent palette: gradients, orbs, timeline |
| `art-ink` | line colour of the geometric artwork |

To re-theme the whole site, change the values under `:root`. Components follow automatically.

## Typography

| Role | How | Where |
| --- | --- | --- |
| Body and headings | Libron (serif), self-hosted | `font-sans` (the default) |
| Large headlines | `display` utility (light weight, tight tracking) | `h1`, `h2`, big metrics |
| Small uppercase labels | `label-mono` utility (JetBrains Mono, 12px, wide tracking) | section labels, dates, card meta |
| Tags | mono 11px inside `TagList` | tech tags |

Headline sizes use `clamp()` so they scale smoothly: hero `clamp(40px,8vw,96px)`, section titles
`clamp(36px,5vw,64px)`. Body copy is `leading-relaxed` in `text-muted-foreground`.

## Layout and spacing

- **Width:** `Container` (max 1200px, 20px side padding, 32px from `md`). Every section's content goes inside one.
- **Vertical rhythm:** `Section` applies `py-20 md:py-28 lg:py-36`. Don't add your own section padding.
- **Section heading:** `SectionHead` (label + title) with a fixed gap below it.
- **Bands:** `Section cut="forward"` or `cut="reverse"` makes a tinted band with angled edges. Alternate
  them between neighbouring sections. Sections without `cut` sit on the white page.
- **Cards:** radius is `var(--radius-card)` (28px), 1px `border`, `bg-card`. Gaps: `gap-8` between large
  cards, `gap-5` in the small-card grid.
- **Breakpoints:** mobile first. `sm` 640, `md` 768, `lg` 1024. Wide-screen staggering lives in
  `styles/sections.css` and only starts at `lg`.
- **Per-section arrangements** (staggered cards, pinned timeline heading) are CSS classes on the section
  (`work-layout`, `more-layout`, `experience-columns`). Keep new arrangements in `sections.css`.

## Building blocks

| Component | Use it for |
| --- | --- |
| `Section` | every full-width section: spacing, id, optional angled band |
| `Container` | centred content width |
| `SectionHead` | the label and title at the top of a section |
| `PillLink` | **every** button-link. `variant` primary (solid) or secondary (outline); `size` md or sm; optional `icon` |
| `TagList` | rows of small tags |
| `ProjectLinks` | the GitHub and Kaggle buttons on a project card |
| `FeaturedProjectCard` | large two-column project card (artwork + details + metrics) |
| `ProjectCard` | compact project card |
| `GeometryArt` | decorative line art: `orbit`, `fold`, `wave`. Placed with the `.geometry-*` classes in `decor.css` |
| `ComingSoonOverlay` | the "haven't added that yet" screen, opened by any link whose URL is empty |

Need something new? Build it from these and the utility classes first. If it will be used more than once, make it a
component in `components/common/` rather than copying class lists.

## Utility classes (`src/styles/utilities.css`)

`display`, `label-mono`, `pill` / `pill-primary` / `pill-secondary`, `grad-peach|sky|lavender|mint|butter`,
`lift` (hover raise), `flow-panel` (gradient shifts on hover), `link-flow` (underline slide), `tag-flow`.

## Motion

- **Quick and crisp, never bouncy.** One easing token, `--ease-snap` (fast start, soft landing), drives the
  entrances. Durations are 0.5 to 0.7s with small movements.
- **Scroll reveal:** add the `reveal` class to fade an element up as it arrives. Content above the fold is never
  hidden, and the page is readable without JavaScript.
- **Section transitions:** every tinted band (`<Section cut="...">`) sweeps in along its slanted edge as it scrolls
  into view, from the left for most bands and from the right for the reversed one, while its hairline fades in.
  This comes with `<Section cut>` automatically (the `reveal-band` class); there is nothing to add by hand. To
  change the feel, edit the duration or `--ease-snap` in `styles/motion.css` / `tokens.css`.
- **Scroll snapping:** when you stop scrolling with a mouse wheel or trackpad, the page glides (about 0.4 to 0.6s,
  fast start, soft landing) to the next or previous section. A short section hands over as soon as you scroll; a
  section taller than the screen, like the project cards, scrolls freely and only hands over near its edge. Only
  mouse and trackpad scrolling on desktop is affected: keyboard, menu links, scrollbar dragging, touch screens
  and reduced motion are left alone, and any new input cancels a glide. The rules live in `lib/snap.ts`, the
  wiring in `hooks/useSnapScroll.ts`. To turn it off, remove `useSnapScroll()` from `components/HomePage.tsx`.
- Drifting colour orbs, rotating line art, hover lifts and the custom cursor are decorative only.
- **Reduced motion is mandatory.** Every animation has an override or is written inside
  `prefers-reduced-motion: no-preference` (see `motion.css`, `decor.css`). Add one for anything new. The finished
  design must look identical with and without motion.

## Accessibility baseline

- Exactly one `h1` (the hero headline); sections use `h2`, cards `h3`.
- Icon-only links need `aria-label`. Decorative graphics use `aria-hidden`.
- Real `<a>` and `<button>` elements, visible keyboard focus, a skip link, and a menu button that reports
  `aria-expanded`.
- Text colour contrast stays at or above WCAG AA; use `text-muted-foreground` for secondary text, never lighter.

## Performance rules

- Fonts are self-hosted in `public/fonts/`; the main font is preloaded. No third-party stylesheets or scripts.
- Keep first-load JavaScript and CSS under the budget in `scripts/verify-static.mjs`.
- Share image: `public/og.jpg`, 1200×630, under ~100 KB.

## Do and don't

| Do | Don't |
| --- | --- |
| Add a project by editing `src/data/projects.ts` | Paste project markup into a section |
| Use `PillLink` for buttons | Hand-write `<a className="pill ...">` |
| Use `bg-peach`, `text-muted-foreground` | Write `#fde8d8` or `rgb(...)` in a component |
| Put a new look in `utilities.css` | Repeat a 12-class string in three places |
| Alternate `cut="forward"` / `cut="reverse"` | Make two neighbouring bands slope the same way |
| Leave an unfinished link empty (`""`) | Use `href="#"` or point to a made-up URL |
