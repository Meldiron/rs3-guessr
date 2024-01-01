import { account } from '$lib/appwrite';
import type { LayoutLoad } from './$types';

export const csr = true;
export const ssr = false;

export const load: LayoutLoad = async () => {
	let user = null;

	try {
		user = await account.get();
	} catch (error) {
		console.error('Error getting account:', error);
	}
	return {
		user
	};
};
