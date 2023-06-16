import ThemeProvider from "./ThemeProvider";
import NotificationProvider from "./NotificationProvider";
import AuthProvider from "./AuthProvider";
import SearchProvider from "./SearchProvider";

const ContextProviders = ({ children }) => (
  <NotificationProvider>
    <SearchProvider>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </SearchProvider>
  </NotificationProvider>
);

export default ContextProviders;
