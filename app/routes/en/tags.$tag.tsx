import { getContentsByLanguage } from "../../lib/content";
import { data } from "react-router";
import type { Route } from "../+types/tags.$tag";

export function loader({ params }: Route.LoaderArgs) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);

  const contents = getContentsByLanguage("en");
  const postsWithTag = contents.filter((post) =>
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

export default function EnglishTagDetail({ loaderData }: Route.ComponentProps) {
  const { tag, posts } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li>
            <a href="/en" className="link link-hover">
              Home
            </a>
          </li>
          <li>
            <a href="/en/tags" className="link link-hover">
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
            <p className="text-xl mt-2">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post._meta.path} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <a
                href={`/en/contents/${post._meta.path.split('/')[1]}`}
                className="card-title link link-hover text-2xl"
              >
                {post.title}
              </a>
              <p className="text-base-content/70">{post.summary}</p>

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

      <div className="divider"></div>
      <div className="flex gap-4 justify-center">
        <a href="/en/tags" className="btn btn-outline btn-primary">
          ← Back to Tags
        </a>
        <a href="/en/contents" className="btn btn-outline btn-secondary">
          View All Contents
        </a>
      </div>
    </div>
  );
}