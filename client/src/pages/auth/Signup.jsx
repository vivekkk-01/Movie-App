import React from "react";
import Container from "../../components/Container";
import Title from "../../components/Form/Title";
import FormInput from "../../components/Form/FormInput";
import Submit from "../../components/Form/Submit";
import CustomLink from "../../components/CustomLink";

const SignUp = () => {
  return (
    <div className="bg-primary fixed inset-0 -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded w-72 p-6 space-y-3">
          <Title>Sign Up</Title>
          <FormInput
            placeholder={"Your Name"}
            name={"name"}
            label={"Name"}
            type={"name"}
          />
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
          <Submit value={"Sign Up"} />
          <div className="flex justify-between items-center">
            <CustomLink to="/auth/login">Log In</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default SignUp;
