import ThemeProvider from "./ThemeProvider";
import NotificationProvider from "./NotificationProvider";
import AuthProvider from "./AuthProvider";

const ContextProviders = ({ children }) => (
  <ThemeProvider>
    <NotificationProvider>
      <AuthProvider>{children}</AuthProvider>
    </NotificationProvider>
  </ThemeProvider>
);

export default ContextProviders;
