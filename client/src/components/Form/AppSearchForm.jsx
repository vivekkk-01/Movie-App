import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
const defaultStyle =
  " dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white";
const AppSearchForm = ({
  showResetIcon,
  placeholder,
  onSubmit,
  onReset,
  inputClassName = defaultStyle,
}) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value);
  };

  const handleReset = () => {
    setValue("");
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        className={
          "border-2 transition bg-transparent rounded text-lg p-1 outline-none " +
          defaultStyle
        }
        placeholder={placeholder}
        onChange={({ target }) => setValue(target.value)}
        value={value}
      />
      {showResetIcon && (
        <button
          onClick={handleReset}
          type="button"
          className=" absolute top-1/2 -translate-y-1/2 right-2 text-secondary dark:text-white"
        >
          <AiOutlineClose />
        </button>
      )}
    </form>
  );
};

export default AppSearchForm;
