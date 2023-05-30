import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Title from "../../components/Form/Title";
import FormInput from "../../components/Form/FormInput";
import Submit from "../../components/Form/Submit";
import { formModalClasses } from "../../utils/theme";
import FormContainer from "../../components/Form/FormContainer";
import { redirect, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import { resetPassword } from "../../api/auth";

const ResetPassword = () => {
  const [password, setPassword] = useState({
    one: "",
    two: "",
  });
  const updateNotification = useNotification();
  const navigate = useNavigate();
  const { authInfo } = useAuth();
  const [user] = useSearchParams();
  const token = user.get("token");
  const userId = user.get("id");

  useEffect(() => {
    if (authInfo?.isLoggedIn) {
      navigate("/");
    }
  }, [authInfo?.isLoggedIn]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.one.length === 0)
      return updateNotification("error", "Password is missing!");
    if (password.one.trim().length < 8)
      return updateNotification(
        "error",
        "Password shoud contain 8 characters!"
      );
    if (password.one !== password.two)
      return updateNotification("error", "Passwords do not match!");
    const { type, response } = await resetPassword({
      userId,
      token,
      password: password.one,
    });
    updateNotification(type, response);
    type !== "error" && navigate("/auth/login", { replace: true });
  };

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={`${formModalClasses} w-72`}>
          <Title>Reset Password</Title>
          <FormInput
            placeholder={"New Password"}
            name={"one"}
            label={"New Password"}
            type={"password"}
            onChange={handleChange}
            value={password.one}
          />
          <FormInput
            placeholder={"Confirm Password"}
            type={"password"}
            name={"two"}
            label={"Confirm Password"}
            onChange={handleChange}
            value={password.two}
          />
          <Submit value={"Reset Password"} busy={authInfo.isPending} />
        </form>
      </Container>
    </FormContainer>
  );
};

export default ResetPassword;

export const loader = () => {
  const token = localStorage.getItem("auth-token");
  if (token) {
    return redirect("/");
  }
  return null;
};
