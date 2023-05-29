import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemeProvider from "./context/ThemeProvider.jsx";
import NotificationProvider from "./context/NotificationProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <NotificationProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </NotificationProvider>
  </ThemeProvider>
);
