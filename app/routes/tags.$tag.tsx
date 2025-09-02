import { data } from "react-router";
import { getContentsByLanguage } from "../lib/content";
import type { Route } from "./+types/tags.$tag";

export function loader({ params, request }: Route.LoaderArgs) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);

  const url = new URL(request.url);
  const language = url.pathname.startsWith("/en") ? "en" : "ja";
  const contents = getContentsByLanguage(language);
  const postsWithTag = contents.filter((post) =>
    post.tags?.includes(decodedTag),
  );

  if (postsWithTag.length === 0) {
    throw data(`Tag "${decodedTag}" not found`, { status: 404 });
  }

  return {
    tag: decodedTag,
    posts: postsWithTag,
    language,
  };
}

export default function TagDetail({ loaderData }: Route.ComponentProps) {
  const { tag, posts, language } = loaderData;

  const getHomeUrl = () => (language === "en" ? "/en" : "/");
  const getTagsUrl = () => (language === "en" ? "/en/tags" : "/tags");
  const getContentsUrl = () =>
    language === "en" ? "/en/contents" : "/contents";
  const getContentUrl = (slug: string) =>
    language === "en" ? `/en/contents/${slug}` : `/contents/${slug}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li>
            <a href={getHomeUrl()} className="link link-hover">
              Home
            </a>
          </li>
          <li>
            <a href={getTagsUrl()} className="link link-hover">
              Tags
            </a>
          </li>
          <li>#{tag}</li>
        </ul>
      </div>

      <div className="hero bg-primary text-primary-content rounded-lg mb-8">
        <div className="hero-content text-center py-8">
          <div>
            <h1 className="text-5xl font-bold">#{tag}</h1>
            <p className="text-xl mt-2">{posts.length} 件の投稿</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post._meta.path} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <a
                href={getContentUrl(post._meta.path.split("/").pop() || "")}
                className="card-title link link-hover text-2xl"
              >
                {post.title}
              </a>
              <p className="text-base-content/70">{post.summary}</p>

              {/* タグ表示 */}
              <div className="card-actions justify-start mt-4">
                {post.tags?.map((postTag) => (
                  <span
                    key={postTag}
                    className={`badge ${postTag === tag ? "badge-primary" : "badge-outline"}`}
                  >
                    #{postTag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ナビゲーションリンク */}
      <div className="divider"></div>
      <div className="flex gap-4 justify-center">
        <a href={getTagsUrl()} className="btn btn-outline btn-primary">
          ← タグ一覧に戻る
        </a>
        <a href={getContentsUrl()} className="btn btn-outline btn-secondary">
          投稿一覧を見る
        </a>
      </div>
    </div>
  );
}
