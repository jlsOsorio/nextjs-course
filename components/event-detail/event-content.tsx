import React from 'react';

import styles from './event-content.module.css';

const EventContent = ({ children }: { children: React.ReactNode }) => {
  return <section className={styles.content}>{children}</section>;
};

export default EventContent;
