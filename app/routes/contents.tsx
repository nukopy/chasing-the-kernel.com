import { allContents } from "content-collections";
import type { Route } from "./+types/contents";

export function loader(_: Route.LoaderArgs) {
  return { contents: allContents };
}

export default function Contents({ loaderData }: Route.ComponentProps) {
  const { contents } = loaderData;

  return (
    <>
      <h1 className="text-4xl font-bold">Contents</h1>
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
                    className="rounded-full bg-gray-200 hover:bg-gray-300 px-2 py-1 text-sm transition-colors"
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
    </>
  );
}
