// Cache public portfolio content only. Never put sessions or user data here.
export function createPublicCache<T>(fetcher: () => Promise<T>, fallback: T, ttl = 60_000) {
	let value = fallback;
	let expires = 0;
	let generation = 0;
	let pending: Promise<T> | undefined;
	return {
		invalidate() {
			generation++;
			expires = 0;
			pending = undefined;
		},
		async get(): Promise<T> {
			if (Date.now() < expires) return value;
			if (pending) return pending;
			const current = generation;
			const request = (async () => {
				try {
					const result = await fetcher();
					if (current === generation) {
						value = result;
						expires = Date.now() + ttl;
					}
					return result;
				} catch {
					console.error('Portfolio section unavailable; serving its last public snapshot.');
					if (current === generation) expires = Date.now() + 5_000;
					return value;
				} finally {
					if (current === generation) pending = undefined;
				}
			})();
			pending = request;
			return request;
		}
	};
}
