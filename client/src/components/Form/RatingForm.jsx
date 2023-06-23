import React, { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Submit from "./Submit";

const ratings = new Array(10).fill("");

const RatingForm = ({ onSubmit, busy, initialState }) => {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [content, setContent] = useState("");

  const handleMouseEnter = (index) => {
    const ratings = new Array(index + 1).fill("");
    setSelectedRatings([...ratings]);
  };

  const handleChange = ({ target }) => {
    setContent(target.value);
  };

  const handleSubmit = () => {
    if (!selectedRatings.length) return;
    onSubmit({ content, rating: selectedRatings.length });
  };

  useEffect(() => {
    if (initialState) {
      setContent(initialState.content);
      setSelectedRatings(new Array(initialState.rating).fill(""));
    }
  }, [initialState]);

  return (
    <div className="dark:bg-primary bg-white p-5 rounded space-y-3">
      <div className="relative text-highlight-light dark:text-highlight-dark flex items-center">
        {ratings.map((_, index) => {
          return (
            <AiOutlineStar
              onMouseEnter={handleMouseEnter.bind(null, index)}
              className="cursor-pointer"
              key={index}
              size={24}
            />
          );
        })}
        <div className="flex items-center absolute top-1/2 -translate-y-1/2">
          {selectedRatings.map((_, index) => {
            return (
              <AiFillStar
                onMouseEnter={handleMouseEnter.bind(null, index)}
                className="cursor-pointer"
                key={index}
                size={24}
              />
            );
          })}
        </div>
      </div>
      <textarea
        value={content}
        onChange={handleChange}
        className="w-full h-24 border-2 p-2 dark:text-white text-primary rounded outline-none bg-transparent resize-none"
      ></textarea>
      <Submit busy={busy} onClick={handleSubmit} value="Rate" />
    </div>
  );
};

export default RatingForm;
