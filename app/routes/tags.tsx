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
    <div>
      <h1>Tags</h1>

      {tags.length === 0 ? (
        <p>タグが見つかりませんでした。</p>
      ) : (
        <div>
          {tags.map(({ tag, count }) => (
            <a key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
              <div>
                <span>#{tag}</span>
                <span>{count} 投稿</span>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* 戻るリンク */}
      <div>
        <a href="/contents">← 投稿一覧に戻る</a>
      </div>
    </div>
  );
}
