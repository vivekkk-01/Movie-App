import React from "react";
import Container from "../../components/Container";
import Title from "../../components/Form/Title";
import FormInput from "../../components/Form/FormInput";
import Submit from "../../components/Form/Submit";
import CustomLink from "../../components/CustomLink";

const Login = () => {
  return (
    <div className="bg-primary fixed inset-0 -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded w-72 p-6 space-y-3">
          <Title>Log In</Title>
          <FormInput
            placeholder={"Your Email"}
            name={"email"}
            label={"Email"}
            type={"email"}
          />
          <FormInput
            placeholder={"Your Password"}
            type={"password"}
            name={"password"}
            label={"Password"}
          />
          <Submit value={"Log In"} />
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
