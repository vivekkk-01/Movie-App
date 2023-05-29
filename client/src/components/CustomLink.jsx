import { Link } from "react-router-dom";

const CustomLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="cursor-pointer text-light-subtle hover:text-primary dark:text-dark-subtle dark:hover:text-white transition"
    >
      {children}
    </Link>
  );
};

export default CustomLink;
