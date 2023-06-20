import React, { useState } from "react";
import ModalContainer from "../modals/ModalContainer";
import RatingForm from "../Form/RatingForm";
import { addReview } from "../../api/review";
import { useNotification } from "../../hooks";

const AddRatingModal = ({ visible, onClose, mediaId, onSubmit }) => {
  const [busy, setBusy] = useState(false);
  const updateNotification = useNotification();
  const handleSubmit = async (data) => {
    setBusy(true);
    const { type, response } = await addReview(mediaId, data);
    setBusy(false);
    if (type === "error") return updateNotification(type, response);
    updateNotification(type, response.message);
    onSubmit(response.reviews);
    onClose();
  };
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer={true}>
      <RatingForm onSubmit={handleSubmit} busy={busy} />
    </ModalContainer>
  );
};

export default AddRatingModal;
