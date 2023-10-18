import { MongoClient, Sort } from 'mongodb';

export async function connectDatabase() {
  // Connection URL
  const url =
    'mongodb+srv://mongodb:mongodb@cluster0.rfslo2e.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url);

  // Database Name
  const dbName = 'events';

  // Use connect method to connect to the server
  const conn = await client.connect();

  return conn;
}

export async function insertDocument(
  client: MongoClient,
  dbName: string,
  collection: string,
  document: { email: string }
) {
  const db = client.db(dbName);
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(
  client: MongoClient,
  dbName: string,
  collection: string,
  sort: Sort
) {
  const db = client.db(dbName);
  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
