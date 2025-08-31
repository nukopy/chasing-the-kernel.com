import { allContents } from "content-collections";
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
  return { contents: allContents };
}

export default function Contents({ loaderData }: Route.ComponentProps) {
  const { contents } = loaderData;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Contents</h1>
      <ul>
        {contents.map((content) => (
          <li key={content._meta.path}>
            <a href={`/contents/${content._meta.path}`}>
              <h2 className="text-2xl font-bold">{content.title}</h2>
              <p>{content.summary}</p>
              {/* タグは丸で加工する */}
              <div className="flex flex-wrap gap-2">
                {content.tags?.map((tag) => (
                  <a
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="rounded-full bg-gray-200 hover:bg-gray-300 px-2 py-1 text-sm transition-colors text-black"
                    onClick={(e) => e.stopPropagation()}
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
