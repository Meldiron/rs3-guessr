import { Client, Databases, Permission, Query, Role, ID } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const body = req.body;

  if (!body || !body.locationId || !body.lat || !body.lng) {
    return res.json({
      ok: false,
      message: "Wrong request."
    });
  }

  const { locationId, lat, lng } = body;

  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const userId = req.headers['x-appwrite-user-id'];

  const databases = new Databases(client);

  const location = await databases.getDocument('main', 'locations', locationId);

  if (!location) {
    return res.json({
      ok: false,
      message: "Location not found."
    });
  }

  const coordinates = (await databases.listDocuments('main', 'locationCoordinates', [Query.equal('locationId', location.$id), Query.limit(1)])).documents[0] ?? null;

  if (!coordinates) {
    throw new Error('Coordinate missing for ' + location.$id);
  }

  const correctLat = coordinates.lat;
  const correctLng = coordinates.lng;

  const distance = Math.hypot(lat - correctLat, lng - correctLng);
  const isCorrect = distance <= 15;
  const hardMode = distance <= 5;

  log(correctLat + " " + correctLng);
  log(lat + " " + lng);
  log(distance);

  if (!isCorrect) {
    return res.json({
      ok: true,
      correct: false
    });
  }
  const finish = (await databases.listDocuments('main', 'locationFinishes', [Query.equal('locationId', location.$id), Query.equal('userId', userId), Query.limit(1)])).documents[0] ?? null;
  const finished = finish ? true : false;
  if (finished) {
    if(!finish.hardMode && hardMode)
    await databases.updateDocument('main', 'locationFinishes', finish.$id, {
      hardMode
    }, [
      Permission.read(Role.user(userId)),
    ]);

    return res.json({
      ok: true,
      correct: true,
      hardMode
    });
  }

  await databases.createDocument('main', 'locationFinishes', ID.unique(), {
    userId,
    packId: location.packId,
    locationId: location.$id,
    hardMode: hardMode
  }, [
    Permission.read(Role.user(userId)),
  ]);

  return res.json({
    ok: true,
    correct: true,
    hardMode
  });
};