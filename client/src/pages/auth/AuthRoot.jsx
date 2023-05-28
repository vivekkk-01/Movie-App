import React from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";

const AuthRoot = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AuthRoot;
