import React, { createContext, useState } from "react";
export const notificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState("");
  const [classes, setClasses] = useState("");
  let timeout;

  const updateNotification = (type, value) => {
    if (timeout) clearTimeout(timeout);
    switch (type) {
      case "error":
        setClasses("bg-red-500");
        break;
      case "warning":
        setClasses("bg-orange-500");
        break;
      case "success":
        setClasses("bg-green-500");
        break;
      default:
        setClasses("bg-red-500");
        break;
    }
    setNotification(value);
    timeout = setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <notificationContext.Provider value={updateNotification}>
      {children}
      {notification && (
        <div className="fixed left-1/2 -translate-x-1/2 w xs:top-32 xs:w-52 top-20 shadow-md shadow-gray-400 rounded-sm">
          <div className="bounce-custom">
            <p className={classes + " text-white px-4 py-2 font-semibold"}>
              {notification}
            </p>
          </div>
        </div>
      )}
    </notificationContext.Provider>
  );
};

export default NotificationProvider;
