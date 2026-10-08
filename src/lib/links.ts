import type { LinkUrl } from "@/data/types";

/** In-page address that opens the "haven't added that yet" overlay. */
export const COMING_SOON_HASH = "#soon";

/** Attributes for links that leave the site: new tab, and no access to this page. */
export const externalLinkProps = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Attributes for a link whose URL may not exist yet. A real URL opens in a new tab;
 * an empty one points at the "haven't added that yet" overlay instead of a dead end.
 */
export function linkProps(url: LinkUrl) {
  return url ? { href: url, ...externalLinkProps } : { href: COMING_SOON_HASH };
}
