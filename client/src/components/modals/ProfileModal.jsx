import React, { useEffect, useState } from "react";
import ModalContainer from "./ModalContainer";
import { getSingleActor } from "../../api/actor";
import { useNotification } from "../../hooks";

const ProfileModal = ({ visible, onClose, profileId }) => {
  const [profile, setProfile] = useState({});
  const updateNotification = useNotification();

  const fetchProfile = async () => {
    const { type, response } = await getSingleActor(profileId);
    if (type === "error") return update(type, response);
    setProfile(response);
  };

  useEffect(() => {
    if (profileId) fetchProfile();
  }, [profileId]);

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer={true}>
      <div className="w-72 bg-white dark:bg-primary p-5 rounded flex flex-col items-center space-y-3">
        <img
          src={profile?.avatar?.url}
          className="w-28 h-28 rounded-full object-cover"
          alt=""
        />
        <h1 className="dark:text-white text-primary font-semibold">
          {profile?.name}
        </h1>
        <p className="text-light-subtle dark:text-dark-subtle">
          {profile?.about}
        </p>
      </div>
    </ModalContainer>
  );
};

export default ProfileModal;
