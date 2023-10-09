import React from 'react';

import Link from 'next/link';
import styles from './button.module.css';

interface IButton {
  children: React.ReactNode;
  link?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, link, onClick }: IButton) => {
  if (link) {
    return (
      <Link href={link} className={styles.btn}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
