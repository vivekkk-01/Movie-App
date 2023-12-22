import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Title from "../../components/Form/Title";
import FormInput from "../../components/Form/FormInput";
import Submit from "../../components/Form/Submit";
import CustomLink from "../../components/CustomLink";
import FormContainer from "../../components/Form/FormContainer";
import { formModalClasses } from "../../utils/theme";
import { redirect, useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import { forgetPassword } from "../../api/auth";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { authInfo } = useAuth();
  const [email, setEmail] = useState("");
  const updateNotification = useNotification();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (authInfo?.isLoggedIn) {
      navigate("/");
    }
  }, [authInfo?.isLoggedIn]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    const validateEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email.trim()) {
      updateNotification("error", "Email is required.");
      setBusy(false);
      return;
    }
    if (!validateEmail.test(email)) {
      updateNotification("error", "Invalid Email");
      setBusy(false);
      return;
    }
    const { type, response } = await forgetPassword(email);
    setBusy(false);
    return updateNotification(type, response);
  };

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={`${formModalClasses} w-72`}>
          <Title>Forget Password</Title>
          <FormInput
            placeholder={"Your Email"}
            name={"email"}
            label={"Email"}
            type={"email"}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Submit busy={busy} value={"Send Link"} />
          <div className="flex justify-between items-center">
            <CustomLink to="/auth/login">Log In</CustomLink>
            <CustomLink to="/auth/sign-up">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default ForgetPassword;

export const loader = () => {
  const token = localStorage.getItem("auth-token");
  if (token) {
    return redirect("/");
  }
  return null;
};
