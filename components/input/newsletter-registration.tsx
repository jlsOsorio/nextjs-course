import React, { ChangeEvent, ChangeEventHandler, FocusEvent } from 'react';

import styles from './newsletter-registration.module.css';
import EmailBody from '@/interfaces/i-email-body';
import NotificationContext from '@/store/notification.context';

function NewsletterRegistration() {
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState<string | null>(null);
  const notificationCtx = React.useContext(NotificationContext);

  const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  function blurHandler() {
    if (emailInputRef.current) {
      const value = emailInputRef.current.value;
      if (value === '') {
        setError('Please insert an email address.');
      } else if (!regex.test(value)) {
        setError(
          'Email address with wrong format. Example: someemail@someemail.com'
        );
      }
    }
  }

  function changeHandler() {
    if (emailInputRef.current) {
      const value = emailInputRef.current.value;
      if (error && value !== '' && regex.test(value)) {
        setError(null);
      }
    }
  }

  function registrationHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (emailInputRef.current) {
      if (emailInputRef.current.value === '')
        setError('Please insert an email address.');

      if (!error && emailInputRef.current.value !== '') {
        const enteredEmail = emailInputRef.current.value;

        notificationCtx.showNotification({
          title: 'Signing up...',
          message: 'Registering for newsletter.',
          status: 'pending',
        });

        fetch('/api/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: enteredEmail }),
        })
          .then(async (res) => {
            if (res.ok) {
              return res.json();
            }

            const data = await res.json();
            throw new Error(data.message || 'Something went wrong!');
          })
          .then(() => {
            notificationCtx.showNotification({
              title: 'Success!',
              message: 'Successfully registered for newsletter.',
              status: 'success',
            });
          })
          .catch((error) => {
            notificationCtx.showNotification({
              title: 'Error!',
              message: error.message || 'Something went wrong!',
              status: 'error',
            });
          });
      }
    }
  }

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
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
