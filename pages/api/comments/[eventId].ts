import { NextApiRequest, NextApiResponse } from 'next';
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from '@/helpers/db-util';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const eventId = req.query.eventId as string;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;
    try {
      result = await insertDocument(client, 'events', 'comments', newComment);
      res.status(201).json({
        message: 'Added comment',
        comment: newComment,
      });
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
    }
  } else if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(
        client,
        'events',
        'comments',
        {
          _id: -1,
        },
        { eventId }
      );
      res.status(200).json({
        comments: documents,
      });
    } catch (error) {
      res.status(500).json({ message: 'Getting data failed!' });
    }
  }

  client.close();
}

export default handler;
