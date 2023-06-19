import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import MediaList from "./Media";

const TopRatedRatedTVSeries = () => {
  const [movies, setMovies] = useState([]);
  const updateNotification = useNotification();

  const fetchMovies = async () => {
    const { type, response } = await getTopRatedMovies("TV Series");
    if (type === "error") return updateNotification(type, response);
    setMovies([...response]);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return <MediaList movies={movies} title="Viewers' choice (TV Series)" />;
};

export default TopRatedRatedTVSeries;
