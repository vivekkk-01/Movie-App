import React, { useEffect, useRef, useState } from "react";
import Title from "../../components/Form/Title";
import Submit from "../../components/Form/Submit";
import Container from "../../components/Container";
import FormContainer from "../../components/Form/FormContainer";
import { formModalClasses } from "../../utils/theme";

const EmailVerification = () => {
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const inputRef = useRef();

  const handleOtp = (event, index) => {
    const { value } = event.target;
    console.log(value);
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1, value.length);
    setOtp([...newOtp]);
    if (!value) focusPrevInputField(index);
    else setActiveOtpIndex(index + 1);
  };

  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nextIndex);
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, [activeOtpIndex]);

  const handleKeyDown = (event, index) => {
    const { key } = event;
    if (key === "Backspace") focusPrevInputField(index);
  };

  return (
    <FormContainer>
      <Container>
        <form className={formModalClasses}>
          <div>
            <Title>Please enter OTP to verify your account</Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              OTP has been sent to your email
            </p>
          </div>
          <div className="flex justify-between items-center space-x-4">
            {otp.map((_, index) => (
              <input
                ref={activeOtpIndex === index ? inputRef : null}
                key={index}
                value={otp[index] || ""}
                onChange={(event) => handleOtp(event, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                type="number"
                className="w-12 h-12 rounded text-center font-semibold dark:text-white text-primary text-xl border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary bg-transparent spin-button-none"
              />
            ))}
          </div>
          <Submit value="Send Link" />
        </form>
      </Container>
    </FormContainer>
  );
};

export default EmailVerification;
