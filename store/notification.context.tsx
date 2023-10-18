import React from 'react';

type ContextObject = {
  notification: INotification | null;
  showNotification: (notificationData: INotification) => void;
  hideNotification: () => void;
};

const NotificationContext = React.createContext<ContextObject>({
  notification: null, // { title, message, status }
  showNotification: function (notificationData: INotification) {},
  hideNotification: function () {},
});

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeNotification, setActiveNotification] =
    React.useState<INotification | null>(null);

  function showNotificationHandler(notificationData: INotification) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context: ContextObject = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
