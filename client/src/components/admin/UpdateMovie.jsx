import React, { useState } from "react";
import ModalContainer from "../modals/ModalContainer";
import MovieForm from "./MovieForm";
import { updateMovie } from "../../api/movie";
import { useNotification } from "../../hooks";

const UpdateMovie = ({ visible, initialState, onUpdate }) => {
  const [busy, setBusy] = useState(false);
  const updateNotification = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { type, response } = await updateMovie(initialState._id, data);
    setBusy(false);
    if (type === "error") return updateNotification(type, response);
    updateNotification(type, "Movie Updated Successfully!");
    onUpdate(response);
  };

  return (
    <ModalContainer visible={visible}>
      <MovieForm
        btnTitle="Update"
        onSubmit={handleSubmit}
        busy={busy}
        initialState={initialState}
      />
    </ModalContainer>
  );
};

export default UpdateMovie;
