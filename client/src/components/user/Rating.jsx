import { AiFillStar } from "react-icons/ai";

const Rating = ({ ratingAvg }) => {
  return (
    <>
      {ratingAvg ? (
        <p className="flex items-center space-x-1 text-highlight dark:text-highlight-dark">
          <span>{ratingAvg}</span>
          <AiFillStar />
        </p>
      ) : (
        <p className="text-highlight dark:text-highlight-dark">No Reviews</p>
      )}
    </>
  );
};

export default Rating;
