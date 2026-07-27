// src/utils/textUtils.ts

/**
 * Parsea las menciones (@username) en un texto y las convierte en enlaces HTML navegables.
 * Cada mención abre una nueva pestaña filtrada por el usuario especificado.
 */
export function parseMentions(text: string): string {
	if (!text) return "";
	return text.replace(
		/@([a-zA-Z0-9_]+)/g,
		'<a href="/gallery?user=$1" target="_blank" class="text-brand-sage hover:underline font-bold transition-colors cursor-pointer" onclick="event.stopPropagation()">@$1</a>'
	);
}
