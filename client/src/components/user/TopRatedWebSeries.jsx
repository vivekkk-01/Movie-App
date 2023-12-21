import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import MediaList from "./Media";

const TopRatedWebSeries = () => {
  const [movies, setMovies] = useState([]);
  const updateNotification = useNotification();

  const fetchMovies = async (signal) => {
    const { type, response } = await getTopRatedMovies("Web Series", signal);
    if (type === "error") return updateNotification(type, response);
    setMovies([...response]);
  };

  useEffect(() => {
    const ac = new AbortController();

    fetchMovies(ac.signal);

    return () => {
      ac.abort();
    };
  }, []);

  return (
    <MediaList
      movies={movies.sort((a, b) => b.ratingAvg - a.ratingAvg)}
      title="Viewers' choice (Web Series)"
    />
  );
};

export default TopRatedWebSeries;
