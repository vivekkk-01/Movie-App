import { useContext } from "react";
import { themeContext } from "../context/ThemeProvider";
import { notificationContext } from "../context/NotificationProvider";
import { authContext } from "../context/AuthProvider";

export const useTheme = () => useContext(themeContext)

export const useNotification = () => useContext(notificationContext)

export const useAuth = () => useContext(authContext)