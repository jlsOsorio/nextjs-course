import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

async function connectDatabase() {
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

async function insertDocument(
  client: MongoClient,
  dbName: string,
  document: { email: string }
) {
  const db = client.db(dbName);
  await db.collection('newsletter').insertOne(document);
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, 'events', { email });
      client?.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

    res.status(201).json({
      message: 'Signed up!',
    });
  }
}

export default handler;
