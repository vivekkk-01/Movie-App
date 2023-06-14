import React from "react";

const commonPosterUI =
  "flex cursor-pointer justify-center items-center border border-dashed rounded aspect-video dark:border-dark-subtle border-light-subtle";

const SelectPoster = ({ name, selectedPoster, accept, onChange }) => {
  return (
    <div>
      <input
        type="file"
        accept={accept}
        hidden
        id={name}
        name={name}
        onChange={onChange}
      />
      <label htmlFor={name}>
        {selectedPoster ? (
          <img
            className={commonPosterUI + " object-cover"}
            src={selectedPoster}
          />
        ) : (
          <PosterUI />
        )}
      </label>
    </div>
  );
};

export default SelectPoster;

const PosterUI = () => {
  return (
    <div className={commonPosterUI}>
      <span className="dark:text-dark-subtle text-light-subtle">
        Select Poster
      </span>
    </div>
  );
};
