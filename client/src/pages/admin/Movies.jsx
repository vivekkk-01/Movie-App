import React, { useEffect, useState } from "react";
import MovieListItem from "../../components/admin/MovieListItem";
import { getMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import NextAndPrevButton from "../../components/NextAndPrevButton";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [profileLimit, setProfileLimit] = useState(
    window.innerWidth < 470 ? 10 : window.innerWidth < 850 ? 15 : 20
  );
  const [isStart, setIsStart] = useState(true);
  const [reachedToEnd, setReachedToEnd] = useState(false);
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

  return (
    <div className="space-y-3 p-5">
      {movies.map((movie) => {
        return <MovieListItem key={movie._id} movie={movie} />;
      })}
      <NextAndPrevButton
        onPrevClick={handleClickPrev}
        onNextClick={handleClickNext}
        reachedToEnd={reachedToEnd}
        isStart={isStart}
      />
    </div>
  );
};

export default Movies;
