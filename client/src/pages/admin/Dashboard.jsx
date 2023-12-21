import React, { useEffect, useState } from "react";
import MovieUpload from "../../components/admin/MovieUpload";
import LatestMovieUploads from "../../components/admin/LatestMovieUploads";
import { getAppInfo } from "../../api/admin";
import { useNotification } from "../../hooks";

const Dashboard = () => {
  const [appInfo, setAppInfo] = useState({
    movieCount: 0,
    reviewCount: 0,
    userCount: 0,
  });

  const updateNotification = useNotification();

  useEffect(() => {
    (async () => {
      const { type, response } = await getAppInfo();
      if (type === "error") return updateNotification(type, response);
      setAppInfo({ ...response });
    })();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 xs:grid-cols-1 xs:grid-rows-3 gap-5 my-5">
        <AppInfoBox
          title="Total Uploads"
          subTitle={appInfo.movieCount.toLocaleString()}
        />
        <AppInfoBox
          title="Total Reviews"
          subTitle={appInfo.reviewCount.toLocaleString()}
        />
        <AppInfoBox
          title="Total Users"
          subTitle={appInfo.userCount.toLocaleString()}
        />
        <LatestMovieUploads />
      </div>
    </>
  );
};

export default Dashboard;

const AppInfoBox = ({ title, subTitle }) => {
  return (
    <div className="bg-white shadow dark:bg-secondary p-5 rounded">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        {title}
      </h1>
      <p className="text-xl text-primary dark:text-white">{subTitle}</p>
    </div>
  );
};
