import React from "react";

const ModalContainer = ({
  visible,
  onClose,
  children,
  ignoreContainer,
  modalClassName,
}) => {
  if (!visible) return;

  const handleClose = ({ target }) => {
    if (target.id === "modal-container") onClose && onClose();
  };

  return (
    <div
      onClick={handleClose}
      id="modal-container"
      style={{}}
      className="fixed inset-0 dark:bg-white dark:bg-opacity-50 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
    >
      {ignoreContainer ? (
        children
      ) : (
        <div
          className={
            modalClassName +
            " p-2 dark:bg-primary bg-white rounded w-[45rem] h-[40rem] overflow-auto"
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ModalContainer;
