import React, { createContext, useEffect, useState } from "react";
import { getIsAuth, loginUser } from "../api/auth";
import { useNotification } from "../hooks";
export const authContext = createContext();

const defaultAuthInfo = {
  isPending: false,
  isLoggedIn: false,
  profile: {},
  error: "",
};

const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const updateNotification = useNotification();

  const handleLogin = async (userData) => {
    setAuthInfo({ ...authInfo, isPending: true });

    const { type, response } = await loginUser(userData);
    if (type === "error") {
      updateNotification(type, response);
      return setAuthInfo({ ...authInfo, isPending: false, error: response });
    } else {
      localStorage.setItem("auth-token", response.accessToken);
      return setAuthInfo({
        isPending: false,
        profile: response,
        isLoggedIn: true,
        error: "",
      });
    }
  };

  const isAuth = async (token) => {
    setAuthInfo({ ...authInfo, isPending: true });
    let accessToken = token || localStorage.getItem("auth-token");
    const { type, response } = await getIsAuth(accessToken);
    if (type === "error") {
      return setAuthInfo({ ...authInfo, isPending: false, error: response });
    } else {
      return setAuthInfo({
        ...authInfo,
        isPending: false,
        profile: response,
        isLoggedIn: true,
        error: "",
      });
    }
  };

  const handleLogout = () => {
    setAuthInfo({
      ...defaultAuthInfo,
    });
    localStorage.removeItem("auth-token");
  };

  useEffect(() => {
    (async () => {
      await isAuth();
    })();
  }, []);

  return (
    <authContext.Provider
      value={{ authInfo, handleLogin, isAuth, handleLogout }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
