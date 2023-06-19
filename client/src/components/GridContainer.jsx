import React from "react";

const GridContainer = ({ children, className }) => {
  return (
    <div
      className={
        "grid grid-cols-5 tab:grid-cols-2 xs:grid-cols-1 gap-3 " + className
      }
    >
      {children}
    </div>
  );
};

export default GridContainer;
