import React from "react";
import Container from "../../components/Container";
import Title from "../../components/Form/Title";
import FormInput from "../../components/Form/FormInput";
import Submit from "../../components/Form/Submit";

const Login = () => {
  return (
    <div className="bg-primary fixed inset-0 -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded w-72 p-6 space-y-3">
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
    </div>
  );
};

export default Login;
