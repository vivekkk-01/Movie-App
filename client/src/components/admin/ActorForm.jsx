import React, { useEffect, useState } from "react";
import SelectPoster from "./SelectPoster";
import Selector from "./Selector";
import { useNotification } from "../../hooks";
import { ImSpinner3 } from "react-icons/im";

const commonClasses = `dark:text-white text-primary dark:border-dark-subtle
border-light-subtle dark:focus:border-white focus:border-primary
transition outline-none w-full bg-transparent dark:bg-transparent`;

const defaultActorInfo = {
  name: "",
  about: "",
  avatar: "",
  gender: "",
};

const validateActorInfo = ({ avatar, name, about, gender }) => {
  if (!name.trim()) return { error: "Actor name is missing!" };
  if (!about.trim()) return { error: "About section is missing!" };
  if (
    gender.trim() != "male" &&
    gender.trim() != "female" &&
    gender.trim() != "other"
  )
    return { error: "Gender is missing!" };
  if (avatar && !avatar.type.startsWith("image"))
    return { error: "Invalid image or Avatar file" };
  return { error: null };
};

const ActorForm = ({ title, btnTitle, onSubmit, busy, initialState }) => {
  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const updateNotification = useNotification();

  const updateAvatar = (avatar) => {
    const url = URL.createObjectURL(avatar);
    setSelectedAvatar(url);
  };

  const handleChange = ({ target }) => {
    const { name, value, files } = target;
    if (name === "avatar") {
      const avatar = files[0];
      setActorInfo({ ...actorInfo, avatar });
      return updateAvatar(avatar);
    }
    setActorInfo({ ...actorInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateActorInfo(actorInfo);
    if (error) return updateNotification("error", error);
    const formData = new FormData();
    for (let key in actorInfo) {
      formData.append(key, actorInfo[key]);
    }
    onSubmit(formData);
  };

  const options = [
    { title: "Male", value: "male" },
    { title: "Female", value: "female" },
    { title: "Other", value: "other" },
  ];

  useEffect(() => {
    if (initialState) {
      setActorInfo({ ...initialState, avatar: null });
      setSelectedAvatar(initialState.avatar.url);
    }
  }, [initialState]);

  return (
    <form
      onSubmit={handleSubmit}
      className="dark:bg-primary bg-white w-[35rem] p-3 rounded"
    >
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-semibold text-xl dark:text-white text-primary">
          {title}
        </h1>
        <button
          className="rounded h-8 w-24 flex items-center justify-center bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition"
          type="submit"
        >
          {busy ? <ImSpinner3 className="animate-spin" size="20" /> : btnTitle}
        </button>
      </div>
      {/* <img
          className="w-36 h-36 object-cover aspect-square rounded"
          src="https://www.lifeandstylemag.com/wp-content/uploads/2017/06/tom-cruise-secret-life.jpg?fit=200%2C1"
        /> */}
      <div className="flex space-x-2">
        <SelectPoster
          selectedPoster={selectedAvatar}
          onChange={handleChange}
          name="avatar"
          label="Select Avatar"
          accept="image/jpg, image/jpeg, image/png"
          className="w-36 h-36 object-cover aspect-square"
        />
        <div className="flex flex-col flex-grow space-y-2">
          <input
            name="name"
            onChange={handleChange}
            placeholder="Enter Name"
            type="text"
            className={commonClasses + " border border-b-2 p-1"}
            value={actorInfo?.name}
          />
          <textarea
            name="about"
            onChange={handleChange}
            placeholder="About"
            className={
              commonClasses + " h-full border border-b-2 resize-none p-1"
            }
            value={actorInfo?.about}
          ></textarea>
        </div>
      </div>
      <div className="mt-3">
        <Selector
          label="Gender"
          name="gender"
          value={actorInfo?.gender}
          onChange={handleChange}
          options={options}
        />
      </div>
    </form>
  );
};

export default ActorForm;
