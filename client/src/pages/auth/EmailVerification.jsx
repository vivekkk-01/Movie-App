import React, { useEffect, useRef, useState } from "react";
import Title from "../../components/Form/Title";
import Submit from "../../components/Form/Submit";
import Container from "../../components/Container";
import FormContainer from "../../components/Form/FormContainer";
import { formModalClasses } from "../../utils/theme";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";

const isValidOtp = (otp) => {
  let valid = false;
  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }
  return valid;
};

const EmailVerification = () => {
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const navigate = useNavigate();
  const updateNotification = useNotification();
  const { isAuth, authInfo } = useAuth();
  const { state } = useLocation();
  const user = state?.user;

  useEffect(() => {
    if (!user) {
      return navigate("/not-found");
    }
  }, [user]);

  useEffect(() => {
    if (authInfo.isLoggedIn) {
      return navigate("/");
    }
  }, [authInfo.isLoggedIn]);

  const inputRef = useRef();

  const handleOtp = (event, index) => {
    const { value } = event.target;
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidOtp(otp)) return updateNotification("error", "Invalid OTP");
    else {
      const { type, response } = await verifyEmail({
        OTP: otp.join(""),
        userId: user.id,
      });
      if (type === "error") {
        updateNotification("error", response);
      } else {
        updateNotification("success", "You are now verified!");
        isAuth(response.accessToken);
      }
    }
  };

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={formModalClasses}>
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
                className="xs:w-10 xs:h-10 w-12 h-12 rounded text-center font-semibold dark:text-white text-primary text-xl border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary bg-transparent spin-button-none"
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

export const loader = () => {
  const token = localStorage.getItem("auth-token");
  if (token) {
    return redirect("/");
  }
  return null;
};
