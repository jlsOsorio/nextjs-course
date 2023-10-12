import { buildPath, extractObject } from '@/helpers/api-util';
import IComment from '@/interfaces/i-comment';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

function handler(req: NextApiRequest, res: NextApiResponse) {
  const eventId = req.query.eventId as string;

  const filePath = buildPath('comments.json');
  const data = extractObject<IComment>(filePath);

  if (req.method === 'POST') {
    const commentBody: IComment = {
      email: req.body.email,
      name: req.body.name,
      text: req.body.text,
      eventId,
    };

    data.push(commentBody);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({
      message: 'Comment added sucessfully',
      comment: commentBody,
    });
  } else if (req.method === 'GET') {
    const eventComments = data.filter((item) => item.eventId === eventId);

    res.status(200).json({
      comments: eventComments,
    });
  }
}

export default handler;
