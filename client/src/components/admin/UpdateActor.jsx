import React, { useState } from "react";
import { useNotification } from "../../hooks";
import ModalContainer from "../modals/ModalContainer";
import ActorForm from "./ActorForm";
import { updateActor } from "../../api/actor";

const UpdateActor = ({ visible, onClose, initialState, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const updateNotification = useNotification();

  const handleSubmit = async (data) => {
    setLoading(true);
    const { type, response } = await updateActor(initialState._id, data);
    setLoading(false);
    if (type === "error") return updateNotification(type, response);
    onUpdate(response);
    updateNotification("success", "Actor Updated Successfully!");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer={true}>
      <ActorForm
        busy={loading}
        btnTitle="Update"
        title="Update Actor"
        onSubmit={loading ? null : handleSubmit}
        initialState={initialState}
      />
    </ModalContainer>
  );
};

export default UpdateActor;
