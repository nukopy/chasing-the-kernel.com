import { getContentsByLanguage } from "../lib/content";
import type { Route } from "./+types/tags";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Tags - Chasing the Kernel" },
    { name: "description", content: "Browse articles by tags" },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const language = url.pathname.startsWith("/en") ? "en" : "ja";
  const contents = getContentsByLanguage(language);
  const tagCounts = new Map<string, number>();

  contents.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    }
  });

  // タグを投稿数でソート（多い順）
  const sortedTags = Array.from(tagCounts.entries())
    .sort(([, a], [, b]) => b - a)
    .map(([tag, count]) => ({ tag, count }));

  return { tags: sortedTags, language };
}

export default function Tags({ loaderData }: Route.ComponentProps) {
  const { tags, language } = loaderData;
  
  const getTagUrl = (tag: string) => 
    language === "en" ? `/en/tags/${encodeURIComponent(tag)}` : `/tags/${encodeURIComponent(tag)}`;
  const getContentsUrl = () => language === "en" ? "/en/contents" : "/contents";

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* ヘッダー */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-base-content mb-2">Tags</h1>
        <p className="text-base-content/70">記事をタグで探す</p>
      </div>

      {tags.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏷️</div>
          <p className="text-lg text-base-content/70">
            タグが見つかりませんでした。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {tags.map(({ tag, count }) => (
            <a
              key={tag}
              href={getTagUrl(tag)}
              className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-base-300"
            >
              <div className="card-body p-4">
                <div className="flex items-center justify-between">
                  <div className="badge badge-primary badge-lg font-medium">
                    #{tag}
                  </div>
                  <div className="text-sm text-base-content/60">
                    {count} 投稿
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-base-content/50">
                    該当記事一覧を見る
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* 戻るリンク */}
      <div className="flex justify-center">
        <a href={getContentsUrl()} className="btn btn-outline btn-wide gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <title>Arrow left</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          投稿一覧に戻る
        </a>
      </div>
    </div>
  );
}
