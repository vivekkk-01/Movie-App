import React, { useEffect, useState } from "react";
import MovieListItem from "../../components/admin/MovieListItem";
import { deleteMovie, getMovieData, getMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import NextAndPrevButton from "../../components/NextAndPrevButton";
import UpdateMovie from "../../components/admin/UpdateMovie";
import ConfirmModal from "../../components/modals/ConfirmModal";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [profileLimit, setProfileLimit] = useState(
    window.innerWidth < 470 ? 10 : window.innerWidth < 850 ? 15 : 20
  );
  const [isStart, setIsStart] = useState(true);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [showMovieEdit, setShowMovieEdit] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [busy, setBusy] = useState(false);
  const updateNotification = useNotification();

  const fetchMovies = async (pageNo, limit) => {
    const { type, response } = await getMovies(pageNo, limit);
    if (type === "error") return updateNotification(type, response);
    currentPage === 0 ? setIsStart(true) : setIsStart(false);
    setMovies([...response]);
    if (!response.length || response.length < profileLimit) {
      setReachedToEnd(true);
    } else {
      setReachedToEnd(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setProfileLimit(
        window.innerWidth < 470 ? 10 : window.innerWidth < 850 ? 15 : 20
      );
    };

    window.addEventListener("resize", handleResize);
  }, []);

  const handleClickNext = () => {
    if (reachedToEnd) return;
    setCurrentPage((prev) => {
      return (prev += 1);
    });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleClickPrev = () => {
    if (isStart) return;
    setCurrentPage((prev) => {
      return (prev -= 1);
    });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchMovies(currentPage, profileLimit);
  }, [currentPage, profileLimit]);

  const editMovieHandler = async (movie) => {
    const { type, response } = await getMovieData(movie._id);
    if (type === "error") return updateNotification(type, response);
    setSelectedMovie(response);
    setShowMovieEdit(true);
  };

  const handleUpdateMovie = (movie) => {
    const updatedMovies = movies.map((m) => {
      if (m._id === movie._id) return movie;
      return m;
    });
    setMovies([...updatedMovies]);
    setShowMovieEdit(false);
  };

  const deleteMovieHandler = (movie) => {
    setSelectedMovie(movie);
    setShowConfirmModal(true);
  };

  const movieDeletedConfirm = async () => {
    setBusy(true);
    const { type, response } = await deleteMovie(selectedMovie._id);
    setBusy(false);
    updateNotification(type, response);
    setShowConfirmModal(false);
    fetchMovies(currentPage, profileLimit);
  };

  return (
    <>
      <div className="space-y-3 p-5">
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
        <NextAndPrevButton
          onPrevClick={handleClickPrev}
          onNextClick={handleClickNext}
          reachedToEnd={reachedToEnd}
          isStart={isStart}
        />
      </div>
      <UpdateMovie
        visible={showMovieEdit}
        initialState={selectedMovie}
        onUpdate={handleUpdateMovie}
      />
      <ConfirmModal
        onCancel={() => setShowConfirmModal(false)}
        visible={showConfirmModal}
        onConfirm={movieDeletedConfirm}
        title="Are you sure?"
        subTitle="This action will remove the movie permanently."
        busy={busy}
      />
    </>
  );
};

export default Movies;
