import React from 'react';

import styles from './error-alert.module.css';

const ErrorAlert = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.alert}>{children}</div>;
};

export default ErrorAlert;
