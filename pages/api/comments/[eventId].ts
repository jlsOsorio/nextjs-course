import { buildPath, extractObject } from '@/helpers/api-util';
import IComment from '@/interfaces/i-comment';
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const eventId = req.query.eventId as string;

  const url =
    'mongodb+srv://mongodb:mongodb@cluster0.rfslo2e.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url);

  await client.connect();

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db('events');
    const result = await db.collection('comments').insertOne(newComment);

    console.log(result);

    res.status(201).json({
      message: 'Added comment',
      comment: newComment,
    });
  } else if (req.method === 'GET') {
    const db = client.db('events');
    const documents = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({
      comments: documents,
    });
  }

  client.close();
}

export default handler;
