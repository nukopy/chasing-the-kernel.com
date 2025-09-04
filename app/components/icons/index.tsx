import { BookOpenIcon, User } from "lucide-react";
import type { JSX } from "react";
import GitHubIconSvg from "./GitHubIconSvg";
import LinkedInIconPng from "./LinkedInIconPng";
import NukopyIconPng from "./NukopyIconPng";
import XIconSvg from "./XIconSvg";
import ZennIconSvg from "./ZennIconSvg";

export type IconType = "github" | "x" | "zenn" | "linkedin" | "blog" | "nukopy";

export function getIconByType(
  iconType: IconType,
  className?: string,
): JSX.Element {
  switch (iconType) {
    case "github":
      return <GitHubIconSvg className={className} />;
    case "x":
      return <XIconSvg className={className} />;
    case "zenn":
      return <ZennIconSvg className={className} />;
    case "linkedin":
      return <LinkedInIconPng className={className} />;
    case "blog":
      return <BookOpenIcon className={className} />;
    case "nukopy":
      return <NukopyIconPng className={className} />;
    default:
      return <User className={className} />;
  }
}
