import { getCollection, type CollectionEntry } from "astro:content";

export type ContentKind = "Blog" | "Wiki";

export interface SiteEntry {
	title: string;
	date: Date;
	href: string;
	kind: ContentKind;
	tags: string[];
}

const kindOrder: Record<ContentKind, number> = {
	Blog: 0,
	Wiki: 1,
};

export const getPublishedBlogPosts = () =>
	getCollection("blog", ({ data }) => data.status === "published");

export const getPublishedWikiEntries = () =>
	getCollection("wiki", ({ data }) => data.status === "published");

const toBlogSiteEntry = (post: CollectionEntry<"blog">): SiteEntry => ({
	title: post.data.title,
	date: post.data.date,
	href: `/blog/${post.id}/`,
	kind: "Blog",
	tags: post.data.tags,
});

const toWikiSiteEntry = (entry: CollectionEntry<"wiki">): SiteEntry => ({
	title: entry.data.title,
	date: entry.data.date,
	href: `/wiki/${entry.id}/`,
	kind: "Wiki",
	tags: entry.data.tags,
});

export const sortSiteEntries = (entries: SiteEntry[]) =>
	entries.sort(
		(a, b) =>
			b.date.valueOf() - a.date.valueOf() || kindOrder[a.kind] - kindOrder[b.kind],
	);

export async function getPublishedBlogSiteEntries(): Promise<SiteEntry[]> {
	return sortSiteEntries((await getPublishedBlogPosts()).map(toBlogSiteEntry));
}

export async function getPublishedWikiSiteEntries(): Promise<SiteEntry[]> {
	return sortSiteEntries((await getPublishedWikiEntries()).map(toWikiSiteEntry));
}

export async function getPublishedSiteEntries(): Promise<SiteEntry[]> {
	const [blogEntries, wikiEntries] = await Promise.all([
		getPublishedBlogSiteEntries(),
		getPublishedWikiSiteEntries(),
	]);

	return sortSiteEntries([...blogEntries, ...wikiEntries]);
}

export const slugifyTag = (tag: string) =>
	tag
		.normalize("NFKC")
		.trim()
		.toLocaleLowerCase("en-US")
		.replace(/\s+/g, "-")
		.replace(/\//g, "-")
		.replace(/[?#%]/g, "");
