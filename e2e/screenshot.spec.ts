import { expect, test } from "@playwright/test";
import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const screenshotRoot = fileURLToPath(
	new URL("./.playwright/test-results/screenshots", import.meta.url),
);

const pages = [
	{ name: "home", path: "/", screenshotName: "home" },
	{
		name: "blog-test-markdown",
		path: "/blog/test-markdown/",
		screenshotName: "blog_test-markdown",
	},
	{
		name: "wiki-test-wiki",
		path: "/wiki/test-wiki/",
		screenshotName: "wiki_test-wiki",
	},
] as const;

// ref: https://github.com/magurotuna/maguro.dev/blob/49acb61d1a9ca7ce3465d3102d59067c082aecb0/e2e/visual.spec.ts
const viewports = [
	{ name: "desktop", width: 1280, height: 800 },
	{ name: "tablet", width: 768, height: 1024 },
	{ name: "mobile", width: 375, height: 667 },
	{ name: "mobile-small", width: 320, height: 568 },
] as const;

function formatTimestamp(date: Date) {
	const parts = new Intl.DateTimeFormat("sv-SE", {
		timeZone: "Asia/Tokyo",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hourCycle: "h23",
	}).formatToParts(date);
	const value = (type: Intl.DateTimeFormatPartTypes) =>
		parts.find((part) => part.type === type)?.value ?? "";

	return `${value("year")}${value("month")}${value("day")}_${value("hour")}${value("minute")}${value("second")}`;
}

async function nextScreenshotPath(viewportName: string, screenshotName: string) {
	const directory = path.join(screenshotRoot, viewportName);
	await mkdir(directory, { recursive: true });

	while (true) {
		const candidate = path.join(
			directory,
			`${screenshotName}-${formatTimestamp(new Date())}.png`,
		);

		try {
			await access(candidate);
			await new Promise((resolve) => setTimeout(resolve, 1_000));
		} catch {
			return candidate;
		}
	}
}

for (const target of pages) {
	for (const viewport of viewports) {
		test(`screenshot: ${target.name} @ ${viewport.name}`, async ({ page }) => {
			await page.setViewportSize({
				width: viewport.width,
				height: viewport.height,
			});

			const response = await page.goto(target.path, { waitUntil: "networkidle" });
			expect(response?.ok()).toBe(true);

			await page.evaluate(() => document.fonts.ready);
			await page.waitForFunction(
				() => !document.querySelector('pre[data-mermaid-status="pending"]'),
			);
			await page.addStyleTag({
				content: "astro-dev-toolbar { display: none !important; }",
			});
			await page.waitForTimeout(300);

			await page.screenshot({
				path: await nextScreenshotPath(viewport.name, target.screenshotName),
				fullPage: true,
				animations: "disabled",
			});
		});
	}
}
