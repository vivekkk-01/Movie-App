import { useContext } from "react";
import { themeContext } from "../context/ThemeProvider";
import { notificationContext } from "../context/NotificationProvider";

export const useTheme = () => useContext(themeContext)

export const useNotification = () => useContext(notificationContext)