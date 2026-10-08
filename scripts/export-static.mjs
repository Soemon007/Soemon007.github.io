// Turns the production build into a plain static site that GitHub Pages can serve.
//
// `bun run build` produces a server bundle (.output/server) plus hashed assets
// (.output/public). GitHub Pages cannot run the server, so this script renders each page through
// that bundle once and writes the resulting HTML next to the assets. The result lands in `docs/`,
// the folder GitHub Pages publishes (Settings > Pages > main /docs).
//
//   bun run build:static
import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { discoverRoutes, outputFile } from "./routes.mjs";

const root = resolve(import.meta.dirname, "..");
const serverEntry = resolve(root, ".output/server/index.mjs");
const publicDir = resolve(root, ".output/public");
const outDir = resolve(root, "docs");

if (!existsSync(serverEntry)) {
  console.error("No build found. Run `bun run build` first (or use `bun run build:static`).");
  process.exit(1);
}

const { default: server } = await import(pathToFileURL(serverEntry).href);

async function render(path, expectedStatus) {
  const response = await server.fetch(
    new Request(`http://localhost${path}`),
    {},
    { waitUntil() {} },
  );
  const html = await response.text();
  if (response.status !== expectedStatus || !html.startsWith("<!DOCTYPE html>")) {
    throw new Error(`Rendering ${path} returned ${response.status}, expected ${expectedStatus}.`);
  }
  return html;
}

async function write(file, contents) {
  const target = resolve(outDir, file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents);
}

// docs/ is generated output and is replaced on every build. Refuse to wipe a folder that does not look
// like one, so hand-written files are never deleted by mistake.
if (
  existsSync(outDir) &&
  (await readdir(outDir)).length > 0 &&
  !existsSync(resolve(outDir, ".nojekyll"))
) {
  console.error(
    "docs/ exists but is not a previous build (no .nojekyll). Move your files elsewhere first.",
  );
  process.exit(1);
}
await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
await cp(publicDir, outDir, { recursive: true });
// Cloudflare-only header rules emitted by the build; GitHub Pages ignores them.
await rm(resolve(outDir, "_headers"), { force: true });

// Every page in the route tree, so a page added later is published without touching this script.
const routes = discoverRoutes(root);
for (const path of routes.static) await write(outputFile(path), await render(path, 200));
for (const path of routes.dynamic) {
  console.warn(`Skipped ${path}: pages with a parameter cannot be built ahead of time.`);
}
// GitHub Pages serves 404.html for any unknown URL. Render a path no route can match.
await write("404.html", await render("/__not-found__", 404));
// Stops GitHub Pages from running Jekyll over the output.
await write(".nojekyll", "");

console.log(
  `Static site written to ${outDir} (${routes.static.length} page(s): ${routes.static.join(", ")})`,
);
process.exit(0);
