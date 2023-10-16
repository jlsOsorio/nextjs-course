import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    // MongoClient.connect(
    //   'mongodb+srv://mongodb:mongodb@cluster0.rfslo2e.mongodb.net/newsletter?retryWrites=true&w=majority'
    // ).then(client => {

    // });

    // Connection URL
    const url =
      'mongodb+srv://mongodb:mongodb@cluster0.rfslo2e.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(url);

    // Database Name
    const dbName = 'events';

    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    await db.collection('newsletter').insertOne({
      email,
    });

    client.close();

    res.status(201).json({
      message: 'Signed up!',
    });
  }
}

export default handler;
