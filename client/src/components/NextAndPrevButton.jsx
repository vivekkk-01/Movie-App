import React from "react";

const NextAndPrevButton = ({
  onPrevClick,
  onNextClick,
  isStart,
  reachedToEnd,
}) => {
  return (
    <div className="flex justify-end items-center space-x-3 mt-5">
      {!isStart && <Button title="Prev" onClick={onPrevClick} />}
      {!reachedToEnd && <Button title="Next" onClick={onNextClick} />}
    </div>
  );
};

export default NextAndPrevButton;

export const Button = ({ title, onClick }) => {
  return (
    <button
      type="button"
      className="text-primary dark:text-white hover:underline"
      onClick={onClick}
    >
      {title}
    </button>
  );
};
