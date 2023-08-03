import Link from 'next/link';
import React, { ReactNode } from 'react';
import styles from './button.module.css';

const Button = ({ children, link }: { children: ReactNode; link: string }) => {
  return (
    <Link href={link} className={styles.btn}>
      {children}
    </Link>
  );
};

export default Button;
