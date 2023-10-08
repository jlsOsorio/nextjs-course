import { IFeedback } from '@/interfaces/i-feedback';
import { IRequest } from '@/interfaces/i-request';
import React, { FormEvent } from 'react';

const HomePage = () => {
  const [feedbackItems, setFeedbackItems] = React.useState([]);

  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const feedbackInputRef = React.useRef<HTMLTextAreaElement>(null);

  function submitFormHandler(event: FormEvent) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredFeedback = feedbackInputRef.current?.value;

    const requestBody: IRequest = {
      email: enteredEmail ?? '',
      text: enteredFeedback ?? '',
    };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function loadFeedbackHandler() {
    fetch('/api/feedback')
      .then((res) => res.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
      });
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows={5} ref={feedbackInputRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item: IFeedback) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
