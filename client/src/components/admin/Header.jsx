import React, { useState } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { useTheme } from "../../hooks";

const Header = ({ onAddMovieClick, onAddActorClick }) => {
  const [showOptions, setShowOptions] = useState(false);
  const { toggleTheme } = useTheme();

  return (
    <div className="p-4 relative flex items-center justify-between">
      <input
        type="text"
        className="border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white transition bg-transparent rounded text-lg p-1 outline-none"
        placeholder="Search Movies..."
      />

      <div className="flex items-center space-x-3 xs:block">
        <button
          onClick={toggleTheme}
          className="dark:text-white text-light-subtle xs:absolute xs:-top-3 xs:right-3"
        >
          <BsFillSunFill size={24} />
        </button>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="flex items-center space-x-2 border-secondary dark:border-dark-subtle border-light-subtle hover:border-primary dark:text-dark-subtle text-light-subtle hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1"
        >
          <AiOutlinePlus />
          <span>Create</span>
        </button>

        {showOptions && (
          <div className="absolute right-2 top-16 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded animate-scale">
            <button
              onClick={onAddMovieClick}
              className="dark:text-white text-secondary hover:opacity-80 transition"
            >
              Add Movie
            </button>
            <button
              onClick={onAddActorClick}
              className="dark:text-white text-secondary hover:opacity-80 transition"
            >
              Add Actor
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
