import React, { useEffect, useState } from "react";
import ModalContainer from "./ModalContainer";
import genres from "../../utils/genres";
import Submit from "../Form/Submit";

const GenresModal = ({ visible, onClose, onSubmit, genresSelected }) => {
  const [selectedGenres, setSelectedGenres] = useState(genresSelected);

  useEffect(() => {
    setSelectedGenres(genresSelected);
  }, [genresSelected]);

  const selectGenresHandler = (gen) => {
    let newGenres = [];
    if (selectedGenres.includes(gen)) {
      newGenres = selectedGenres.filter((genre) => genre !== gen);
    } else {
      newGenres = [...selectedGenres, gen];
    }
    setSelectedGenres(newGenres);
  };

  const handleClose = () => {
    setSelectedGenres(genresSelected);
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(selectedGenres);
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={handleClose}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="font-semibold dark:text-white text-primary text-center text-2xl my-1">
            Select Genre
          </h1>
          <div className="space-y-3">
            {genres.map((genre) => {
              return (
                <Genre
                  selected={selectedGenres.includes(genre)}
                  onClick={selectGenresHandler.bind(null, genre)}
                  key={genre}
                >
                  {genre}
                </Genre>
              );
            })}
          </div>
        </div>
        <div className="w-56 self-end">
          <Submit value="Add" type="button" onClick={handleSubmit} />
        </div>
      </div>
    </ModalContainer>
  );
};

export default GenresModal;

const Genre = ({ children, selected, onClick }) => {
  const genreClasses = selected
    ? "dark:bg-white dark:text-primary bg-light-subtle text-white"
    : "dark:text-white text-primary";
  return (
    <button
      onClick={onClick}
      className={
        genreClasses +
        " border-2 dark:border-dark-subtle border-light-subtle p-1 rounded mr-3"
      }
    >
      {children}
    </button>
  );
};
