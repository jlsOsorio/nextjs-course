import React from 'react';

import styles from './loading.module.css';

const Loading = ({ loadingText }: { loadingText: string }) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{loadingText}</p>
    </div>
  );
};

export default Loading;
