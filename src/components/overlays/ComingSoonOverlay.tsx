import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { copy } from "@/data";
import { COMING_SOON_HASH } from "@/lib/links";

/**
 * Full-screen "haven't added that yet" message. It opens whenever the address becomes
 * `#soon`, which is where every link without a URL points (see `linkProps` in lib/links.ts).
 */
export function ComingSoonOverlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setOpen(window.location.hash === COMING_SOON_HASH);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  if (!open) return null;

  const close = () => {
    history.replaceState(null, "", window.location.pathname);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-background px-5 text-center"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="orb left-[15%] top-[15%] h-72 w-72 bg-peach" />
        <div className="orb right-[15%] top-[30%] h-80 w-80 bg-lavender [animation-delay:-6s]" />
        <div className="orb bottom-[10%] left-[40%] h-64 w-64 bg-mint [animation-delay:-12s]" />
      </div>
      <div className="relative">
        <h2 className="display text-[clamp(40px,8vw,88px)]">{copy.comingSoon.heading}</h2>
        <p className="mt-6 text-muted-foreground">{copy.comingSoon.text}</p>
        <button onClick={close} className="pill pill-primary mt-10">
          <ArrowLeft className="h-4 w-4" />
          {copy.comingSoon.back}
        </button>
      </div>
    </div>
  );
}
