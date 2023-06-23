import React, { useState } from "react";
import ModalContainer from "../modals/ModalContainer";
import RatingForm from "../Form/RatingForm";
import { updateReview } from "../../api/review";
import { useNotification } from "../../hooks";

const EditRatingModal = ({ visible, onClose, onSubmit, initialState }) => {
  const [busy, setBusy] = useState(false);
  const updateNotification = useNotification();
  const handleSubmit = async (data) => {
    setBusy(true);
    const { type, response } = await updateReview(initialState._id, data);
    setBusy(false);
    if (type === "error") return updateNotification(type, response);
    updateNotification(type, response);
    onSubmit({ ...data, _id: initialState._id });
    onClose();
  };
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer={true}>
      <RatingForm
        onSubmit={handleSubmit}
        busy={busy}
        initialState={initialState}
      />
    </ModalContainer>
  );
};

export default EditRatingModal;
