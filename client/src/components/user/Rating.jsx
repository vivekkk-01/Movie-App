import { AiFillStar } from "react-icons/ai";

const Rating = ({ ratingAvg }) => {
  return (
    <>
      {ratingAvg ? (
        <p className="flex items-center space-x-1 text-highlight dark:text-highlight-dark xs:text-xs">
          <span>{ratingAvg}</span>
          <AiFillStar />
        </p>
      ) : (
        <p className="text-highlight dark:text-highlight-dark xs:text-xs">
          No Reviews
        </p>
      )}
    </>
  );
};

export default Rating;
