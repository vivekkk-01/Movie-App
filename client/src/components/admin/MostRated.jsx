import React, { useEffect, useState } from "react";
import { getMostRated } from "../../api/admin";
import { useNotification } from "../../hooks";
import Rating from "../user/Rating";

const MostRated = () => {
  const [movies, setMovies] = useState([]);
  const updateNotification = useNotification();

  useEffect(() => {
    (async () => {
      const { type, response } = await getMostRated();
      if (type === "error") return updateNotification(type, response);
      setMovies(response);
    })();
  }, []);

  return (
    <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        Most Rated
      </h1>
      <ul className="space-y-3">
        {movies
          ?.sort((a, b) => b.ratingAvg - a.ratingAvg)
          .map((movie) => (
            <li key={movie._id}>
              <h1 className="dark:text-white text-secondary font-semibold">
                {movie.title}
              </h1>
              <div className="flex gap-1">
                <Rating ratingAvg={movie.ratingAvg} />
                <p className="text-light-subtle dark:text-dark-subtle">
                  {movie.reviewCount} Reviews
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MostRated;
