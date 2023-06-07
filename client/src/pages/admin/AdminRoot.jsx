import { useEffect } from "react";
import { useAuth } from "../../hooks";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/Form/AdminNavbar";

const AdminRoot = () => {
  const navigate = useNavigate();
  const { authInfo } = useAuth();

  useEffect(() => {
    if (!authInfo?.isLoggedIn) {
      navigate("/auth/login");
    } else if (authInfo?.profile?.role !== "admin") {
      navigate("/");
    }
  }, [authInfo]);

  return (
    <div className="flex tab:block">
      <nav className="w-1/6 tab:w-screen xs:absolute">
        <AdminNavbar />
      </nav>
      <main className="w-11/12 tab:w-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminRoot;
