import client from "./client";

export const getAppInfo = async () => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get("admin/app-info", {
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
