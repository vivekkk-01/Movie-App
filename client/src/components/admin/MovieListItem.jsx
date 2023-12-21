import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";
import { getPoster } from "../../utils/helper";

const MovieListItem = ({ movie, onDelete, onEdit, onOpen }) => {
  const { poster, genres, title, status } = movie;
  return (
    <table className="w-full border-b">
      <tbody>
        <tr className="tab:flex tab:flex-col tab:items-center tab:justify-center  pb-2">
          <td className="tab:w-full">
            <div className="w-24 tab:w-full">
              <img
                className="w-full aspect-video"
                src={getPoster(poster.responsive) || poster.url}
                alt=""
              />
            </div>
          </td>

          <td className="w-full pl-5 tab:py-1 tab:px-0">
            <div>
              <h1 className="font-semibold text-lg text-primary dark:text-white">
                {title}
              </h1>
              <div className="space-x-1">
                {genres.map((genre, index) => {
                  return (
                    <span
                      key={genre + index}
                      className="text-xs text-primary dark:text-white"
                    >
                      {genres.length === index + 1 ? genre : `${genre},`}
                    </span>
                  );
                })}
              </div>
            </div>
          </td>

          <td className="px-5 tab:py-1 tab:px-0">
            <p className="text-primary dark:text-white">{status}</p>
          </td>

          <td>
            <div className="flex items-center space-x-3 text-primary dark:text-white text-lg tab:space-x-5">
              <button onClick={onDelete} type="button">
                <BsTrash />
              </button>
              <button onClick={onEdit} type="button">
                <BsPencilSquare />
              </button>
              <button onClick={onOpen} type="button">
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MovieListItem;
