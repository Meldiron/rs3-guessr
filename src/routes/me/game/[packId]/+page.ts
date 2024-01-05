import type { PageLoad } from './$types';
import { databases } from '$lib/appwrite';
import { Query } from 'appwrite';

export const load: PageLoad = async ({ params, parent }) => {
    const { packId } = params;

	const data = await parent();

	const pack = await databases.getDocument('main', 'packs', packId);

	const [locations, finishes] = await Promise.all([
		databases.listDocuments('main', 'locations', [
			Query.equal(
				'packId',
				pack.$id
			),
			Query.limit(100)
		]),
		databases.listDocuments('main', 'locationFinishes', [
			Query.equal(
				'packId',
				pack.$id
			),
			Query.equal(
				'userId',
				data?.user?.$id ?? ''
			),
			Query.limit(100)
		])
	]);

	return {
		pack,
		locations: locations.documents,
		finishes: finishes.documents
	};
};
