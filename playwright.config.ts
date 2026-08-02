import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./e2e",
	testMatch: "screenshot.spec.ts",
	fullyParallel: true,
	workers: 12,
	reporter: "list",
	outputDir: "e2e/.playwright/test-results/playwright",
	use: {
		baseURL: "http://127.0.0.1:4322",
		browserName: "chromium",
		colorScheme: "light",
		screenshot: "off",
		trace: "off",
	},
	webServer: {
		command: "pnpm exec astro dev --host 127.0.0.1 --port 4322",
		env: { ASTRO_DEV_BACKGROUND: "0" },
		url: "http://127.0.0.1:4322",
		reuseExistingServer: false,
		timeout: 120_000,
	},
});
