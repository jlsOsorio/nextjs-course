import React, { ReactNode } from 'react';
import MainHeader from './main-header';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
};

export default Layout;
