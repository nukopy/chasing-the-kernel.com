const COPY_LABEL = "コードをクリップボードにコピー";
const COPIED_LABEL = "コードをコピーしました";
const FEEDBACK_COPIED = "Copied!";
const FEEDBACK_FAILED = "Copy failed";
const COPIED_RESET_MS = 3000;
const FEEDBACK_CLEAR_MS = 200;

type CopyControls = {
	button: HTMLButtonElement;
	feedback: HTMLElement;
	controls: HTMLElement;
};

function fallbackCopy(text: string) {
	const textarea = document.createElement("textarea");
	textarea.value = text;
	textarea.setAttribute("readonly", "");
	textarea.style.position = "fixed";
	textarea.style.opacity = "0";
	document.body.appendChild(textarea);
	textarea.select();
	const copied = document.execCommand("copy");
	textarea.remove();
	if (!copied) throw new Error("Copy command was unsuccessful");
}

async function copyToClipboard(text: string) {
	if (navigator.clipboard && window.isSecureContext) {
		await navigator.clipboard.writeText(text);
		return;
	}
	fallbackCopy(text);
}

export function bindCopyButton(code: HTMLElement, { button, feedback, controls }: CopyControls) {
	let resetTimer: number | undefined;
	let clearTimer: number | undefined;

	button.addEventListener("click", async () => {
		window.clearTimeout(resetTimer);
		window.clearTimeout(clearTimer);
		try {
			await copyToClipboard(code.textContent?.replace(/\n$/, "") ?? "");
			controls.dataset.copied = "true";
			feedback.textContent = FEEDBACK_COPIED;
			button.setAttribute("aria-label", COPIED_LABEL);
			resetTimer = window.setTimeout(() => {
				delete controls.dataset.copied;
				button.setAttribute("aria-label", COPY_LABEL);
				clearTimer = window.setTimeout(() => {
					feedback.textContent = "";
				}, FEEDBACK_CLEAR_MS);
			}, COPIED_RESET_MS);
		} catch (error) {
			console.error("Failed to copy code block", error);
			feedback.textContent = FEEDBACK_FAILED;
		}
	});
}
