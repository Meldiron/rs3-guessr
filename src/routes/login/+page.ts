export const csr = true;
export const ssr = false;
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// TODO: Make this universal

export const load: PageLoad = async ({ parent }) => {
	const data = await parent();
	if (data.user) {
		throw redirect(302, '/');
	}
	return null;
};
