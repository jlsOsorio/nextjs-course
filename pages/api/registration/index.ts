import { NextApiRequest, NextApiResponse } from 'next';

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }
    // const filePath = buildPath('emails.json');
    // const data = extractObject<EmailBody>(filePath);

    // data.push(email);
    // fs.writeFileSync(filePath, JSON.stringify(data));

    console.log(email);
    res.status(201).json({
      message: 'Signed up!',
    });
  }
}

export default handler;
