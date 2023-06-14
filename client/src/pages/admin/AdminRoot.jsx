import { useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Header from "../../components/admin/Header";
import MovieUpload from "../../components/admin/MovieUpload";
import ActorUpload from "../../components/admin/ActorUpload";

const AdminRoot = () => {
  const navigate = useNavigate();
  const { authInfo } = useAuth();
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
  const [showActorUploadModal, setShowActorUploadModal] = useState(false);

  useEffect(() => {
    if (!authInfo?.isLoggedIn) {
      navigate("/auth/login");
    } else if (authInfo?.profile?.role !== "admin") {
      navigate("/");
    }
  }, [authInfo]);

  const handleActorClick = () => {
    setShowActorUploadModal(true);
  };

  const handleMovieClick = () => {
    setShowMovieUploadModal(true);
  };

  return (
    <>
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
      <MovieUpload
        visible={showMovieUploadModal}
        onClose={() => setShowMovieUploadModal(false)}
      />
      <ActorUpload
        visible={showActorUploadModal}
        onClose={() => setShowActorUploadModal(false)}
      />
    </>
  );
};

export default AdminRoot;
