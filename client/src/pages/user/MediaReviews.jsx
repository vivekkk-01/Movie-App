import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Rating from "../../components/user/Rating";
import { deleteReview, getReviews } from "../../api/review";
import {
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import ConfirmModal from "../../components/modals/ConfirmModal";
import EditRatingModal from "../../components/user/EditRatingModal";

const MediaReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileOwnersReview, setProfileOwnersReview] = useState(null);
  const [busy, setBusy] = useState(false);
  const updateNotification = useNotification();
  const { state } = useLocation();
  const { mediaId } = useParams();
  const { authInfo } = useAuth();
  const isLoggedIn = localStorage.getItem("auth-token");
  const navigate = useNavigate();

  const fetchReviews = async () => {
    setLoading(true);
    const { type, response } = await getReviews(mediaId);
    if (type === "error") return updateNotification(type, response);
    setLoading(false);
    setReviews([...response]);
  };

  useEffect(() => {
    if (mediaId) fetchReviews();
  }, [mediaId]);

  useEffect(() => {
    if (!isLoggedIn) return navigate("/auth/login");
  }, []);

  const findReview = () => {
    if (profileOwnersReview) return setProfileOwnersReview(null);
    const review = reviews?.find((r) => r.owner._id === authInfo.profile.id);
    if (!review) return updateNotification("error", "You don't have a review.");
    setProfileOwnersReview(review);
  };

  const handleDeleteReview = async () => {
    setBusy(true);
    const { type, response } = await deleteReview(profileOwnersReview._id);
    setBusy(false);
    if (type === "error") return updateNotification(type, response);
    updateNotification(type, response);
    const updatedReviews = reviews?.filter(
      (r) => r._id !== profileOwnersReview._id
    );
    setReviews([...updatedReviews]);
    setProfileOwnersReview(null);
    setShowConfirmModal(false);
  };

  const handleUpdateReview = (data) => {
    if (profileOwnersReview)
      setProfileOwnersReview({
        ...profileOwnersReview,
        content: data.content,
        rating: data.rating,
      });
    const updatedReviews = reviews?.map((r) => {
      if (data?._id === r._id)
        return { ...r, content: data.content, rating: data.rating };
      return r;
    });
    setReviews([...updatedReviews]);
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className="text-2xl text-light-subtle dark:text-dark-subtle animate-pulse">
          Please Wait...
        </p>
      </div>
    );

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="w-4/5 mx-auto xs:w-screen px-4 py-8">
        {reviews?.length <= 0 && !loading && (
          <h1 className="font-semibold text-3xl text-secondary dark:text-white text-center opacity-80">
            Reviews Not Found!
          </h1>
        )}
        {reviews?.length > 0 && !loading && (
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-secondary dark:text-white">
              <span className="text-light-subtle dark:text-dark-subtle font-normal">
                Reviews for:{" "}
              </span>
              {state?.title}
            </h1>
            <p
              onClick={findReview}
              className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer"
            >
              {profileOwnersReview ? "Find All" : "Find my review"}
            </p>
          </div>
        )}
        {profileOwnersReview ? (
          <div className="mt-4">
            <ReviewCard review={profileOwnersReview} />
            <div className="flex items-center space-x-3 text-xl p-3 text-primary dark:text-white">
              <button onClick={() => setShowConfirmModal(true)} type="button">
                <BsTrash />
              </button>
              <button onClick={() => setShowEditModal(true)} type="button">
                <BsPencilSquare />
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {reviews?.map((review) => (
              <ReviewCard review={review} key={review._id} />
            ))}
          </div>
        )}
      </Container>
      <ConfirmModal
        visible={showConfirmModal}
        onConfirm={handleDeleteReview}
        onCancel={() => setShowConfirmModal(false)}
        title="Delete your review"
        subTitle="This action will remove your review permanently"
        busy={busy}
      />
      <EditRatingModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        initialState={profileOwnersReview}
        onSubmit={handleUpdateReview}
      />
    </div>
  );
};

export default MediaReviews;

const ReviewCard = ({ review }) => {
  if (!review) return null;
  const getNameInitial = (name = "") => {
    return name[0].toUpperCase();
  };
  const { owner, content, rating } = review;
  return (
    <div className="flex space-x-3">
      <div className="flex items-center justify-center h-14 w-14 rounded-full bg-light-subtle dark:bg-dark-subtle text-white select-none text-xl">
        {getNameInitial(owner.name)}
      </div>
      <div>
        <h1 className="font-semibold text-secondary dark:text-white text-lg">
          {owner.name}
        </h1>
        <Rating ratingAvg={rating} />
        <p className="text-light-subtle dark:text-dark-subtle">{content}</p>
      </div>
    </div>
  );
};

export const loader = () => {
  const token = localStorage.getItem("auth-token");
  if (!token) {
    return redirect("/auth/login");
  }
  return null;
};
