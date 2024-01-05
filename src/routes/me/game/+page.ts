import type { PageLoad } from './$types';
import { databases } from '$lib/appwrite';
import { Query } from 'appwrite';

export const load: PageLoad = async ({ parent }) => {
	const data = await parent();

	const packs = await databases.listDocuments('main', 'packs', [Query.limit(100)]);

	const [locations, finishes] = await Promise.all([
		databases.listDocuments('main', 'locations', [
			Query.equal(
				'packId',
				packs.documents.map((pack) => pack.$id)
			),
			Query.limit(100 * packs.documents.length)
		]),
		databases.listDocuments('main', 'locationFinishes', [
			Query.equal(
				'packId',
				packs.documents.map((pack) => pack.$id)
			),
			Query.equal('userId', data?.user?.$id ?? ''),
			Query.limit(100 * packs.documents.length)
		])
	]);

	return {
		packs,
		locations,
		finishes
	};
};
