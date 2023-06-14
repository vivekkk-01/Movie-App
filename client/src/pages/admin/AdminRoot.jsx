import { useEffect } from "react";
import { useAuth } from "../../hooks";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Header from "../../components/admin/Header";

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

  const handleActorClick = () => {
    console.log("adding actor");
  };

  const handleMovieClick = () => {
    console.log("adding movie");
  };

  return (
    <div className="flex tab:block dark:bg-primary bg-white">
      <nav className="w-1/6 tab:w-screen xs:absolute">
        <AdminNavbar />
      </nav>
      <main className="w-11/12 tab:w-screen xs:pt-7 h-screen">
        <Header
          onAddActorClick={handleActorClick}
          onAddMovieClick={handleMovieClick}
        />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminRoot;
