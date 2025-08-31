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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">#{tag}</h1>
        <p className="text-black">{posts.length} 件の投稿</p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post._meta.path} className="border-b pb-6">
            <a href={`/contents/${post._meta.path}`} className="block group">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-gray-700 transition-colors">
                {post.title}
              </h2>
              <p className="text-black mb-3">{post.summary}</p>

              {/* タグ表示 */}
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((postTag) => (
                  <span
                    key={postTag}
                    className={`rounded-full px-2 py-1 text-sm ${
                      postTag === tag
                        ? "bg-gray-300 text-black font-medium"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    #{postTag}
                  </span>
                ))}
              </div>
            </a>
          </article>
        ))}
      </div>

      {/* ナビゲーションリンク */}
      <div className="mt-8 pt-8 border-t flex gap-4">
        <a href="/tags" className="text-black hover:text-gray-700 underline">
          ← タグ一覧に戻る
        </a>
        <a
          href="/contents"
          className="text-black hover:text-gray-700 underline"
        >
          投稿一覧を見る
        </a>
      </div>
    </div>
  );
}
