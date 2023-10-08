import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

function extractFeedback(filePath: string) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData.toString());

  return data;
}

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text: feedbackText,
    };

    // Store in a database or a file
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newFeedback);

    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({
      message: 'Success!',
      feedback: newFeedback,
    });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    res.status(200).json({
      feedback: data,
    });
  }
}

export default handler;
