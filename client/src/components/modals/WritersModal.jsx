import React from "react";
import ModalContainer from "./ModalContainer";
import { AiOutlineClose } from "react-icons/ai";

const WritersModal = ({ profiles = [], visible, onClose, onRemoveClick }) => {
  return (
    <ModalContainer ignoreContainer={true} onClose={onClose} visible={visible}>
      <div className="space-y-2 p-2 dark:bg-primary bg-white rounded w-max-[45rem] h-max-[40rem] overflow-auto">
        {profiles.map(({ id, avatar, name }) => (
          <div
            key={id}
            className="flex space-x-2 items-center dark:bg-secondary bg-white drop-shadow-md rounded"
          >
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded object-cover aspect-square"
            />
            <p className="font-semibold dark:text-white text-primary w-full">
              {name}
            </p>
            <button
              onClick={() => onRemoveClick(id)}
              className="dark:text-white text-primary hover:opacity-80 transition p-2"
            >
              <AiOutlineClose />
            </button>
          </div>
        ))}
      </div>
    </ModalContainer>
  );
};

export default WritersModal;
