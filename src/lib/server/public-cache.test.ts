import { describe, it, expect, vi, afterEach } from 'vitest';
import { createPublicCache } from './public-cache';
afterEach(() => {
	vi.useRealTimers();
	vi.restoreAllMocks();
});
describe('public section cache', () => {
	it('deduplicates requests and retains intentional empty content', async () => {
		const fetcher = vi.fn().mockResolvedValue([]);
		const cache = createPublicCache(fetcher, ['old record']);
		const results = await Promise.all([cache.get(), cache.get()]);
		expect(results).toEqual([[], []]);
		expect(await cache.get()).toEqual([]);
		expect(fetcher).toHaveBeenCalledTimes(1);
	});
	it('isolates failures and serves the last successful snapshot', async () => {
		vi.useFakeTimers();
		vi.spyOn(console, 'error').mockImplementation(() => {});
		const fetcher = vi
			.fn()
			.mockResolvedValueOnce(['current'])
			.mockRejectedValueOnce(new Error('offline'));
		const cache = createPublicCache(fetcher, ['bundled']);
		expect(await cache.get()).toEqual(['current']);
		vi.advanceTimersByTime(60_001);
		expect(await cache.get()).toEqual(['current']);
		const other = createPublicCache(async () => ['other section'], []);
		expect(await other.get()).toEqual(['other section']);
	});
	it('uses the bundled snapshot on a cold outage, then retries', async () => {
		vi.useFakeTimers();
		vi.spyOn(console, 'error').mockImplementation(() => {});
		const fetcher = vi
			.fn()
			.mockRejectedValueOnce(new Error('offline'))
			.mockResolvedValueOnce(['restored']);
		const cache = createPublicCache(fetcher, ['bundled']);
		expect(await cache.get()).toEqual(['bundled']);
		vi.advanceTimersByTime(5_001);
		expect(await cache.get()).toEqual(['restored']);
	});
	it('does not let a request started before an admin edit overwrite fresh content', async () => {
		let finish!: (value: string[]) => void;
		const fetcher = vi
			.fn()
			.mockImplementationOnce(
				() =>
					new Promise<string[]>((resolve) => {
						finish = resolve;
					})
			)
			.mockResolvedValueOnce(['new']);
		const cache = createPublicCache(fetcher, ['bundled']);
		const old = cache.get();
		cache.invalidate();
		expect(await cache.get()).toEqual(['new']);
		finish(['old']);
		await old;
		expect(await cache.get()).toEqual(['new']);
	});
});
