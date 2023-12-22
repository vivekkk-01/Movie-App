import React, { useEffect, useState, useRef } from "react";
import { getLatestUploads } from "../../api/movie";
import { useNotification } from "../../hooks";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

let count = 0;
let intervalId;
let newTime = 0;
let lastTime = 0;
const HeroSlider = () => {
  const updateNotification = useNotification();
  const [slide, setSlide] = useState({});
  const [clonedSlide, setClonedSlide] = useState({});
  const [slides, setSlides] = useState([]);
  const [upNext, setUpNext] = useState([]);
  const [visible, setVisible] = useState(true);
  const slideRef = useRef();
  const clonedSlideRef = useRef();
  const navigate = useNavigate();

  const fetchMovies = async (signal) => {
    const { type, response } = await getLatestUploads(signal);
    if (type === "error") return updateNotification(type, response);

    setSlides([...response]);
    setSlide(response[0]);
  };

  const startSlideShow = () => {
    intervalId = setInterval(() => {
      newTime = Date.now();
      const delta = newTime - lastTime;
      if (delta < 4000) return clearInterval(intervalId);
      nextClickHandler();
    }, 3500);
  };

  const pauseSlideShow = () => {
    clearInterval(intervalId);
  };

  const nextClickHandler = () => {
    lastTime = Date.now();
    pauseSlideShow();
    clonedSlideRef?.current?.classList.remove("opacity-0");
    setClonedSlide(slides[count]);
    count = (count + 1) % slides.length;
    setSlide(slides[count]);

    clonedSlideRef?.current?.classList.add("slide-out-to-left");
    slideRef.current?.classList.add("slide-in-from-right");
    updateUpNext(count);
  };

  const prevClickHandler = () => {
    pauseSlideShow();
    clonedSlideRef?.current?.classList.remove("opacity-0");
    setClonedSlide(slides[count]);
    count = (count + slides.length - 1) % slides.length;
    setSlide(slides[count]);

    clonedSlideRef?.current?.classList.add("slide-out-to-right");
    slideRef.current?.classList.add("slide-in-from-left");
    updateUpNext(count);
  };

  const handleAnimationEnd = () => {
    const classes = [
      "slide-out-to-left",
      "slide-in-from-right",
      "slide-out-to-right",
      "slide-in-from-left",
    ];
    slideRef.current?.classList.remove(...classes);
    clonedSlideRef?.current?.classList.remove(...classes);
    clonedSlideRef?.current?.classList.add("opacity-0");
    startSlideShow();
  };

  const updateUpNext = (currentIndex) => {
    if (!slides.length) return;
    const upNextCount = currentIndex + 1;
    const end = upNextCount + 3;
    let newSlides = [...slides];
    newSlides = newSlides.slice(upNextCount, end);

    if (newSlides.length <= 0) {
      newSlides = [...slides].slice(0, 3);
    }

    setUpNext([...newSlides]);
  };

  const handleVisibility = () => {
    if (document.visibilityState === "visible") {
      setVisible(true);
    } else setVisible(false);
  };

  useEffect(() => {
    startSlideShow();
    updateUpNext(count);
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    fetchMovies(ac.signal);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      pauseSlideShow();
      document.removeEventListener("visibilitychange", handleVisibility);
      ac.abort();
    };
  }, []);

  useEffect(() => {
    if (slides.length && visible) {
      startSlideShow();
      updateUpNext(count);
    } else {
      pauseSlideShow();
    }
  }, [slides?.length, visible]);

  return (
    <div className="flex w-full">
      <div className="w-4/5 xs:w-full aspect-video relative overflow-hidden">
        <Link to={`/media/${slide?.id}`} className="w-full cursor-pointer block">
          <img
            onClick={() => navigate(`/media/${slide?.id}`)}
            ref={slideRef}
            src={slide?.poster}
            alt=""
            className="aspect-video object-cover cursor-pointer"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-gray-200 via-transparent dark:from-primary dark:via-transparent">
            <h1 className="font-semibold text-4xl dark:text-highlight-dark text-highlight">
              {slide?.title}
            </h1>
          </div>
        </Link>
        <img
          onClick={() => navigate(`/media/${slide?.id}`)}
          onAnimationEnd={handleAnimationEnd}
          ref={clonedSlideRef}
          src={clonedSlide?.poster}
          alt=""
          className="aspect-video object-cover absolute inset-0 cursor-pointer"
        />
        <SlideShowController
          onNextClick={nextClickHandler}
          onPrevClick={prevClickHandler}
        />
      </div>
      <div className="w-1/5 xs:hidden space-y-3 px-3">
        <h1 className="font-semibold text-2xl tab:text-lg text-primary dark:text-white">
          Up Next
        </h1>
        {upNext.map(({ poster, id }) => {
          if (id === slide?.id) return;
          return (
            <img
              src={poster}
              key={id}
              className="aspect-video rounded object-cover"
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeroSlider;

const SlideShowController = ({ onNextClick, onPrevClick }) => {
  const btnClass =
    "bg-primary rounded border-2 text-white text-xl p-2 outline-none";
  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between px-2">
      <button onClick={onPrevClick} className={btnClass} type="button">
        <AiOutlineDoubleLeft />
      </button>
      <button onClick={onNextClick} className={btnClass} type="button">
        <AiOutlineDoubleRight />
      </button>
    </div>
  );
};
