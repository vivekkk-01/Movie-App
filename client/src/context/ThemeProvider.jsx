import React, { createContext, useEffect } from "react";
export const themeContext = createContext();

const defaultTheme = "light";
const darkTheme = "dark";

const ThemeProvider = ({ children }) => {
  const toggleTheme = () => {
    const oldTheme = localStorage.getItem("theme");
    const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;
    document.documentElement.classList.remove(oldTheme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) document.documentElement.classList.add(defaultTheme);
    else document.documentElement.classList.add(theme);
  }, []);

  return (
    <themeContext.Provider value={{ toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export default ThemeProvider;
