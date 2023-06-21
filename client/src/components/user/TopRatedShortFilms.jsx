import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import MediaList from "./Media";

const TopRatedRatedShortFilms = () => {
  const [movies, setMovies] = useState([]);
  const updateNotification = useNotification();

  const fetchMovies = async (signal) => {
    const { type, response } = await getTopRatedMovies("Short Film", signal);
    if (type === "error") return updateNotification(type, response);
    setMovies([...response]);
  };

  console.log(movies, " MOVIES");

  useEffect(() => {
    const ac = new AbortController();

    fetchMovies(ac.signal);

    return () => {
      ac.abort();
    };
  }, []);

  return <MediaList movies={movies} title="Viewers' choice (Short Films)" />;
};

export default TopRatedRatedShortFilms;
