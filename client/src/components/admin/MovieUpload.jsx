import React, { useState } from "react";
import { useNotification } from "../../hooks";
import { createMovie, uploadTrailer } from "../../api/movie";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./Movie.css";
import MovieForm from "./MovieForm";
import ModalContainer from "../modals/ModalContainer";

const MovieUpload = ({ visible, onClose }) => {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [trailerInfo, setTrailerInfo] = useState({});
  const [progress, setProgress] = useState(0);

  const handleChange = async (file) => {
    setVideoSelected(true);
    const { type, response } = await uploadTrailer(file, setProgress);
    if (type === "error") return updateNotification(type, response);
    setVideoUploaded(true);
    setTrailerInfo({ url: response.secure_url, public_id: response.public_id });
  };

  const updateNotification = useNotification();

  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  const handleSubmit = async (data) => {
    if (!trailerInfo.url || !trailerInfo.public_id)
      return updateNotification("error", "Movie Trailer is missing!");
    setBusy(true);

    data.append("trailer", JSON.stringify(trailerInfo));

    const { type, response } = await createMovie(data);
    setBusy(false);
    if (type === "error") return updateNotification(type, response);
    onClose();
  };

  return (
    <ModalContainer
      visible={visible}
      // onClose={onClose}
      modalClassName="xs:overflow-x-hidden xs:w-[25rem] xs:h-[30rem]"
    >
      <div className="mb-5">
        <UploadProgress
          visible={!videoUploaded && videoSelected}
          width={progress}
          message={
            !videoUploaded && progress == 100
              ? "Processing Video"
              : `Upload Progress ${progress}%`
          }
        />
      </div>

      {!videoSelected ? (
        <TrailerSelector
          handleTypeError={handleTypeError}
          handleChange={handleChange}
          visible={!videoSelected}
        />
      ) : (
        <MovieForm onSubmit={handleSubmit} busy={busy} btnTitle="Upload" />
      )}
    </ModalContainer>
  );
};

const TrailerSelector = ({ handleChange, handleTypeError, visible }) => {
  if (!visible) return null;
  return (
    <div className="h-full flex items-center justify-center">
      <FileUploader
        handleChange={handleChange}
        types={["mp4", "avi"]}
        onTypeError={handleTypeError}
      >
        <div className="w-60 h-60 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex flex-col items-center justify-center dark:text-dark-subtle text-secondary cursor-pointer">
          <AiOutlineCloudUpload size={80} />
          <p>Drop movie trailer here!</p>
        </div>
      </FileUploader>
    </div>
  );
};

const UploadProgress = ({ visible, message, width }) => {
  if (!visible) return;
  return (
    <div className="dark:bg-secondary bg-white drop-shadow-lg rounded p-3">
      <div className="h-3 relative overflow-hidden dark:bg-dark-subtle bg-light-subtle">
        <div
          style={{ width: width + "%" }}
          className="h-full w-14 absolute left-0 dark:bg-white bg-secondary"
        />
      </div>
      <p className="animate-pulse font-semibold dark:text-dark-subtle text-light-subtle mt-1">
        {message}
      </p>
    </div>
  );
};
export default MovieUpload;
