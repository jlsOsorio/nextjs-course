import { buildPath, extractObject } from '@/helpers/api-util';
import EmailBody from '@/interfaces/i-email-body';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const email = req.body.email;

    const filePath = buildPath('emails.json');
    const data = extractObject<EmailBody>(filePath);

    data.push(email);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({
      message: 'Registration sucessful',
      email,
    });
  }
}

export default handler;
