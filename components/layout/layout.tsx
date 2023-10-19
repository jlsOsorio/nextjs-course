import React from 'react';

import MainHeader from './main-header';
import Notification from '../ui/notification';
import NotificationContext from '@/store/notification.context';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const notificationCtx = React.useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};

export default Layout;
