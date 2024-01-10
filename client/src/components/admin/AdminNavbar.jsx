import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { FaUserNinja } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../hooks";

const AdminNavbar = () => {
  const [showNav, setShowNav] = useState(false);
  const { handleLogout } = useAuth();
  return (
    <>
      {!showNav && (
        <button
          onClick={() => setShowNav(true)}
          className="mr-3 hidden fixed xs:block text-2xl font-semibold top-3 left-3 cursor-pointer dark:text-gray-300 z-40"
        >
          <GiHamburgerMenu />
        </button>
      )}
      <div
        className={`${
          showNav ? "xs:block" : "xs:hidden"
        } xs:h-screen xs:w-2/5 xs:fixed xs:left-0 xs:top-0 xs:pl-2 tab:h-16 tab:mr-0 tab:flex tab:justify-between tab:items-center mr-2 sticky top-0 h-screen  bg-secondary border-r border-gray-400 z-40`}
      >
        <button
          onClick={() => setShowNav(false)}
          className="hidden xs:block text-white text-2xl font-bold absolute top-3 left-3 cursor-pointer"
        >
          <RxCross2 />
        </button>
        <div className="p-2 xs:pt-11 xs:pb-4">
          <Link to="/admin">
            <img src="/public/logo.png" alt="" className="h-14 p-2" />
          </Link>
        </div>
        <ul className="pl-5 tab:flex tab:p-0 xs:block">
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                (isActive ? "text-white" : "text-gray-400") +
                " flex items-center text-lg space-x-2 p-2 hover:opacity-80 transition-all"
              }
              end
            >
              <AiOutlineHome />
              <span>Home</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/movies"
              className={({ isActive }) =>
                (isActive ? "text-white" : "text-gray-400") +
                " flex items-center text-lg space-x-2 p-2 hover:opacity-80 transition"
              }
              end
            >
              <BiMoviePlay />
              <span>Movies</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/actors"
              className={({ isActive }) =>
                (isActive ? "text-white" : "text-gray-400") +
                " flex items-center text-lg space-x-2 p-2 hover:opacity-80 transition"
              }
              end
            >
              <FaUserNinja />
              <span>Actors</span>
            </NavLink>
          </li>
        </ul>

        <div className="xs:absolute xs:bottom-5 absolute bottom-5 tab:static p-3 flex flex-col items-start">
          <span className="font-semibold text-white text-xl">Admin</span>
          <button
            onClick={handleLogout}
            className="flex space-x-1 items-center text-dark-subtle text-sm hover:text-white transition-all"
          >
            <FiLogOut />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
