import React from "react";
import ModalContainer from "./ModalContainer";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const CastModal = ({ casts = [], visible, onClose, onRemoveClick }) => {
  return (
    <ModalContainer ignoreContainer={true} onClose={onClose} visible={visible}>
      <div className="space-y-2 p-2 dark:bg-primary bg-white rounded w-max-[45rem] h-max-[40rem] overflow-auto">
        {casts.map(({ leadActor, profile, roleAs }) => {
          const { _id, name, avatar } = profile;
          return (
            <div
              key={_id}
              className="flex space-x-2 items-center dark:bg-secondary bg-white drop-shadow-md rounded"
            >
              <img
                src={avatar.url}
                alt={name}
                className="w-16 h-16 rounded object-cover aspect-square"
              />
              <div className="flex flex-col w-full justify-between">
                <div>
                  <p className="font-semibold dark:text-white text-primary w-full">
                    {name}
                  </p>
                  <p className="text-sm dark:text-dark-subtle text-light-subtle w-full">
                    {roleAs}
                  </p>
                </div>
                {leadActor && (
                  <AiOutlineCheck className="text-light-subtle dark:text-dark-subtle" />
                )}
              </div>
              <button
                onClick={() => onRemoveClick(_id)}
                className="dark:text-white text-primary hover:opacity-80 transition p-2"
              >
                <AiOutlineClose />
              </button>
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
};

export default CastModal;
