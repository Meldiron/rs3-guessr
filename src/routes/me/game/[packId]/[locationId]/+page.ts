import type { PageLoad } from './$types';
import { databases } from '$lib/appwrite';
import { Query } from 'appwrite';

export const load: PageLoad = async ({ params }) => {
    const { packId, locationId } = params;

	const pack = await databases.getDocument('main', 'packs', packId);
	const location = await databases.getDocument('main', 'locations', locationId);
	const finish = await databases.listDocuments('main', 'locationFinishes', [
		Query.equal(
			'locationId',
			location.$id
		),
		Query.select(['$id', 'packId']),
		Query.limit(1)
	]);

	return {
		pack,
		location,
		finish: finish.documents[0] ? finish.documents[0] : null
	};
};
