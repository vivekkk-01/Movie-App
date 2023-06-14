import React, { useState } from "react";
import TagsInput from "./TagsInput";
import LiveSearch from "./LiveSearch";
import Submit from "../Form/Submit";
import { useNotification } from "../../hooks";
import ModalContainer from "../modals/ModalContainer";
import WritersModal from "../modals/WritersModal";
import CastForm from "./CastForm";
import CastModal from "../modals/CastModal";
import SelectPoster from "./SelectPoster";
import GenresSelector from "./GenresSelector";
import GenresModal from "../modals/GenresModal";
import Selector from "./Selector";
import {
  languageOptions,
  statusOptions,
  typeOptions,
} from "../../utils/options";

const commonClasses = `dark:text-white text-primary dark:border-dark-subtle
border-light-subtle dark:focus:border-white focus:border-primary
transition outline-none w-full bg-transparent dark:bg-transparent`;

const results = [
  {
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "John Doe",
  },
  {
    id: "2",
    avatar:
      "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Chandri Anggara",
  },
  {
    id: "3",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "4",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
  {
    id: "5",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "6",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
];

const MovieForm = () => {
  const defaultMovieInfo = {
    title: "",
    storyLine: "",
    tags: [],
    cast: [],
    director: {},
    writers: [],
    releaseDate: "",
    poster: null,
    genres: [],
    type: "",
    status: "",
    langauge: "",
  };

  const [movieInfo, setMovieInfo] = useState(defaultMovieInfo);
  const [showWritersModal, setShowWritersModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState(null);
  const updateNotification = useNotification();
  const {
    title,
    storyLine,
    director,
    writers,
    cast,
    genres,
    type,
    status,
    langauge,
  } = movieInfo;

  const updatePoster = (poster) => {
    const url = URL.createObjectURL(poster);
    setSelectedPoster(url);
  };

  const handleChange = ({ target }) => {
    const { value, name, files } = target;
    if (name === "poster") {
      const poster = files[0];
      updatePoster(poster);
    }
    setMovieInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const updateTags = (tags) => {
    setMovieInfo((prev) => {
      return { ...prev, tags };
    });
  };

  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile });
  };

  const updateWriters = (profile) => {
    const { writers } = movieInfo;
    const isWriter = writers.find((writer) => writer.id === profile.id);
    if (isWriter)
      return updateNotification("warning", "This profile is already selected!");
    setMovieInfo((prev) => {
      return { ...prev, writers: [...writers, profile] };
    });
  };

  const updateCast = (castInfo) => {
    const { cast } = movieInfo;
    setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
  };

  const updateGenres = (genres) => {
    setMovieInfo({ ...movieInfo, genres });
  };

  const renderItem = (result) => {
    return (
      <div className="flex rounded overflow-hidden">
        <img src={result.avatar} alt="" className="w-16 h-16 object-cover" />
        <p className="dark:text-white font-semibold">{result.name}</p>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movieInfo);
  };

  const removeWriterHandler = (writerId) => {
    const { writers } = movieInfo;
    const newWriters = writers.filter((writer) => writer.id !== writerId);
    setMovieInfo((prev) => {
      return { ...prev, writers: newWriters };
    });
    if (writers.length === 1) return setShowWritersModal(false);
  };

  const removeCastHandler = (profileId) => {
    const { cast } = movieInfo;
    const newCast = cast.filter(({ profile }) => profile.id !== profileId);
    setMovieInfo((prev) => {
      return { ...prev, cast: newCast };
    });
    if (cast.length === 1) return setShowCastModal(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex space-x-3 py-2 xs:px-1 xs:flex-col-reverse xs:space-y-5 xs:space-x-0 xs:items-center"
      >
        <div className="xs:w-80 xs:mt-4 w-[70%] space-y-5">
          <div>
            <InputLabel htmlFor="title">Title</InputLabel>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
              className={
                commonClasses + "border border-b-2 font-semibold text-xl"
              }
              placeholder="Titanic"
            />
          </div>
          <div>
            <InputLabel htmlFor="storyLine">Story Line</InputLabel>
            <textarea
              id="storyLine"
              name="storyLine"
              value={storyLine}
              onChange={handleChange}
              className={
                commonClasses +
                "border border-b-2 font-semibold resize-none h-24"
              }
              placeholder="Movie story line..."
            ></textarea>
          </div>
          <div>
            <InputLabel htmlFor="tags">Tags</InputLabel>
            <TagsInput name="tags" onChange={updateTags} />
          </div>
          <div>
            <InputLabel htmlFor="director">Director</InputLabel>
            <LiveSearch
              name="director"
              results={results}
              placeholder="Search profile"
              renderItem={renderItem}
              onSelect={updateDirector}
              value={director.name}
            />
          </div>
          <div>
            <div className="flex justify-between">
              <LabelWithBadge badge={writers.length} htmlFor="writers">
                Writers
              </LabelWithBadge>
              <ViewAllBtn
                visible={writers.length}
                onClick={() => setShowWritersModal(true)}
              >
                View All
              </ViewAllBtn>
            </div>
            <LiveSearch
              name="writers"
              results={results}
              placeholder="Search profile"
              renderItem={renderItem}
              onSelect={updateWriters}
            />
          </div>
          <div>
            <div className="flex justify-between">
              <LabelWithBadge badge={cast.length} htmlFor="cast">
                Cast & Crew
              </LabelWithBadge>
              <ViewAllBtn
                visible={cast.length}
                onClick={() => setShowCastModal(true)}
              >
                View All
              </ViewAllBtn>
            </div>
            <CastForm onSubmit={updateCast} />
          </div>
          <input
            type="date"
            name="releaseDate"
            className={commonClasses + " w-auto border-2 rounded p-1"}
          />
          <Submit value="Upload" />
        </div>
        <div className="xs:w-80 w-[30%] space-y-4">
          <SelectPoster
            accept="image/jpg, image/jpeg, image/png"
            onChange={handleChange}
            name="poster"
            selectedPoster={selectedPoster}
          />
          <div className="hidden xs:flex xs:flex-col xs:space-y-4">
            <GenresSelector
              badge={genres.length}
              onClick={() => setShowGenresModal(true)}
            />
            <Selector
              name="type"
              value={type}
              options={typeOptions}
              label="Type"
              onChange={handleChange}
            />
            <Selector
              name="language"
              value={langauge}
              options={languageOptions}
              label="Language"
              onChange={handleChange}
            />
            <Selector
              name="status"
              value={status}
              options={statusOptions}
              label="Status"
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
      <WritersModal
        onRemoveClick={removeWriterHandler}
        profiles={writers}
        visible={showWritersModal}
        onClose={() => setShowWritersModal(false)}
      />
      <CastModal
        onRemoveClick={removeCastHandler}
        casts={cast}
        visible={showCastModal}
        onClose={() => setShowCastModal(false)}
      />
      <GenresModal
        genresSelected={genres}
        onSubmit={updateGenres}
        selected={true}
        visible={showGenresModal}
        onClose={() => setShowGenresModal(false)}
      />
    </>
  );
};

export default MovieForm;

const InputLabel = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="dark:text-dark-subtle text-light-subtle font-semibold"
  >
    {children}
  </label>
);

const LabelWithBadge = ({ children, htmlFor, badge }) => {
  return (
    <div className="relative">
      <InputLabel htmlFor={htmlFor}>{children}</InputLabel>
      {badge > 0 && (
        <span className="flex justify-center items-center p-2 w-5 h-5 -translate-y-3 translate-x-4 text-sm dark:bg-dark-subtle bg-light-subtle text-white rounded-full absolute top-0 right-0">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </div>
  );
};

const ViewAllBtn = ({ onClick, children, visible }) => {
  if (!visible) return;
  return (
    <button
      type="button"
      onClick={onClick}
      className="dark:text-white text-primary hover:underline transition"
    >
      {children}
    </button>
  );
};
