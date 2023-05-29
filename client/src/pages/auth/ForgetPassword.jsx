import React from "react";
import Container from "../../components/Container";
import Title from "../../components/Form/Title";
import FormInput from "../../components/Form/FormInput";
import Submit from "../../components/Form/Submit";
import CustomLink from "../../components/CustomLink";
import FormContainer from "../../components/Form/FormContainer";
import { formModalClasses } from "../../utils/theme";

const ForgetPassword = () => {
  return (
    <FormContainer>
      <Container>
        <form className={`${formModalClasses} w-72`}>
          <Title>Forget Password</Title>
          <FormInput
            placeholder={"Your Email"}
            name={"email"}
            label={"Email"}
            type={"email"}
          />
          <Submit value={"Send Link"} />
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
