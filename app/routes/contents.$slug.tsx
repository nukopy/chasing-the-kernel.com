"use client";

import { MDXContent } from "@content-collections/mdx/react";
import type { allContents } from "content-collections";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { getContentBySlugAndLanguage } from "../lib/content";

type ClientOnlyProps = {
  children: React.ReactNode;
};

export function ClientOnly({ children }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  // SSR と初回 CSR で同じ要素（null）がレンダリングされるため、hydration 不一致 error が発生しない
  useEffect(() => {
    setMounted(true);
  }, []);

  // 初回描画は opacity-0、次のフレームで opacity-100 → フェードイン
  useEffect(() => {
    if (!mounted) return;
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className={[
        "transition-opacity duration-1000", // フェード
        "motion-reduce:transition-none", // アクセシビリティ
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
      {/* コンテンツ */}
      {body}

      {/* 戻るリンク */}
      <div className="divider"></div>
      <div className="flex justify-between items-center">
        <a href={getContentsUrl()} className="btn btn-outline btn-primary">
          ← 投稿一覧に戻る
        </a>
      </div>
    </ClientOnly>
  );
};

export default function PostDetail() {
  const { slug } = useParams();
  const location = useLocation();

  // Detect language from current URL path
  const language = location.pathname.startsWith("/en") ? "en" : "ja";

  const content = getContentBySlugAndLanguage(slug ?? "", language);
  if (!content) {
    return <div>Content not found</div>;
  }

  const getHomeUrl = () => (language === "en" ? "/en" : "/");
  const getContentsUrl = () =>
    language === "en" ? "/en/contents" : "/contents";
  const getTagUrl = (tag: string) =>
    language === "en"
      ? `/en/tags/${encodeURIComponent(tag)}`
      : `/tags/${encodeURIComponent(tag)}`;

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li>
            <a href={getHomeUrl()} className="link link-hover">
              Home
            </a>
          </li>
          <li>
            <a href={getContentsUrl()} className="link link-hover">
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
              href={getTagUrl(tag)}
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
        {/* <Content isClient={isClient} content={content} /> */}
        <Content content={content} />
      </div>
    </article>
  );
}
