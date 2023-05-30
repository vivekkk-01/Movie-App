import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Title from "../../components/Form/Title";
import FormInput from "../../components/Form/FormInput";
import Submit from "../../components/Form/Submit";
import CustomLink from "../../components/CustomLink";
import { formModalClasses } from "../../utils/theme";
import FormContainer from "../../components/Form/FormContainer";
import { createUser } from "../../api/auth";
import { redirect, useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";

const validateUser = ({ name, email, password }) => {
  const validateEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!name.trim()) return { ok: false, error: "Name is required." };
  if (!/^[a-z A-Z]+$/.test(name)) return { ok: false, error: "Invalid Name" };

  if (!email.trim()) return { ok: false, error: "Email is required." };
  if (!validateEmail.test(email)) return { ok: false, error: "Invalid Email" };

  if (!password.trim()) return { ok: false, error: "Password is required." };
  if (password.length < 8)
    return {
      ok: false,
      error: "Password should be atleast 8 characters long.",
    };

  return { ok: true };
};

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { authInfo } = useAuth();
  const updateNotification = useNotification();

  const handleChange = ({ target }) => {
    setUserInfo((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { ok, error } = validateUser(userInfo);
    if (!ok) updateNotification("error", error);
    else {
      const { type, response } = await createUser(userInfo);
      return type === "error"
        ? updateNotification("error", response)
        : navigate("/auth/verification", {
            state: { user: response },
            replace: true,
          });
    }
  };

  useEffect(() => {
    if (authInfo?.isLoggedIn) {
      navigate("/");
    }
  }, [authInfo?.isLoggedIn]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={`${formModalClasses} w-72`}>
          <Title>Sign Up</Title>
          <FormInput
            onChange={handleChange}
            placeholder={"Your Name"}
            name={"name"}
            label={"Name"}
            type={"name"}
            value={userInfo.name}
          />
          <FormInput
            onChange={handleChange}
            placeholder={"Your Email"}
            name={"email"}
            label={"Email"}
            type={"email"}
            value={userInfo.email}
          />
          <FormInput
            onChange={handleChange}
            placeholder={"Your Password"}
            type={"password"}
            name={"password"}
            label={"Password"}
            value={userInfo.password}
          />
          <Submit value={"Sign Up"} />
          <div className="flex justify-between items-center">
            <CustomLink to="/auth/login">Log In</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default SignUp;

export const loader = () => {
  const token = localStorage.getItem("auth-token");
  if (token) {
    return redirect("/");
  }
  return null;
};
