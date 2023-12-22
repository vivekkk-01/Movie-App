import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Title from "../../components/Form/Title";
import FormInput from "../../components/Form/FormInput";
import Submit from "../../components/Form/Submit";
import CustomLink from "../../components/CustomLink";
import { formModalClasses } from "../../utils/theme";
import { redirect, useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";

const validateUser = ({ email, password }) => {
  const validateEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!email.trim()) return { ok: false, error: "Email is required." };
  if (!validateEmail.test(email)) return { ok: false, error: "Invalid Email" };

  if (!password.trim()) return { ok: false, error: "Password is required." };
  if (password.length < 8)
    return {
      ok: false,
      error: "Password should be at least 8 characters long.",
    };

  return { ok: true };
};

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const { authInfo, handleLogin } = useAuth();
  const updateNotification = useNotification();

  const handleChange = ({ target }) => {
    setUserInfo((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    const { ok, error } = validateUser(userInfo);
    if (!ok) {
      updateNotification("error", error);
    } else {
      handleLogin(userInfo);
    }
    setBusy(false);
  };

  useEffect(() => {
    if (authInfo?.isLoggedIn) {
      if (authInfo?.profile?.role !== "admin") {
        navigate("/");
      } else {
        navigate("/admin");
      }
    }
  }, [authInfo?.isLoggedIn]);

  return (
    <div className="dark:bg-primary fixed inset-0 bg-white -z-10 flex justify-center items-center">
      <Container>
        <form onSubmit={handleSubmit} className={`${formModalClasses} w-72`}>
          <Title>Log In</Title>
          <FormInput
            placeholder={"Your Email"}
            name={"email"}
            label={"Email"}
            type={"email"}
            onChange={handleChange}
            value={userInfo.email}
          />
          <FormInput
            placeholder={"Your Password"}
            type={"password"}
            name={"password"}
            label={"Password"}
            onChange={handleChange}
            value={userInfo.password}
          />
          <Submit value={"Log In"} busy={busy} />
          <div className="flex justify-between items-center">
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/sign-up">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Login;

export const loader = () => {
  const token = localStorage.getItem("auth-token");
  if (token) {
    return redirect("/");
  }
  return null;
};
