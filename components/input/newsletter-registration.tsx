import React, { ChangeEvent, ChangeEventHandler, FocusEvent } from 'react';

import styles from './newsletter-registration.module.css';
import EmailBody from '@/interfaces/i-email-body';

function NewsletterRegistration() {
  const [emailInput, setEmailInput] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  function blurHandler() {
    if (emailInput === '') {
      setError('Please insert an email address.');
    } else if (!regex.test(emailInput)) {
      setError(
        'Email address with wrong format. Example: someemail@someemail.com'
      );
    }
  }

  function changeHandler({ target }: ChangeEvent<HTMLInputElement>) {
    if (error && emailInput !== '' && regex.test(emailInput)) {
      setError(null);
    }

    setEmailInput(target.value);
  }

  function registrationHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (emailInput === '') setError('Please insert an email address.');

    if (!error && emailInput !== '') {
      const body: EmailBody = {
        email: emailInput,
      };

      fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((json) => alert(json.message));
    }

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            value={emailInput}
            onChange={changeHandler}
            onBlur={blurHandler}
          />
          <button>Register</button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </section>
  );
}

export default NewsletterRegistration;
