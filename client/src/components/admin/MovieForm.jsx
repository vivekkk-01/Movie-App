import React, { useEffect, useState } from "react";
import TagsInput from "./TagsInput";
import LiveSearch from "./LiveSearch";
import Submit from "../Form/Submit";
import { useNotification, useSearch } from "../../hooks";
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
import { searchActor } from "../../api/actor";

const commonClasses = `dark:text-white text-primary dark:border-dark-subtle
border-light-subtle dark:focus:border-white focus:border-primary
transition outline-none w-full bg-transparent dark:bg-transparent`;

const validateMovie = (movieInfo) => {
  const {
    title,
    storyLine,
    language,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    poster,
  } = movieInfo;
  if (!title.trim()) return { error: "Title is missing" };
  if (!storyLine.trim()) return { error: "Story Line is missing!" };
  if (!language.trim()) return { error: "Language is missing!" };
  if (!releaseDate.trim()) return { error: "Release Date is missing!" };
  if (!status.trim()) return { error: "Status is missing!" };
  if (!type.trim()) return { error: "Type is missing!" };
  if (!genres.length) return { error: "Genres are missing!" };
  if (!cast.length) return { error: "Cast is missing!" };
  if (!tags.length) return { error: "Tags are missing!" };
  if (!poster) return { error: "Movie Poster is missing!" };
  return { error: null };
};

const MovieForm = ({ onSubmit, busy, initialState, btnTitle }) => {
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
    language: "",
  };

  const [movieInfo, setMovieInfo] = useState(defaultMovieInfo);
  const [showWritersModal, setShowWritersModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [writerName, setWriterName] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [writersProfile, setWritersProfile] = useState([]);
  const [directorsProfile, setDirectorsProfile] = useState([]);
  const updateNotification = useNotification();
  const { handleSearch, resetSearch } = useSearch();
  const { title, storyLine, writers, cast, genres, type, status, language } =
    movieInfo;

  const updatePoster = (poster) => {
    const url = URL.createObjectURL(poster);
    setSelectedPoster(url);
  };

  const handleChange = ({ target }) => {
    const { value, name, files } = target;
    if (name === "poster") {
      const poster = files[0];
      setMovieInfo((prev) => {
        return { ...prev, poster };
      });
      updatePoster(poster);
      return;
    }
    setMovieInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleProfileChange = ({ target }) => {
    const { value, name } = target;
    if (name === "writers") {
      setWriterName(value);
      handleSearch(searchActor, value, setWritersProfile);
    }
    if (name === "director") {
      setDirectorName(value);
      handleSearch(searchActor, value, setDirectorsProfile);
    }
  };

  const updateTags = (tags) => {
    setMovieInfo((prev) => {
      return { ...prev, tags };
    });
  };

  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile });
    resetSearch();
    setDirectorsProfile([]);
    setDirectorName(profile.name);
  };

  const updateWriters = (profile) => {
    setWriterName("");
    setWritersProfile([]);
    const { writers } = movieInfo;
    const isWriter = writers.find((writer) => writer._id === profile._id);
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
        <img
          src={result.avatar.url}
          alt=""
          className="w-16 h-16 object-cover"
        />
        <p className="dark:text-white font-semibold">{result.name}</p>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateMovie(movieInfo);
    if (error) return updateNotification("error", error);
    const { tags, genres, cast, writers, director } = movieInfo;
    const finalData = { ...movieInfo };
    finalData.tags = JSON.stringify(tags);
    finalData.genres = JSON.stringify(genres);

    const finalCast = cast.map((e) => {
      return {
        actor: e.profile._id,
        leadActor: e.leadActor,
        roleAs: e.roleAs,
      };
    });

    finalData.cast = JSON.stringify(finalCast);
    if (writers.length) {
      const finalWriters = writers.map((writer) => writer._id);
      finalData.writers = JSON.stringify(finalWriters);
    }

    if (director) {
      finalData.director = director._id;
    }
    if (initialState?.poster?.url === selectedPoster) {
      finalData.poster = JSON.stringify(movieInfo.poster);
    }
    const formData = new FormData();
    for (let key in finalData) {
      formData.append(key, finalData[key]);
    }
    onSubmit(formData);
  };

  const removeWriterHandler = (writerId) => {
    const { writers } = movieInfo;
    const newWriters = writers.filter((writer) => writer._id !== writerId);
    setMovieInfo((prev) => {
      return { ...prev, writers: newWriters };
    });
    if (writers.length === 1) return setShowWritersModal(false);
  };

  const removeCastHandler = (profileId) => {
    const { cast } = movieInfo;
    const newCast = cast.filter(({ profile }) => profile._id !== profileId);
    setMovieInfo((prev) => {
      return { ...prev, cast: newCast };
    });
    if (cast.length === 1) return setShowCastModal(false);
  };

  useEffect(() => {
    if (initialState) {
      setMovieInfo({
        ...initialState,
        releaseDate: initialState.releaseDate.split("T")[0],
      });
      setSelectedPoster(initialState.poster.url);
    }
  }, [initialState]);

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
            <TagsInput
              name="tags"
              onChange={updateTags}
              values={movieInfo?.tags}
            />
          </div>
          <div>
            <InputLabel htmlFor="director">Director</InputLabel>
            <LiveSearch
              name="director"
              results={directorsProfile}
              placeholder="Search profile"
              renderItem={renderItem}
              onSelect={updateDirector}
              value={movieInfo.director.name}
              onChange={handleProfileChange}
              visible={directorsProfile.length}
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
              results={writersProfile}
              placeholder="Search profile"
              renderItem={renderItem}
              onSelect={updateWriters}
              value={writerName}
              onChange={handleProfileChange}
              visible={writersProfile.length}
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
            onChange={handleChange}
            value={movieInfo.releaseDate}
          />
          <Submit
            busy={busy}
            value={btnTitle}
            type="button"
            onClick={handleSubmit}
          />
        </div>
        <div className="xs:w-80 w-[30%] space-y-4">
          <SelectPoster
            accept="image/jpg, image/jpeg, image/png"
            onChange={handleChange}
            name="poster"
            selectedPoster={selectedPoster}
          />
          <div className="xs:flex flex-col space-y-4">
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
              value={language}
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
