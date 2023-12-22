import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { deleteActor, getActors, searchActor } from "../../api/actor";
import { useNotification, useSearch } from "../../hooks/index";
import NextAndPrevButton from "../../components/NextAndPrevButton";
import UpdateActor from "../../components/admin/UpdateActor";
import AppSearchForm from "../../components/Form/AppSearchForm";
import ConfirmModal from "../../components/modals/ConfirmModal";

const Actors = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [profileLimit, setProfileLimit] = useState(
    window.innerWidth < 470 ? 10 : window.innerWidth < 850 ? 15 : 20
  );
  const [isStart, setIsStart] = useState(true);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [results, setResults] = useState([]);
  const [showUpdateActor, setShowUpdateActor] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const updateNotification = useNotification();
  const { handleSearch, resetSearch, notFound } = useSearch();

  const fetchActors = async (pageNo, limit) => {
    const { type, response } = await getActors(pageNo, limit);
    if (type === "error") return updateNotification(type, response);
    currentPage === 0 ? setIsStart(true) : setIsStart(false);
    setProfiles([...response]);
    if (!response.length || response.length < profileLimit) {
      setReachedToEnd(true);
    } else {
      setReachedToEnd(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setProfileLimit(
        window.innerWidth < 470 ? 10 : window.innerWidth < 850 ? 15 : 20
      );
    };

    window.addEventListener("resize", handleResize);
  }, []);

  const handleClickNext = () => {
    if (reachedToEnd) return;
    setCurrentPage((prev) => {
      return (prev += 1);
    });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleClickPrev = () => {
    if (isStart) return;
    setCurrentPage((prev) => {
      return (prev -= 1);
    });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchActors(currentPage, profileLimit);
  }, [currentPage, profileLimit]);

  const handleEditActor = (profile) => {
    setShowUpdateActor(true);
    setSelectedProfile(profile);
  };

  const handleActorUpdate = (profile) => {
    const updatedActors = profiles?.map((actor) => {
      if (actor._id === profile?._id) {
        return profile;
      }
      return actor;
    });
    setProfiles([...updatedActors]);
  };

  const handleSearchActors = (value) => {
    handleSearch(searchActor, value, setResults);
  };

  const handleSearchReset = () => {
    resetSearch();
    setResults([]);
  };

  const deleteHandler = (profile) => {
    setSelectedProfile(profile);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirm = async () => {
    setBusy(true);
    const { type, response } = await deleteActor(selectedProfile._id);
    setBusy(false);
    fetchActors(currentPage, profileLimit);
    setShowConfirmModal(false);
    return updateNotification(type, response);
  };

  return (
    <>
      <div className="p-5">
        <div className="flex justify-end">
          <AppSearchForm
            placeholder="Search Actors..."
            onSubmit={handleSearchActors}
            showResetIcon={results.length > 0 || notFound}
            onReset={handleSearchReset}
          />
        </div>
        {notFound ? (
          <h1 className="font-semibold text-3xl opacity-50 py-5 text-secondary dark:text-white text-center">
            Actor Not Found!
          </h1>
        ) : (
          <div className="grid grid-cols-4 gap-3 my-5 mx-3 tab:gap-5 tab:grid-cols-3 xs:grid xs:grid-cols-1 xs:grid-rows-3">
            {results?.length > 0 &&
              results?.map((profile) => (
                <ActorProfile
                  key={profile._id}
                  profile={profile}
                  onEdit={handleEditActor.bind(null, profile)}
                  onDelete={deleteHandler.bind(null, profile)}
                />
              ))}
            {results?.length <= 0 &&
              profiles?.map((profile) => (
                <ActorProfile
                  key={profile._id}
                  profile={profile}
                  onEdit={handleEditActor.bind(null, profile)}
                  onDelete={deleteHandler.bind(null, profile)}
                />
              ))}
          </div>
        )}
        {results?.length <= 0 && !notFound && (
          <NextAndPrevButton
            onNextClick={handleClickNext}
            onPrevClick={handleClickPrev}
            isStart={isStart}
            reachedToEnd={reachedToEnd}
          />
        )}
      </div>
      <UpdateActor
        visible={showUpdateActor}
        onClose={() => setShowUpdateActor(false)}
        initialState={selectedProfile}
        onUpdate={handleActorUpdate}
      />
      <ConfirmModal
        visible={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        title="Are you sure?"
        subTitle="This action will remove this profile permanently."
        onConfirm={handleDeleteConfirm}
        busy={busy}
      />
    </>
  );
};

export default Actors;

const ActorProfile = ({ profile, onDelete, onEdit }) => {
  const [showOptions, setShowOptions] = useState(false);
  if (!profile) return null;
  const { name, about, avatar } = profile;
  return (
    <div className="bg-white shadow dark:bg-secondary p-2 rounded h-30 xs:h-72 overflow-hidden flex">
      <div
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
        className="flex cursor-pointer relative tab:flex-col tab:w-full"
      >
        <img
          src={avatar.url}
          alt=""
          className="w-24 aspect-square object-cover tab:aspect-auto tab:w-full tab:h-1/2 xs:h-2/3 xs:w-full xs:aspect-auto"
        />
        <div className="px-2 tab:px-0 tab:py-1 tab:h-1/2 xs:h-auto">
          <h1 className="text-xl text-primary dark:text-white font-semibold whitespace-nowrap">
            {name.length >= 16 ? name.substring(0, 16) + "..." : name}
          </h1>
          <p className="opacity-70 text-primary dark:text-white tab:hidden">
            {about.length >= 100 ? about.substring(0, 100) + "..." : about}
          </p>
          <p className="opacity-70 text-primary dark:text-white hidden tab:block xs:hidden">
            {about.length >= 150 ? about.substring(0, 150) + "..." : about}
          </p>
          <p className="opacity-70 text-primary dark:text-white hidden xs:block">
            {about.length >= 92 ? about.substring(0, 92) + "..." : about}
          </p>
        </div>
        {showOptions && (
          <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex items-center justify-center space-x-5">
            <button
              onClick={onDelete}
              className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition-all"
              type="button"
            >
              <BsTrash />
            </button>
            <button
              onClick={onEdit}
              className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition-all"
              type="button"
            >
              <BsPencilSquare />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
