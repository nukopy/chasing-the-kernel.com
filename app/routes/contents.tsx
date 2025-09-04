import { Link, useNavigate } from "react-router";
import { getContentsByLanguage } from "../lib/content";
import type { Route } from "./+types/contents";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Contents - Chasing the Kernel" },
    {
      name: "description",
      content:
        "All articles about kernel development and low-level programming",
    },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  console.info("[Contents: loader] try");

  const url = new URL(request.url);
  const language = url.pathname.startsWith("/en") ? "en" : "ja";
  const contents = getContentsByLanguage(language);
  return { contents, language };
}

export default function Contents({ loaderData }: Route.ComponentProps) {
  const { contents, language } = loaderData;
  const navigate = useNavigate();

  const getContentUrl = (slug: string) => {
    return language === "en" ? `/en/contents/${slug}` : `/contents/${slug}`;
  };

  const getTagUrl = (tag: string) => {
    return language === "en"
      ? `/en/tags/${encodeURIComponent(tag)}`
      : `/tags/${encodeURIComponent(tag)}`;
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Contents</h1>
      <div className="grid gap-6">
        {contents.map((content) => (
          <button
            type="button"
            key={content._meta.path}
            className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300"
            onClick={() => {
              navigate(
                getContentUrl(content._meta.path.split("/").pop() || ""),
              );
            }}
          >
            <div className="card-body">
              <Link
                to={getContentUrl(content._meta.path.split("/").pop() || "")}
                className="card-title link link-hover text-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {content.title}
              </Link>
              <p className="text-base-content/70">{content.summary}</p>
              <div className="card-actions justify-start mt-4">
                {content.tags?.map((tag) => (
                  <Link
                    key={tag}
                    to={getTagUrl(tag)}
                    className="badge badge-outline badge-primary hover:badge-primary z-10 relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
