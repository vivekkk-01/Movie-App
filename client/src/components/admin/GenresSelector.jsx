import React from "react";
import { ImTree } from "react-icons/im";

const GenresSelector = ({ onClick, badge }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="relative flex items-center space-x-2 p-1 border-2 dark:border-dark-subtle border-light-subtle dark:hover:border-white hover:border-primary transition dark:text-dark-subtle text-light-subtle dark:text-white text-primary py-1 px-3"
    >
      <ImTree />
      <span>Select Genres</span>
      {badge > 0 && (
        <span className="flex justify-center items-center p-2 w-5 h-5 -translate-y-3 translate-x-4 text-sm dark:bg-dark-subtle bg-light-subtle text-white rounded-full absolute -top-1 -right-2">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </button>
  );
};

export default GenresSelector;
