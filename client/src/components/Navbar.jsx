import { BsFillSunFill } from "react-icons/bs";
import Container from "./Container";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../hooks";
import AppSearchForm from "./Form/AppSearchForm";

const Navbar = () => {
  const { toggleTheme } = useTheme();
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;

  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <Container className="p-2">
        <div className="flex md:flex-row lg:flex-row justify-between items-center xs:flex-col">
          <img src="../../public/logo.png" alt="" className="h-10" />

          <ul className="flex items-center space-x-3">
            <li>
              <button
                onClick={toggleTheme}
                className="dark:bg-dark-subtle bg-white p-1 rounded"
              >
                <BsFillSunFill className="text-secondary" size={24} />
              </button>
            </li>
            <li>
              <AppSearchForm
                placeholder="Search"
                inputClassName="border-dark-subtle text-white focus:border-white"
              />
            </li>
            {isLoggedIn ? (
              <li
                onClick={handleLogout}
                className="text-white text-lg font-semibold xs:text-base"
              >
                <button>Log out</button>
              </li>
            ) : (
              <li className="text-white text-lg font-semibold xs:text-base">
                <Link to="/auth/login">Log In</Link>
              </li>
            )}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
