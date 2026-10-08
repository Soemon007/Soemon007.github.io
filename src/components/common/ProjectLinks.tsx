import { BarChart3, Github } from "lucide-react";
import { PillLink } from "@/components/common/PillLink";
import type { LinkUrl } from "@/data";
import { cn } from "@/lib/utils";
import { linkProps } from "@/lib/links";

type ProjectLinksProps = {
  github?: LinkUrl;
  kaggle?: LinkUrl;
  kaggleLabel?: string;
  /** Hide the GitHub button when the project has no GitHub link (instead of showing "coming soon"). */
  hideGithubWhenMissing?: boolean;
  size?: "md" | "sm";
  className?: string;
};

/**
 * The GitHub and Kaggle buttons at the bottom of a project card.
 * A button without a URL still appears and opens the "haven't added that yet" overlay.
 */
export function ProjectLinks({
  github,
  kaggle,
  kaggleLabel = "View on Kaggle",
  hideGithubWhenMissing = false,
  size = "md",
  className,
}: ProjectLinksProps) {
  const showGithub = Boolean(github) || !hideGithubWhenMissing;

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {showGithub && (
        <PillLink size={size} icon={<Github className="h-4 w-4" />} {...linkProps(github)}>
          View on GitHub
        </PillLink>
      )}
      <PillLink size={size} icon={<BarChart3 className="h-4 w-4" />} {...linkProps(kaggle)}>
        {kaggleLabel}
      </PillLink>
    </div>
  );
}
