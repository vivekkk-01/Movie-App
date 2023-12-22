import React, { useEffect, useState } from "react";
import { getRelatedMedia } from "../../api/movie";
import { useNotification } from "../../hooks";
import MediaList from "./Media";

const RelatedMovies = ({ mediaId, type }) => {
  const [movies, setMovies] = useState([]);
  const updateNotification = useNotification();

  const fetchMovies = async () => {
    const { type, response } = await getRelatedMedia(mediaId);
    if (type === "error") return updateNotification(type, response);
    setMovies([...response]);
  };

  useEffect(() => {
    fetchMovies();
  }, [mediaId]);

  if (movies?.length > 0)
    return <MediaList movies={movies} title={`Related ${type}s`} />;
};

export default RelatedMovies;
