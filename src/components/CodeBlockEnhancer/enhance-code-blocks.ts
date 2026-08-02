import { applyLanguageBadge } from "./apply-language-badge";
import { bindCopyButton } from "./copy-code-to-clipboard";

const ENHANCED_CLASS = "code-block--enhanced";
const TEMPLATE_SELECTOR = "[data-code-block-template]";
const EXCLUDED_CODE_SELECTOR = [
	".language-mermaid",
	".math",
	".math-inline",
	".math-display",
	".katex",
	"[data-math]",
].join(",");
const EXCLUDED_CONTAINER_SELECTOR = [
	".mermaid",
	".math",
	".math-inline",
	".math-display",
	".katex",
	".katex-display",
	"[data-math]",
].join(",");

type CodeBlockChrome = {
	langBadge: HTMLElement;
	frame: HTMLElement;
	button: HTMLButtonElement;
	feedback: HTMLElement;
	controls: HTMLElement;
};

function isEnhanceable(pre: HTMLPreElement, code: HTMLElement) {
	return !(
		code.matches(EXCLUDED_CODE_SELECTOR) ||
		pre.matches(EXCLUDED_CONTAINER_SELECTOR) ||
		pre.closest(EXCLUDED_CONTAINER_SELECTOR)
	);
}

function parseChrome(fragment: DocumentFragment): CodeBlockChrome | null {
	const langBadge = fragment.querySelector<HTMLElement>(".code-block-lang");
	const frame = fragment.querySelector<HTMLElement>(".code-block-frame");
	const button = fragment.querySelector<HTMLButtonElement>(".code-block-copy__button");
	const feedback = fragment.querySelector<HTMLElement>(".code-block-copy__feedback");
	const controls = fragment.querySelector<HTMLElement>(".code-block-copy");
	if (!langBadge || !frame || !button || !feedback || !controls) return null;
	return { langBadge, frame, button, feedback, controls };
}

function enhanceCodeBlock(pre: HTMLPreElement, template: HTMLTemplateElement) {
	const code = pre.querySelector<HTMLElement>(":scope > code");
	if (!code || pre.parentElement?.classList.contains(ENHANCED_CLASS) || !isEnhanceable(pre, code)) {
		return;
	}
	if (!pre.parentNode) return;

	const fragment = template.content.cloneNode(true) as DocumentFragment;
	const chrome = parseChrome(fragment);
	if (!chrome) return;

	applyLanguageBadge(chrome.langBadge, pre.dataset.language?.trim());

	const wrapper = document.createElement("div");
	wrapper.className = ENHANCED_CLASS;
	pre.parentNode.insertBefore(wrapper, pre);
	wrapper.appendChild(fragment);
	chrome.frame.insertBefore(pre, chrome.frame.firstChild);

	bindCopyButton(code, chrome);
}

export function enhanceCodeBlocks() {
	const template = document.querySelector<HTMLTemplateElement>(TEMPLATE_SELECTOR);
	if (!template) return;

	document.querySelectorAll<HTMLPreElement>(".prose pre").forEach((pre) => {
		enhanceCodeBlock(pre, template);
	});
}
