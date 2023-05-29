import React from "react";
import Container from "../../components/Container";
import Title from "../../components/Form/Title";
import FormInput from "../../components/Form/FormInput";
import Submit from "../../components/Form/Submit";
import CustomLink from "../../components/CustomLink";
import { formModalClasses } from "../../utils/theme";

const Login = () => {
  return (
    <div className="dark:bg-primary fixed inset-0 bg-white -z-10 flex justify-center items-center">
      <Container>
        <form className={`${formModalClasses} w-72`}>
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
