import { buildFeedbackPath, extractFeedback } from '../api/feedback/index';

import { IFeedback } from '@/interfaces/i-feedback';
import React from 'react';

const FeedbackPage = ({ feedbackItems }: { feedbackItems: IFeedback[] }) => {
  const [feedbackData, setFeedbackData] = React.useState<IFeedback>();

  function loadFeedbackHandler(id?: string) {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbackData(data.feedback));
  }

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}{' '}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
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
