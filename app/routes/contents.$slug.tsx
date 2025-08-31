import { allContents } from "content-collections";
import { data } from "react-router";
import type { Route } from "./+types/contents.$slug";

export function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;

  // slug に基づいて該当する投稿を検索
  const content = allContents.find((p) => p._meta.path === slug);

  if (!content) {
    throw data("Post not found", { status: 404 });
  }

  return { content };
}

export default function PostDetail({ loaderData }: Route.ComponentProps) {
  const { content } = loaderData;

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{content.title}</h1>

      {/* タグ表示 */}
      {content.tags && content.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {content.tags.map((tag) => (
            <a
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1 text-sm transition-colors"
            >
              #{tag}
            </a>
          ))}
        </div>
      )}

      {/* サマリー */}
      <p className="text-lg text-gray-600 mb-8">{content.summary}</p>

      {/* コンテンツ */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />

      {/* 戻るリンク */}
      <div className="mt-8 pt-8 border-t">
        <a
          href="/contents"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          ← 投稿一覧に戻る
        </a>
      </div>
    </article>
  );
}
