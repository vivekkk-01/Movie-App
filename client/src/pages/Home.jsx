import React, { useEffect } from "react";
import Container from "../components/Container";
import { useAuth } from "../hooks";
import { Link, redirect, useNavigate } from "react-router-dom";
import TopRatedRatedShortFilms from "../components/user/TopRatedShortFilms";
import TopRatedRatedFilms from "../components/user/TopRatedFilms";
import TopRatedRatedTVSeries from "../components/user/TopRatedTVSeries";
import TopRatedWebSeries from "../components/user/TopRatedWebSeries";
import HeroSlider from "../components/user/HeroSlider";

const Home = () => {
  const { authInfo } = useAuth();
  const isVerified = authInfo?.profile?.isVerified;
  const isLoggedIn = localStorage.getItem("auth-token");
  const navigate = useNavigate();

  useEffect(() => {
    if (authInfo?.profile.role === "admin") {
      navigate("/admin");
    }
  }, [authInfo]);

  const handleVerification = () => {
    navigate("/auth/verification", {
      state: { user: authInfo, replace: true },
    });
  };

  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      {!isLoggedIn ? (
        <p className="w-screen text-lg text-center bg-blue-50 p-2">
          It looks like you aren't logged in,{" "}
          <Link
            to="/auth/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            click here to log in now.
          </Link>
        </p>
      ) : isLoggedIn && !isVerified ? (
        <p className="w-screen text-lg text-center bg-blue-50 p-2">
          It looks like you haven't verified account,{" "}
          <button
            onClick={handleVerification}
            className="text-blue-500 font-semibold hover:underline"
          >
            click here to verify your account.
          </button>
        </p>
      ) : null}
      <Container className="w-4/5 xs:w-screen">
        <HeroSlider />
        <div className="space-y-3 py-5">
          <TopRatedRatedFilms />
          <TopRatedRatedTVSeries />
          <TopRatedWebSeries />
          <TopRatedRatedShortFilms />
        </div>
      </Container>
    </div>
  );
};

export default Home;
