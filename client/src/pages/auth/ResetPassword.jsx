import React from "react";
import Container from "../../components/Container";
import Title from "../../components/Form/Title";
import FormInput from "../../components/Form/FormInput";
import Submit from "../../components/Form/Submit";
import { formModalClasses } from "../../utils/theme";
import FormContainer from "../../components/Form/FormContainer";

const Login = () => {
  return (
    <FormContainer>
      <Container>
        <form className={`${formModalClasses} w-72`}>
          <Title>Reset Password</Title>
          <FormInput
            placeholder={"New Password"}
            name={"password"}
            label={"New Password"}
            type={"password"}
          />
          <FormInput
            placeholder={"Confirm Password"}
            type={"password"}
            name={"confirmPassword"}
            label={"Confirm Password"}
          />
          <Submit value={"Reset Password"} />
        </form>
      </Container>
    </FormContainer>
  );
};

export default Login;
