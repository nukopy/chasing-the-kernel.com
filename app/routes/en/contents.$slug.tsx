"use client";

import { MDXContent } from "@content-collections/mdx/react";
import type { allContents } from "content-collections";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getContentBySlugAndLanguage } from "../../lib/content";

type ClientOnlyProps = {
  children: React.ReactNode;
};

export function ClientOnly({ children }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className={[
        "transition-opacity duration-1000",
        "motion-reduce:transition-none",
        show ? "opacity-100" : "opacity-0",
      ].join(" ")}
      style={{ minHeight: "40vh" }}
    >
      {children}
    </div>
  );
}

type ContentProps = {
  content: (typeof allContents)[number];
};

const Content = ({ content }: ContentProps) => {
  const isContentMdx = content._meta.extension === "mdx";
  const body = isContentMdx ? (
    <MDXContent code={content.mdx} />
  ) : (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: We can ignore this because `content.html` is safe content created by us
    <div dangerouslySetInnerHTML={{ __html: content.html }} />
  );

  return (
    <ClientOnly>
      {body}

      <div className="divider"></div>
      <div className="flex justify-between items-center">
        <a href="/en/contents" className="btn btn-outline btn-primary">
          ← Back to Contents
        </a>
      </div>
    </ClientOnly>
  );
};

export default function EnglishPostDetail() {
  const { slug } = useParams();
  const content = getContentBySlugAndLanguage(slug!, "en");

  if (!content) {
    return <div>Content not found</div>;
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li>
            <a href="/en" className="link link-hover">
              Home
            </a>
          </li>
          <li>
            <a href="/en/contents" className="link link-hover">
              Contents
            </a>
          </li>
          <li>{content.title}</li>
        </ul>
      </div>

      <h1 className="text-4xl font-bold mb-6">{content.title}</h1>

      {content.tags && content.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {content.tags.map((tag) => (
            <a
              key={tag}
              href={`/en/tags/${encodeURIComponent(tag)}`}
              className="badge badge-primary badge-lg"
            >
              #{tag}
            </a>
          ))}
        </div>
      )}

      <div className="alert alert-info mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
          role="img"
          aria-label="Information"
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

      <div className="prose prose-lg max-w-none">
        <Content content={content} />
      </div>
    </article>
  );
}
