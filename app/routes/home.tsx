import { useLocation } from "react-router";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Chasing the Kernel" },
    { name: "description", content: "I'm chasing the kernel." },
  ];
}

export default function Home() {
  const location = useLocation();
  const language = location.pathname.startsWith("/en") ? "en" : "ja";

  const getContentsUrl = () =>
    language === "en" ? "/en/contents" : "/contents";
  const getTagsUrl = () => (language === "en" ? "/en/tags" : "/tags");

  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="flex gap-4 justify-center">
            <a href={getContentsUrl()} className="btn btn-primary">
              Contents
            </a>
            <a href={getTagsUrl()} className="btn btn-secondary">
              Tags
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
