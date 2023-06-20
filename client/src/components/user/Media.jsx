import React from "react";
import GridContainer from "../GridContainer";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const trimTitle = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "...";
};

const MediaList = ({ movies = [], title }) => {
  if (movies.length < 0) return;
  return (
    <div className="px-4 xs:px-2">
      <h1 className="my-2 text-2xl dark:text-white text-primary font-semibold">
        {title}
      </h1>
      <GridContainer>
        {movies.map((movie) => {
          return <ListItem key={movie._id} movie={movie} />;
        })}
      </GridContainer>
    </div>
  );
};

export default MediaList;

const ListItem = ({ movie }) => {
  const { _id, poster, title, ratingAvg } = movie;
  return (
    <Link to={`/media/${_id}`}>
      <img src={poster} alt={title} className="aspect-video object-cover" />
      <h1
        title={title}
        className="text-lg dark:text-white text-primary font-semibold"
      >
        {trimTitle(title)}
      </h1>
      <Rating ratingAvg={ratingAvg} />
    </Link>
  );
};
