import { buildPath, extractObject } from '@/helpers/api-util';
import IComment from '@/interfaces/i-comment';
import { NextApiRequest, NextApiResponse } from 'next';

function handler(req: NextApiRequest, res: NextApiResponse) {
  const eventId = req.query.eventId as string;

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
      id: new Date().toString(),
      email,
      name,
      text,
    };

    console.log(newComment);

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
}

export default handler;
