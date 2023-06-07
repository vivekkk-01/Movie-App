import React, { useEffect } from "react";
import Container from "../components/Container";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { authInfo } = useAuth();
  const isVerified = authInfo?.profile?.isVerified;
  const { isLoggedIn } = authInfo;
  const navigate = useNavigate();

  useEffect(() => {
    if (!authInfo?.isLoggedIn) {
      navigate("/auth/login");
    } else if (authInfo?.profile.role === "admin") {
      navigate("/admin");
    }
  }, [authInfo]);

  const handleVerification = () => {
    navigate("/auth/verification", {
      state: { user: authInfo, replace: true },
    });
  };

  return (
    <Container>
      {isLoggedIn && !isVerified ? (
        <p className="text-lg text-center bg-blue-50 p-2">
          It looks like you haven't verified account,{" "}
          <button
            onClick={handleVerification}
            className="text-blue-500 font-semibold hover:underline"
          >
            click here to verify your account.
          </button>
        </p>
      ) : null}
    </Container>
  );
};

export default Home;
