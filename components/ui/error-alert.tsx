import { ReactNode } from 'react';
import styles from './error-alert.module.css';

function ErrorAlert({ children }: { children: ReactNode }) {
  return <div className={styles.alert}>{children}</div>;
}

export default ErrorAlert;
