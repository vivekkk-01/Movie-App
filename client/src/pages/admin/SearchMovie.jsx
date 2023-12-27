import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchMovieForAdmin } from "../../api/movie";
import { useNotification } from "../../hooks";
import MovieListItem from "../../components/admin/MovieListItem";

const SearchMovie = () => {
  const [movies, setMovies] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [searchParam] = useSearchParams();
  const query = searchParam.get("title");
  const updateNotification = useNotification();
  const navigate = useNavigate();

  const searchMovies = async (val) => {
    const { type, response } = await searchMovieForAdmin(val);
    if (type === "error") {
      setMovies([]);
      return updateNotification(type, response);
    }
    if (response.length < 0 || !response.length) return setNotFound(true);
    setNotFound(false);
    setMovies([...response]);
  };

  useEffect(() => {
    if (query.length === 0 || query.trim() === "")
      return navigate("/admin/movies");
    if (query.trim()) searchMovies(query.trim());
  }, [query]);

  return (
    <div className="p-5 space-y-3">
      {notFound && (
        <h1 className="font-semibold text-3xl opacity-50 py-5 text-secondary dark:text-white text-center">
          Movies Not Found!
        </h1>
      )}
      {movies?.length > 0 &&
        !notFound &&
        movies?.map((movie) => {
          return <MovieListItem movie={movie} key={movie._id} />;
        })}
    </div>
  );
};

export default SearchMovie;
