import React, { useState } from "react";
import LiveSearch from "./LiveSearch";
import { useNotification } from "../../hooks";

const commonClasses = `dark:text-white text-primary dark:border-dark-subtle
border-light-subtle dark:focus:border-white focus:border-primary
transition outline-none w-full bg-transparent dark:bg-transparent`;

const results = [
  {
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "John Doe",
  },
  {
    id: "2",
    avatar:
      "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Chandri Anggara",
  },
  {
    id: "3",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "4",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
  {
    id: "5",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "6",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
];

const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};

const CastForm = ({ onSubmit }) => {
  const updateNotification = useNotification();
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
  const { leadActor, profile, roleAs } = castInfo;

  const renderItem = (result) => {
    return (
      <div className="flex rounded overflow-hidden">
        <img src={result.avatar} alt="" className="w-16 h-16 object-cover" />
        <p className="dark:text-white font-semibold">{result.name}</p>
      </div>
    );
  };

  const handleChange = ({ target }) => {
    const { checked, name, value } = target;
    if (name === "leadActor") {
      return setCastInfo({ ...castInfo, leadActor: checked });
    }
    setCastInfo({ ...castInfo, [name]: value });
  };

  const handleOnSelect = (profile) => {
    setCastInfo({ ...castInfo, profile });
  };

  const handleSubmit = () => {
    if (!profile) return updateNotification("error", "Cast is missing!");
    if (!roleAs) return updateNotification("error", "Cast role is missing!");
    setCastInfo({ ...defaultCastInfo });
    onSubmit(castInfo);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="leadActor"
        className="w-4 h-4"
        title="Set as Lead Actor"
        checked={leadActor}
        onChange={handleChange}
      />
      <LiveSearch
        placeholder="Search Profile"
        results={results}
        value={profile.name}
        renderItem={renderItem}
        onSelect={handleOnSelect}
      />
      <span className="dark:text-dark-subtle text-light-subtle font-semibold">
        as
      </span>
      <div className="flex-grow">
        <input
          type="text"
          className={commonClasses + "rounded p-1 text-lg border-2"}
          placeholder="Role"
          name="roleAs"
          value={roleAs}
          onChange={handleChange}
        />
      </div>
      <button
        onClick={handleSubmit}
        type="button"
        className="bg-secondary dark:bg-white dark:text-primary text-white rounded px-1"
      >
        Add
      </button>
    </div>
  );
};

export default CastForm;
