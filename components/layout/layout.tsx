import React from 'react';

import MainHeader from './main-header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
};

export default Layout;
