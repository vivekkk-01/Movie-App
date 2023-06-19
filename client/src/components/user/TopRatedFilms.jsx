import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import MediaList from "./Media";

const TopRatedRatedFilms = () => {
  const [movies, setMovies] = useState([]);
  const updateNotification = useNotification();

  const fetchMovies = async () => {
    const { type, response } = await getTopRatedMovies("Film");
    if (type === "error") return updateNotification(type, response);
    setMovies([...response]);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return <MediaList movies={movies} title="Viewers' choice (Films)" />;
};

export default TopRatedRatedFilms;
