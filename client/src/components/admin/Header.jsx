import React, { useState } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { useTheme } from "../../hooks";
import AppSearchForm from "../Form/AppSearchForm";
import { useNavigate } from "react-router-dom";

const Header = ({ onAddMovieClick, onAddActorClick }) => {
  const [showOptions, setShowOptions] = useState(false);
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();

  const searchHandler = (value) => {
    navigate(`/admin/search?title=${value}`);
  };

  return (
    <div className="p-4 relative flex items-center justify-between">
      <AppSearchForm
        placeholder={"Search Movies..."}
        onSubmit={searchHandler}
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
          <div className="absolute right-2 top-16 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded animate-scale z-50">
            <button
              onClick={() => {
                onAddMovieClick();
                setShowOptions(false);
              }}
              className="dark:text-white text-secondary hover:opacity-80 transition"
            >
              Add Movie
            </button>
            <button
              onClick={() => {
                onAddActorClick();
                setShowOptions(false);
              }}
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
