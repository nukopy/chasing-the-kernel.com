const SOURCE_SELECTOR = [
	'.prose pre[data-language="mermaid"] > code',
	".prose pre > code.language-mermaid",
].join(",");

type Mermaid = (typeof import("mermaid"))["default"];

let initialized = false;
let nextDiagramId = 0;
let renderQueue = Promise.resolve();
let mermaidPromise: Promise<Mermaid> | undefined;

function loadMermaid() {
	mermaidPromise ??= import("mermaid").then(({ default: mermaid }) => mermaid);
	return mermaidPromise;
}

function initializeMermaid(mermaid: Mermaid) {
	if (initialized) return;

	mermaid.initialize({
		startOnLoad: false,
		securityLevel: "strict",
		theme: "default",
		suppressErrorRendering: true,
	});
	initialized = true;
}

async function renderDiagram(code: HTMLElement) {
	const pre = code.parentElement;
	if (!pre || pre.dataset.mermaidStatus !== "pending") return;

	try {
		const mermaid = await loadMermaid();
		initializeMermaid(mermaid);
		const id = `mermaid-diagram-${nextDiagramId++}`;
		const { svg, bindFunctions } = await mermaid.render(id, code.textContent ?? "");
		const diagram = document.createElement("div");
		diagram.className = "mermaid-diagram";
		diagram.setAttribute("role", "img");
		diagram.setAttribute("aria-label", "Mermaid diagram");
		diagram.innerHTML = svg;

		pre.replaceWith(diagram);
		bindFunctions?.(diagram);
	} catch (error) {
		pre.dataset.mermaidStatus = "error";
		pre.setAttribute("aria-label", "Mermaid diagram source (rendering failed)");
		console.error("Failed to render Mermaid diagram; showing its source instead.", error);
	}
}

export function renderMermaidDiagrams() {
	for (const code of document.querySelectorAll<HTMLElement>(SOURCE_SELECTOR)) {
		const pre = code.parentElement;
		if (!pre || pre.dataset.mermaidStatus) continue;

		pre.classList.add("mermaid-source");
		pre.dataset.mermaidStatus = "pending";
		renderQueue = renderQueue.then(() => renderDiagram(code));
	}
}
