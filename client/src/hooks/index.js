import { useContext } from "react";
import { themeContext } from "../context/ThemeProvider";
import { notificationContext } from "../context/NotificationProvider";
import { authContext } from "../context/AuthProvider";
import { searchContext } from "../context/SearchProvider";

export const useTheme = () => useContext(themeContext)

export const useNotification = () => useContext(notificationContext)

export const useAuth = () => useContext(authContext)

export const useSearch = () => useContext(searchContext)