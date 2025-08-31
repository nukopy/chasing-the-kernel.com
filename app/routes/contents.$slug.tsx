import { MDXContent } from "@content-collections/mdx/react";
import { allContents } from "content-collections";
import { data } from "react-router";
import type { Route } from "./+types/contents.$slug";

export function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;

  // slug に基づいて該当する投稿を検索
  const content = allContents.find((p) => p._meta.path === slug);

  if (!content) {
    throw data("Content not found", { status: 404 });
  }

  return { content };
}

export default function PostDetail({ loaderData }: Route.ComponentProps) {
  const { content } = loaderData;
  console.log(content);

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <article className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{content.title}</h1>

      {/* タグ表示 */}
      {content.tags && content.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {content.tags.map((tag) => (
            <a
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="rounded-full bg-gray-200 text-black hover:bg-gray-300 px-3 py-1 text-sm transition-colors"
            >
              #{tag}
            </a>
          ))}
        </div>
      )}

      {/* サマリー */}
      <p className="text-lg text-black mb-8">{content.summary}</p>

      {/* コンテンツ */}
      {/* SSR ではない場合に MDXContent をレンダリング */}
      {content._meta.extension === "mdx" && <MDXContent code={content.mdx} />}
      {content._meta.extension === "md" && (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: We can ignore this because `content.html` is safe content created by us
        <div dangerouslySetInnerHTML={{ __html: content.html }} />
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
    </article>
  );
}
