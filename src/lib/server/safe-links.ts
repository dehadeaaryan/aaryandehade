// Reject executable schemes, protocol-relative URLs, and browser-normalized controls.
export function isSafeLink(value: string): boolean {
	if (
		[...value].some(
			(char) => char.charCodeAt(0) <= 32 || char.charCodeAt(0) === 127 || char === '\\'
		)
	)
		return false;
	if (value.startsWith('#')) return true;
	if (value.startsWith('/') && !value.startsWith('//')) return true;
	try {
		return ['https:', 'http:', 'mailto:', 'tel:'].includes(new URL(value).protocol);
	} catch {
		return false;
	}
}

export function safeLinks<T extends { link: string }>(items: T[]): T[] {
	return items.map((item) => ({ ...item, link: isSafeLink(item.link) ? item.link : '#' }));
}
