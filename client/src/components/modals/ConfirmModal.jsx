import React from "react";
import ModalContainer from "./ModalContainer";
import { ImSpinner3 } from "react-icons/im";

const ConfirmModal = ({
  visible,
  onCancel,
  onConfirm,
  title,
  subTitle,
  busy,
}) => {
  const commonBtnClass = "px-3 py-1 text-white rounded";
  return (
    <ModalContainer visible={visible} ignoreContainer={true}>
      <div className="dark:bg-primary bg-white rounded p-3">
        <h1 className="text-red-400 text-lg font-semibold">{title}</h1>
        <p className="text-secondary dark:text-white text-sm">{subTitle}</p>

        <div className="flex items-center space-x-3 mt-2 text-primary dark:text-white">
          {busy ? (
            <p className="flex items-center space-x-2">
              <ImSpinner3 className="animate-spin" />
              <span>Please wait</span>
            </p>
          ) : (
            <>
              <button
                disabled={busy}
                onClick={onConfirm}
                className={commonBtnClass + " bg-red-400"}
              >
                Confirm
              </button>
              <button
                disabled={busy}
                onClick={onCancel}
                className={commonBtnClass + " bg-blue-400"}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </ModalContainer>
  );
};

export default ConfirmModal;
