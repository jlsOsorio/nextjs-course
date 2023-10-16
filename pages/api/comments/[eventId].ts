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

  const filePath = buildPath('comments.json');
  const data = extractObject<IComment>(filePath);

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

    // const commentBody: IComment = {
    //   email: req.body.email,
    //   name: req.body.name,
    //   text: req.body.text,
    //   eventId,
    // };

    // data.push(commentBody);
    // fs.writeFileSync(filePath, JSON.stringify(data));

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
    const dummyList = [
      { id: 'c1', name: 'João', text: 'A first comment!' },
      { id: 'c2', name: 'Ana', text: 'A second comment!' },
    ];
    // const eventComments = data.filter((item) => item.eventId === eventId);

    res.status(200).json({
      comments: dummyList,
    });
  }

  client.close();
}

export default handler;
