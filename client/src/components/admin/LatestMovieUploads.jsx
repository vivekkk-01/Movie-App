import React from "react";
import MovieListItem from "./MovieListItem";

const LatestMovieUploads = () => {
  return (
    <div className="bg-white shadow dark:bg-secondary p-5 rounded col-span-2 xs:col-span-1">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        Recent Uploads
      </h1>
      <MovieListItem
        movie={{
          poster:
            "https://res.cloudinary.com/dq9eh29mi/image/upload/v1686893358/eizvsq58adfyb3z1wvtd.jpg",
          genres: ["Action", "Comedy"],
          title: "Lorem ipsum dolor sit amet.",
          status: "public",
        }}
      />
    </div>
  );
};

export default LatestMovieUploads;
