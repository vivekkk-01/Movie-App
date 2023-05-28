import { Link } from "react-router-dom";

const CustomLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="cursor-pointer text-dark-subtle hover:text-white transition"
    >
      {children}
    </Link>
  );
};

export default CustomLink;
