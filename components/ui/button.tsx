import Link from 'next/link';
import React, { MouseEventHandler, ReactNode } from 'react';
import styles from './button.module.css';

interface IButton {
  children: ReactNode;
  link?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
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
