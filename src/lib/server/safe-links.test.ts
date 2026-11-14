import { describe, expect, it } from 'vitest';
import { isSafeLink, safeLinks } from './safe-links';

describe('stored link validation', () => {
	it.each([
		'javascript:alert(1)',
		'data:text/html,test',
		'//evil.example',
		'/\\evil.example',
		'java\nscript:alert(1)',
		'',
		'file:///etc/passwd'
	])('rejects %j', (value) => {
		expect(isSafeLink(value)).toBe(false);
	});
	it.each([
		'https://example.com',
		'http://example.com',
		'/projects',
		'#',
		'mailto:hello@example.com',
		'tel:+123456789'
	])('accepts %j', (value) => {
		expect(isSafeLink(value)).toBe(true);
	});
});

it('neutralizes existing stored links without changing cached records', () => {
	const records = [
		{ id: 1, link: 'javascript:alert(1)' },
		{ id: 2, link: 'https://example.com' }
	];
	expect(safeLinks(records)).toEqual([{ id: 1, link: '#' }, records[1]]);
	expect(records[0].link).toBe('javascript:alert(1)');
});
