import { loadPortfolio } from '$lib/server/portfolio';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ setHeaders }) => {
	// Cache public database results, not responses that may carry authentication cookies.
	setHeaders({ 'cache-control': 'private, no-store' });
	return loadPortfolio();
};
