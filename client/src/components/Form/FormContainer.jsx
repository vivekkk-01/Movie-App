import React from "react";

const FormContainer = ({ children }) => {
  return (
    <div className="dark:bg-primary fixed inset-0 bg-white -z-10 flex justify-center items-center">
      {children}
    </div>
  );
};

export default FormContainer;
