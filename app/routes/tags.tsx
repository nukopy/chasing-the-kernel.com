import { allContents } from "content-collections";
import type { Route } from "./+types/tags";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Tags - Chasing the Kernel" },
    { name: "description", content: "Browse articles by tags" },
  ];
}

export function loader(_: Route.LoaderArgs) {
  // 全ての投稿からタグを収集
  const tagCounts = new Map<string, number>();

  allContents.forEach((post) => {
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

  return { tags: sortedTags };
}

export default function Tags({ loaderData }: Route.ComponentProps) {
  const { tags } = loaderData;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Tags</h1>

      {tags.length === 0 ? (
        <p className="text-black">タグが見つかりませんでした。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tags.map(({ tag, count }) => (
            <a
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="block p-4 border rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-black">#{tag}</span>
                <span className="text-sm text-black bg-gray-200 px-2 py-1 rounded-full">
                  {count} 投稿
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* 戻るリンク */}
      <div className="mt-8 pt-8 border-t">
        <a
          href="/contents"
          className="text-black hover:text-gray-700 underline"
        >
          ← 投稿一覧に戻る
        </a>
      </div>
    </div>
  );
}
