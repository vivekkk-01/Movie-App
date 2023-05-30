import { ImSpinner3 } from "react-icons/im";

const Submit = ({ value, busy }) => {
  return (
    <button
      disabled={busy}
      type="submit"
      value={value}
      className="w-full rounded dark:bg-white bg-secondary text-white dark:text-secondary hover:bg-opacity-70 transition font-semibold text-lg cursor-pointer h-10 flex justify-center items-center"
    >
      {busy ? <ImSpinner3 className="animate-spin" size="20" /> : value}
    </button>
  );
};

export default Submit;
