import React from 'react';
import styles from './logistics-item.module.css';

interface ILogisticsItem {
  icon: React.FC;
  children: React.ReactNode;
}

const LogisticsItem = ({ icon: Icon, children }: ILogisticsItem) => {
  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <span className={styles.content}>{children}</span>
    </li>
  );
};

export default LogisticsItem;
