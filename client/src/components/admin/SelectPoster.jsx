import React from "react";

const commonPosterUI =
  "flex cursor-pointer justify-center items-center border border-dashed rounded aspect-video dark:border-dark-subtle border-light-subtle";

const SelectPoster = ({
  name,
  selectedPoster,
  accept,
  onChange,
  className,
  label,
}) => {
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
            className={className + commonPosterUI + " object-cover"}
            src={selectedPoster}
          />
        ) : (
          <PosterUI label={label} className={className} />
        )}
      </label>
    </div>
  );
};

export default SelectPoster;

const PosterUI = ({ className, label }) => {
  return (
    <div className={className + " " + commonPosterUI}>
      <span className="dark:text-dark-subtle text-light-subtle">
        {label || "Select Poster"}
      </span>
    </div>
  );
};
