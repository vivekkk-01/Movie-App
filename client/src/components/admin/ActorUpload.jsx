import React, { useState } from "react";
import ModalContainer from "../modals/ModalContainer";
import ActorForm from "./ActorForm";
import { createActor } from "../../api/actor";
import { useNotification } from "../../hooks";

const ActorUpload = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const updateNotification = useNotification();
  
  const handleSubmit = async (data) => {
    setLoading(true);
    const { type, response } = await createActor(data);
    setLoading(false);
    if (type === "error") return updateNotification(type, response);
    updateNotification("success", "Actor Created Successfully!");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer={true}>
      <ActorForm
        busy={loading}
        btnTitle="Create"
        title="Create New Actor"
        onSubmit={loading ? null : handleSubmit}
      />
    </ModalContainer>
  );
};

export default ActorUpload;
