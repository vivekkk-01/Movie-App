import React, { useState } from "react";
import LiveSearch from "./LiveSearch";
import { useNotification } from "../../hooks";
import { searchActor } from "../../api/actor";
import { useSearch } from "../../hooks";

const commonClasses = `dark:text-white text-primary dark:border-dark-subtle
border-light-subtle dark:focus:border-white focus:border-primary
transition outline-none w-full bg-transparent dark:bg-transparent`;

const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};

const CastForm = ({ onSubmit }) => {
  const [castProfiles, setCastProfiles] = useState([]);
  const updateNotification = useNotification();
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
  const { leadActor, profile, roleAs } = castInfo;
  const { handleSearch, resetSearch } = useSearch();

  const renderItem = (result) => {
    return (
      <div className="flex rounded overflow-hidden">
        <img
          src={result?.avatar?.url}
          alt=""
          className="w-16 h-16 object-cover"
        />
        <p className="dark:text-white font-semibold">{result?.name}</p>
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
    setCastInfo({ ...defaultCastInfo, profile: { name: "" } });
    onSubmit(castInfo);
    resetSearch();
    setCastProfiles();
  };

  const handleProfileChange = ({ target }) => {
    const { value } = target;
    const { profile } = castInfo;
    profile?.name = value;
    setCastInfo({ ...castInfo, ...profile });
    handleSearch(searchActor, value, setCastProfiles);
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
        results={castProfiles}
        value={profile?.name}
        renderItem={renderItem}
        onSelect={handleOnSelect}
        onChange={handleProfileChange}
        visible={castProfiles?.length}
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
