import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/HomePage";
import { homeHead } from "@/lib/seo";

// This file only wires the "/" URL to the page. The page lives in components/HomePage.tsx,
// its content in src/data, and its <head> tags in lib/seo.ts.
export const Route = createFileRoute("/")({
  head: homeHead,
  component: HomePage,
});
