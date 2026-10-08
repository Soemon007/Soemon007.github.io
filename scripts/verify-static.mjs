// Checks the built site in ./dist before it is published. Fails (exit code 1) with a list of
// problems if anything a visitor would hit is broken.
//
//   bun run verify:static      (run after `bun run build:static`)
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { discoverRoutes, outputFile } from "./routes.mjs";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const problems = [];
const check = (ok, message) => ok || problems.push(message);
const read = (file) => readFileSync(join(dist, file), "utf8");

if (!existsSync(join(dist, "index.html"))) {
  console.error("No build found in dist/. Run `bun run build:static` first.");
  process.exit(1);
}

const html = read("index.html");

// Every file the page points at must exist in the build.
const localRefs = new Set([...html.matchAll(/(?:href|src)="(\/[^"#?]+)"/g)].map((m) => m[1]));
for (const ref of localRefs) {
  check(existsSync(join(dist, ref)), `index.html references ${ref}, which is not in the build`);
}

// Fonts and images referenced from CSS must exist too.
for (const css of readdirSync(join(dist, "assets")).filter((f) => f.endsWith(".css"))) {
  const text = read(join("assets", css));
  for (const m of text.matchAll(/url\(["']?(\/[^"')?#]+)/g)) {
    check(
      existsSync(join(dist, m[1])),
      `assets/${css} references ${m[1]}, which is not in the build`,
    );
  }
}

// Every in-page link must land on an element (the "haven't added that yet" link is handled by script).
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
for (const m of html.matchAll(/href="#([^"]+)"/g)) {
  if (m[1] === "soon") continue;
  check(ids.has(m[1]), `a link points at #${m[1]}, but nothing on the page has that id`);
}

// Nothing may block the first paint by loading from another site.
for (const m of html.matchAll(/<link[^>]+rel="stylesheet"[^>]*>/g)) {
  check(!/href="https?:/.test(m[0]), `render-blocking external stylesheet: ${m[0]}`);
}
check(/rel="preload"[^>]+font/.test(html), "the main font is not preloaded");

// Search and sharing basics.
check((html.match(/<h1[\s>]/g) ?? []).length === 1, "the page must have exactly one <h1>");
check(/<title>[^<]{10,}<\/title>/.test(html), "missing or too-short <title>");
check(/name="description"/.test(html), "missing meta description");
check(/rel="canonical" href="https:\/\//.test(html), "missing canonical link");
check(
  /property="og:image" content="https:\/\//.test(html),
  "og:image must be an absolute https address",
);
const ld = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
check(Boolean(ld), "missing structured data");
try {
  if (ld) JSON.parse(ld[1].replaceAll("&quot;", '"'));
} catch {
  problems.push("structured data is not valid JSON");
}

// Every page in the route tree must be built and listed in the sitemap.
const sitemap = existsSync(join(dist, "sitemap.xml")) ? read("sitemap.xml") : "";
for (const path of discoverRoutes(root).static) {
  check(existsSync(join(dist, outputFile(path))), `page ${path} was not built`);
  const loc = new RegExp(
    `<loc>https://[^<]*${path === "/" ? "/" : path.replace(/\/$/, "") + "/?"}</loc>`,
  );
  check(loc.test(sitemap), `page ${path} is missing from public/sitemap.xml`);
}

// Files GitHub Pages and crawlers expect.
for (const file of ["404.html", ".nojekyll", "robots.txt", "sitemap.xml", "favicon.ico"]) {
  check(existsSync(join(dist, file)), `missing ${file}`);
}
check(!existsSync(join(dist, "_headers")), "_headers (Cloudflare only) should not be published");
check(read("404.html").includes("Page not found"), "404.html is not the not-found page");

// Keep the first load light.
const size = (file) => statSync(join(dist, file)).size;
const total = readdirSync(join(dist, "assets"))
  .filter((f) => /\.(js|css)$/.test(f))
  .reduce((sum, f) => sum + size(join("assets", f)), 0);
check(
  total < 700_000,
  `JavaScript and CSS total ${(total / 1024).toFixed(0)} KB, over the 700 KB budget`,
);

if (problems.length) {
  console.error(`\nStatic build check failed (${problems.length}):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(
  `Static build check passed (${localRefs.size} referenced files, ${ids.size} anchors, ${(total / 1024).toFixed(0)} KB JS+CSS).`,
);
