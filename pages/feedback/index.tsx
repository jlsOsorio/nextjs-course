import { buildFeedbackPath, extractFeedback } from '../api/feedback';

import { IFeedback } from '@/interfaces/i-feedback';
import React from 'react';

const FeedbackPage = ({ feedbackItems }: { feedbackItems: IFeedback[] }) => {
  return (
    <ul>
      {feedbackItems.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
