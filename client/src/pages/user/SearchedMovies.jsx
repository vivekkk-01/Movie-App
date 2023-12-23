import React, { useEffect, useState } from "react";
import { getSearchPublicMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import MediaList from "../../components/user/Media";
import Container from "../../components/Container";
import { useSearchParams } from "react-router-dom";

const SearchedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [searchParam] = useSearchParams();
  const query = searchParam.get("title");
  const updateNotification = useNotification();

  const searchMovies = async (val) => {
    const { type, response } = await getSearchPublicMovies(val);
    if (type === "error") return updateNotification(type, response);
    if (response.length < 0 || !response.length) return setNotFound(true);
    setNotFound(false);
    setMovies([...response]);
  };

  useEffect(() => {
    if (query.trim()) searchMovies(query.trim());
  }, [query]);

  return (
    <div className="dark:bg-primary bg-white min-h-screen py-8">
      <Container className="w-4/5 xs:w-screen">
        {notFound && (
          <h1 className="font-semibold text-3xl opacity-50 py-5 text-secondary dark:text-white text-center">
            Movies Not Found!
          </h1>
        )}
        <MediaList movies={movies} />
      </Container>
    </div>
  );
};

export default SearchedMovies;
