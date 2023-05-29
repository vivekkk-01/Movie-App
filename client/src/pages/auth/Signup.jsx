import React from "react";
import Container from "../../components/Container";
import Title from "../../components/Form/Title";
import FormInput from "../../components/Form/FormInput";
import Submit from "../../components/Form/Submit";
import CustomLink from "../../components/CustomLink";
import { formModalClasses } from "../../utils/theme";
import FormContainer from "../../components/Form/FormContainer";

const SignUp = () => {
  return (
    <FormContainer>
      <Container>
        <form className={`${formModalClasses} w-72`}>
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
    </FormContainer>
  );
};

export default SignUp;
