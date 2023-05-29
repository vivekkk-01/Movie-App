import React from "react";

const FormInput = ({ placeholder, name, label, type, ...rest }) => {
  return (
    <div className="flex flex-col-reverse">
      <input
        name={name}
        type={type}
        className="bg-transparent rounded border-2 text-lg w-full border-light-subtle dark:border-dark-subtle dark:focus:border-white focus:border-primary dark:text-white peer transition p-1 my-2"
        placeholder={placeholder}
        id={name}
        {...rest}
      />
      <label
        className="dark:peer-focus:text-white peer-focus:text-primary dark:text-dark-subtle text-light-subtle transition text-semibold self-start"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
