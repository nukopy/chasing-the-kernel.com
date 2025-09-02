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

export function loader(_: Route.LoaderArgs) {
  const contents = getContentsByLanguage("ja");
  return { contents };
}

export default function Contents({ loaderData }: Route.ComponentProps) {
  const { contents } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Contents</h1>
      <div className="grid gap-6">
        {contents.map((content) => (
          <div key={content._meta.path} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <a
                href={`/contents/${content._meta.path.split("/")[1]}`}
                className="card-title link link-hover text-2xl"
              >
                {content.title}
              </a>
              <p className="text-base-content/70">{content.summary}</p>
              <div className="card-actions justify-start mt-4">
                {content.tags?.map((tag) => (
                  <a
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="badge badge-outline badge-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
