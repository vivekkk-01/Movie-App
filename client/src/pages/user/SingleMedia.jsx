import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { getSingleMedia } from "../../api/movie";
import { useAuth, useNotification } from "../../hooks/index";
import Container from "../../components/Container";
import Rating from "../../components/user/Rating";
import RelatedMovies from "../../components/user/RelatedMovies";
import AddRatingModal from "../../components/user/AddRatingModal";
import ProfileModal from "../../components/modals/ProfileModal";

const SingleMedia = () => {
  const [media, setMedia] = useState(null);
  const [ready, setReady] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const { mediaId } = useParams();
  const updateNotification = useNotification();
  const { authInfo } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("auth-token");

  const fetchSingleMedia = async () => {
    const { type, response } = await getSingleMedia(mediaId);
    setReady(true);
    if (type === "error") return updateNotification(type, response);
    setMedia(response);
  };

  useEffect(() => {
    fetchSingleMedia();
  }, [mediaId]);

  const handleRate = () => {
    if (!isLoggedIn) {
      return navigate("/auth/login");
    }
    setShowRatingModal(true);
  };

  const handleReviewsSubmit = (reviews) => {
    setMedia({ ...media, reviews });
  };

  const handleProfileClick = (profileId) => {
    if (!isLoggedIn) return navigate("/auth/login");
    setSelectedProfileId(profileId);
    setShowProfile(true);
  };

  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className="text-2xl text-light-subtle dark:text-dark-subtle animate-pulse">
          Please Wait...
        </p>
      </div>
    );
  const {
    poster,
    title,
    trailer,
    reviews = [],
    type,
    storyLine,
    director,
    writers = [],
    cast = [],
    language,
    releaseDate,
    genres,
  } = media;
  return (
    <>
      <div className="dark:bg-primary bg-white min-h-screen pb-10">
        <Container className="w-4/5 mx-auto xs:w-screen px-4">
          <video
            poster={poster}
            controls
            src={trailer}
            className="object-cover"
          ></video>
          <div className="flex xs:gap-1 justify-between items-center xs:flex-col xs:items-start xs:my-2 xs:text-start">
            <h1 className="text-4xl text-highlight dark:text-highlight-dark font-semibold py-3 xs:text-2xl">
              {title}
            </h1>
            <div className="flex flex-col items-end xs:w-24 xs:items-start">
              <Link
                to={`/media/reviews/${mediaId}`}
                state={{ title }}
                className="text-highlight dark:text-highlight-dark hover:underline xs:text-xs"
              >
                {!reviews?.reviewCount ? null : reviews?.reviewCount}{" "}
                {reviews?.reviewCount == 1
                  ? "Review"
                  : !reviews?.reviewCount
                  ? null
                  : "Reviews"}
              </Link>
              <Rating ratingAvg={reviews?.ratingAvg} />
              <button
                onClick={handleRate}
                className="text-highlight dark:text-highlight-dark hover:underline xs:text-xs"
                type="button"
              >
                Rate this {type}
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-light-subtle dark:text-dark-subtle xs:text-sm">
              {storyLine}
            </p>

            <div className="flex items-center space-x-2">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold">
                Director:
              </p>
              <p
                onClick={handleProfileClick.bind(null, director.id)}
                className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer xs:text-sm"
              >
                {director?.name}
              </p>
            </div>

            <div className="flex items-center">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
                Writers:
              </p>
              {writers?.map((writer, index) => {
                return (
                  <div
                    onClick={handleProfileClick.bind(null, writer?.id)}
                    key={writer?.id}
                    className="flex"
                  >
                    <p className="mr-1 text-highlight dark:text-highlight-dark hover:underline cursor-pointer xs:text-sm">
                      {writers.length === index + 1
                        ? writer.name
                        : `${writer.name},`}
                    </p>
                  </div>
                );
              })}
            </div>

            {cast?.filter((c) => c.leadActor).length > 0 && (
              <div className="flex items-center">
                <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
                  Cast:
                </p>
                <div className="flex items-center space-x-1">
                  {cast?.map((c, index) => {
                    return (
                      c.leadActor && (
                        <p
                          onClick={handleProfileClick.bind(null, c.profile.id)}
                          key={c.profile.id}
                          className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer xs:text-sm"
                        >
                          {cast.filter((c) => !c.leadActor).length === index + 1
                            ? c.profile.name
                            : `${c.profile.name},`}
                        </p>
                      )
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex space-x-2 items-center">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold">
                Language:
              </p>
              <p className="text-highlight dark:text-highlight-dark xs:text-sm">
                {language}
              </p>
            </div>

            <div className="flex space-x-2 items-center">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold">
                Release Date:
              </p>
              <p className="text-highlight dark:text-highlight-dark xs:text-sm">
                {releaseDate?.split("T")[0]}
              </p>
            </div>

            <div className="flex items-center">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
                Genres:
              </p>
              <div className="flex space-x-1">
                {genres?.map((g, index) => {
                  return (
                    <p
                      key={g}
                      className="text-highlight dark:text-highlight-dark xs:text-sm"
                    >
                      {genres.length === index + 1 ? g : `${g},`}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="flex space-x-2 items-center">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold">
                Type:
              </p>
              <p className="text-highlight dark:text-highlight-dark xs:text-sm">
                {type}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2">
              Cast:
            </h1>
            <div className="grid grid-cols-8 gap-2 xs:grid-cols-2 xs:text-sm">
              {cast?.map((c) => {
                return (
                  <div
                    onClick={handleProfileClick.bind(null, c.profile.id)}
                    key={c.profile.id}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={c.profile.avatar}
                      className="h-24 w-24 aspect-square object-cover rounded-full"
                    />
                    <div className="flex flex-col items-center">
                      <p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
                        {c.profile.name}
                      </p>
                      <p className="text-light-subtle dark:text-dark-subtle">
                        {c.roleAs}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-3">
            <RelatedMovies mediaId={mediaId} type={type} />
          </div>
        </Container>
      </div>
      <AddRatingModal
        visible={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        mediaId={mediaId}
        onSubmit={handleReviewsSubmit}
      />
      <ProfileModal
        profileId={selectedProfileId}
        visible={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </>
  );
};

export default SingleMedia;
