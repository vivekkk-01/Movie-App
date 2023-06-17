import React from "react";
import MovieUpload from "../../components/admin/MovieUpload";
import LatestMovieUploads from "../../components/admin/LatestMovieUploads";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-3 xs:grid-cols-1 xs:grid-rows-3 gap-5 my-5">
        <AppInfoBox title="Total Uploads" subTitle={100} />
        <AppInfoBox title="Total Reviews" subTitle={"1,500"} />
        <AppInfoBox title="Total Users" subTitle={200} />
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
