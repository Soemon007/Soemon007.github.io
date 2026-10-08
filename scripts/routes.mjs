// Finds the pages of the site by reading the router's generated route tree (src/routeTree.gen.ts).
// Shared by export-static.mjs (renders them) and verify-static.mjs (checks them).
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * URL paths of every page that can be built ahead of time, e.g. ["/", "/about"].
 * Pages with a parameter (like /posts/$id) depend on data at visit time, so they are returned
 * separately and cannot be part of a static site.
 */
export function discoverRoutes(root) {
  const tree = readFileSync(resolve(root, "src/routeTree.gen.ts"), "utf8");
  const declared = tree.match(/fullPaths:\s*([^\n]+)/)?.[1] ?? "";
  const paths = [...declared.matchAll(/'([^']+)'/g)].map((m) => m[1]);
  return {
    static: paths.filter((p) => !p.includes("$")),
    dynamic: paths.filter((p) => p.includes("$")),
  };
}

/** Where a page's HTML lives in the built site: "/" -> index.html, "/about" -> about/index.html. */
export function outputFile(path) {
  return path === "/" ? "index.html" : `${path.replace(/^\/|\/$/g, "")}/index.html`;
}
