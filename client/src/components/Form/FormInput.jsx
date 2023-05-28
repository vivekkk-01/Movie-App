import React from "react";

const FormInput = ({ placeholder, name, label, type, ...rest }) => {
  return (
    <div className="flex flex-col-reverse">
      <input
        name={name}
        type={type}
        className="bg-transparent rounded border-2 text-lg w-full border-dark-subtle focus:border-white text-white peer transition p-1 my-2"
        placeholder={placeholder}
        id={name}
        {...rest}
      />
      <label
        className="peer-focus:text-white text-dark-subtle transition text-semibold self-start"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
