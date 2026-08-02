// if the language is not specified, the label "plaintext" will be set automatically.
const LANGUAGE_BADGE_PLAINTEXT = "plaintext";

export function applyLanguageBadge(langBadge: HTMLElement, language: string | undefined) {
	console.log("applyLanguageBadge", langBadge, language);
	if (language === LANGUAGE_BADGE_PLAINTEXT) {
		langBadge.remove();
		return;
	}
	if (!language) {
		langBadge.remove();
		return;
	}

	langBadge.textContent = language;
	langBadge.hidden = false;
}
