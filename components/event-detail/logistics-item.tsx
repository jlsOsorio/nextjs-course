import React from 'react';

import styles from './logistics-item.module.css';

const LogisticsItem = ({
  icon: Icon,
  children,
}: {
  icon: React.FC;
  children: React.ReactNode;
}) => {
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
