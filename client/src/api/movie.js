import client from "./client";

export const uploadTrailer = async (trailer, setProgress) => {
  const token = localStorage.getItem("auth-token");
  const formData = new FormData();
  formData.append("video", trailer);
  try {
    const { data } = await client.post("/movies/upload-trailer", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: ({ loaded, total }) => {
        setProgress(Math.floor((loaded / total) * 100));
      },
    });
    return { type: "success", response: data };
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.message
      ? error?.message
      : error?.data
      ? error?.data
      : "Something went wrong, please try again";
    return { type: "error", response: err };
  }
};

export const createMovie = async (movieData) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.post("/movies/create", movieData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { type: "success", response: data };
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.message
      ? error?.message
      : error?.data
      ? error?.data
      : "Something went wrong, please try again";
    return { type: "error", response: err };
  }
};

export const getMovies = async (pageNo, limit) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get(
      `/movies?pageNo=${pageNo}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { type: "success", response: data };
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.message
      ? error?.message
      : error?.data
      ? error?.data
      : "Something went wrong, please try again";
    return { type: "error", response: err };
  }
};

export const getMovieData = async (movieId) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get(`/movies/movie-data/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { type: "success", response: data };
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.message
      ? error?.message
      : error?.data
      ? error?.data
      : "Something went wrong, please try again";
    return { type: "error", response: err };
  }
};

export const updateMovie = async (movieId, formData) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.patch(`/movies/${movieId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { type: "success", response: data };
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.message
      ? error?.message
      : error?.data
      ? error?.data
      : "Something went wrong, please try again";
    return { type: "error", response: err };
  }
};

export const deleteMovie = async (movieId) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.delete(`/movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { type: "success", response: data };
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.message
      ? error?.message
      : error?.data
      ? error?.data
      : "Something went wrong, please try again";
    return { type: "error", response: err };
  }
};

export const searchMovieForAdmin = async (title) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get(`/movies/search?title=${title}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { type: "success", response: data };
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.message
      ? error?.message
      : error?.data
      ? error?.data
      : "Something went wrong, please try again";
    return { type: "error", response: err };
  }
};

export const getTopRatedMovies = async (type) => {
  let endpoint = "/movies/top-rated";
  if (type) endpoint += `?type=${type}`;
  try {
    const { data } = await client.get(endpoint);
    return { type: "success", response: data };
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.message
      ? error?.message
      : error?.data
      ? error?.data
      : "Something went wrong, please try again";
    return { type: "error", response: err };
  }
};

export const getLatestUploads = async () => {
  try {
    const { data } = await client.get("/movies/latest-uploads");
    return { type: "success", response: data };
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.message
      ? error?.message
      : error?.data
      ? error?.data
      : "Something went wrong, please try again";
    return { type: "error", response: err };
  }
};

export const getSingleMedia = async (movieId) => {
  try {
    const { data } = await client.get("/movies/single/" + movieId);
    return { type: "success", response: data };
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.message
      ? error?.message
      : error?.data
      ? error?.data
      : "Something went wrong, please try again";
    return { type: "error", response: err };
  }
};

export const getRelatedMedia = async (movieId) => {
  try {
    const { data } = await client.get("/movies/related/" + movieId);
    return { type: "success", response: data };
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.message
      ? error?.message
      : error?.data
      ? error?.data
      : "Something went wrong, please try again";
    return { type: "error", response: err };
  }
};

export const getSearchPublicMovies = async (title) => {
  try {
    const { data } = await client.get("/movies/search-public?title=" + title);
    return { type: "success", response: data };
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.message
      ? error?.message
      : error?.data
      ? error?.data
      : "Something went wrong, please try again";
    return { type: "error", response: err };
  }
};
