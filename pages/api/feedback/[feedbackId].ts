import { NextApiRequest, NextApiResponse } from 'next';
import { buildFeedbackPath, extractFeedback } from '.';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const feedbackId = req.query.feedbackId;

  const feedbackPath = buildFeedbackPath();
  const feedbackData = extractFeedback(feedbackPath);
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );

  res.status(200).json({ feedback: selectedFeedback });
};

export default handler;
