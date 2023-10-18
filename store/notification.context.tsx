import React from 'react';

const NotificationContext = React.createContext({
  notification: null, // { title, message, status }
  showNotification: function () {},
  hideNotification: function () {},
});

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <NotificationContext.Provider>{children}</NotificationContext.Provider>
  );
};

export default NotificationContext;
