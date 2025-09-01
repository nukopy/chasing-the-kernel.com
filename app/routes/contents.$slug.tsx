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
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li>
            <a href="/" className="link link-hover">
              Home
            </a>
          </li>
          <li>
            <a href="/contents" className="link link-hover">
              Contents
            </a>
          </li>
          <li>{content.title}</li>
        </ul>
      </div>

      <h1 className="text-4xl font-bold mb-6">{content.title}</h1>

      {/* タグ表示 */}
      {content.tags && content.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {content.tags.map((tag) => (
            <a
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="badge badge-primary badge-lg"
            >
              #{tag}
            </a>
          ))}
        </div>
      )}

      {/* サマリー */}
      <div className="alert alert-info mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
          role="img"
          aria-label="情報"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>{content.summary}</span>
      </div>

      {/* コンテンツ */}
      <div className="prose prose-lg max-w-none">
        {/* SSR ではない場合に MDXContent をレンダリング */}
        {content._meta.extension === "mdx" && <MDXContent code={content.mdx} />}
        {content._meta.extension === "md" && (
          // biome-ignore lint/security/noDangerouslySetInnerHtml: We can ignore this because `content.html` is safe content created by us
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        )}
      </div>

      {/* 戻るリンク */}
      <div className="divider"></div>
      <div className="flex justify-between items-center">
        <a href="/contents" className="btn btn-outline btn-primary">
          ← 投稿一覧に戻る
        </a>
      </div>
    </article>
  );
}
