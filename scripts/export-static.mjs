// Turns the production build into a plain static site that GitHub Pages can serve.
//
// `bun run build` produces a server bundle (.output/server) plus hashed assets
// (.output/public). GitHub Pages cannot run the server, so this script renders each page through
// that bundle once and writes the resulting HTML next to the assets. The result lands in `dist/`.
//
//   bun run build:static
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const serverEntry = resolve(root, ".output/server/index.mjs");
const publicDir = resolve(root, ".output/public");
const outDir = resolve(root, "dist");

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

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
await cp(publicDir, outDir, { recursive: true });
// Cloudflare-only header rules emitted by the build; GitHub Pages ignores them.
await rm(resolve(outDir, "_headers"), { force: true });

await writeFile(resolve(outDir, "index.html"), await render("/", 200));
// GitHub Pages serves 404.html for any unknown URL. Render a path no route can match.
await writeFile(resolve(outDir, "404.html"), await render("/__not-found__", 404));
// Stops GitHub Pages from running Jekyll over the output.
await writeFile(resolve(outDir, ".nojekyll"), "");

console.log(`Static site written to ${outDir}`);
process.exit(0);
