import { BsFillSunFill } from "react-icons/bs";
import Container from "./Container";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks";

const Navbar = () => {
  const { toggleTheme } = useTheme();
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
              <input
                type="text"
                className="text-lg border-2 border-dark-subtle p-1 rounded bg-transparent focus:border-white transition text-white"
                placeholder="Search..."
              />
            </li>
            <li className="text-white text-lg font-semibold">
              <Link to="/auth/login">Log In</Link>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
