import React from 'react';
import styles from './event-content.module.css';

interface IEventContent {
  children: React.ReactNode;
}

const EventContent = ({ children }: IEventContent) => {
  return <section className={styles.content}>{children}</section>;
};

export default EventContent;
