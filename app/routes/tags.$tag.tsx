import { allContents } from "content-collections";
import { data } from "react-router";
import type { Route } from "./+types/tags.$tag";

export function loader({ params }: Route.LoaderArgs) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);

  // 指定されたタグを持つ投稿を検索
  const postsWithTag = allContents.filter((post) =>
    post.tags?.includes(decodedTag),
  );

  if (postsWithTag.length === 0) {
    throw data(`Tag "${decodedTag}" not found`, { status: 404 });
  }

  return {
    tag: decodedTag,
    posts: postsWithTag,
  };
}

export default function TagDetail({ loaderData }: Route.ComponentProps) {
  const { tag, posts } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li>
            <a href="/" className="link link-hover">
              Home
            </a>
          </li>
          <li>
            <a href="/tags" className="link link-hover">
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
                href={`/contents/${post._meta.path}`}
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
        <a href="/tags" className="btn btn-outline btn-primary">
          ← タグ一覧に戻る
        </a>
        <a href="/contents" className="btn btn-outline btn-secondary">
          投稿一覧を見る
        </a>
      </div>
    </div>
  );
}
