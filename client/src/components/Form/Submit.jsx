import React from "react";

const Submit = ({ value }) => {
  return (
    <input
      type="submit"
      value={value}
      className="w-full rounded dark:bg-white bg-secondary text-white dark:text-secondary hover:bg-opacity-70 transition font-semibold text-lg cursor-pointer p-1"
    />
  );
};

export default Submit;
