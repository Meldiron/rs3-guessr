import type { PageLoad } from './$types';
import { databases } from '$lib/appwrite';
import { Query } from 'appwrite';

export const load: PageLoad = async ({ params }) => {
    const { packId } = params;

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
			Query.select(['$id', 'locationId']),
			Query.limit(100)
		])
	]);

	return {
		pack,
		locations: locations.documents,
		finishes: finishes.documents
	};
};
