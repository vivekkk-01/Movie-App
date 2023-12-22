import React, { useEffect, useState } from "react";
import MovieListItem from "./MovieListItem";
import { deleteMovie, getMovieData, getMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import ConfirmModal from "../modals/ConfirmModal";
import UpdateMovie from "./UpdateMovie";

const LatestMovieUploads = () => {
  const [movies, setMovies] = useState([]);
  const updateNotification = useNotification();
  const [showUpdateMovie, setShowUpdateMovie] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [busy, setBusy] = useState(false);

  const fetchMovies = async (pageNo, limit, signal) => {
    const { type, response } = await getMovies(pageNo, limit, signal);
    if (type === "error") return updateNotification(type, response);
    setMovies([...response]);
  };

  useEffect(() => {
    const ac = new AbortController();
    fetchMovies(0, 5, ac.signal);

    return () => {
      ac.abort();
    };
  }, []);

  const editMovieHandler = async (movie) => {
    const { type, response } = await getMovieData(movie._id);
    if (type === "error") return updateNotification(type, response);
    setSelectedMovie(response);
    setShowUpdateMovie(true);
  };

  const updateMovieHandler = async (movie) => {
    const updatedMovies = movies?.map((m) => {
      if (m._id === movie._id) return movie;
      return m;
    });
    setMovies([...updatedMovies]);
    setShowUpdateMovie(false);
  };

  const deleteMovieHandler = async (movie) => {
    setSelectedMovie(movie);
    setShowConfirmModal(true);
  };

  const confirmDeleteHandler = async () => {
    setBusy(true);
    const { type, response } = await deleteMovie(selectedMovie._id);
    setBusy(false);
    updateNotification(type, response);
    setShowConfirmModal(false);
    fetchMovies(0, 5);
  };

  return (
    <>
      <div className="bg-white shadow dark:bg-secondary p-5 rounded col-span-2 xs:col-span-1">
        <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
          Recent Uploads
        </h1>
        <div className="space-y-3">
          {movies?.map((movie) => {
            return (
              <MovieListItem
                key={movie._id}
                movie={movie}
                onEdit={editMovieHandler.bind(null, movie)}
                onDelete={deleteMovieHandler.bind(null, movie)}
              />
            );
          })}
        </div>
      </div>
      <UpdateMovie
        visible={showUpdateMovie}
        initialState={selectedMovie}
        onUpdate={updateMovieHandler}
      />
      <ConfirmModal
        visible={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        title="Are you sure?"
        subTitle="This action will remove this movie permanently."
        onConfirm={confirmDeleteHandler}
        busy={busy}
      />
    </>
  );
};

export default LatestMovieUploads;
