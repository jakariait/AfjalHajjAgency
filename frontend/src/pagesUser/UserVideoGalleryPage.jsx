import React, {useEffect} from 'react';
import Layout from "../component/componentGeneral/Layout.jsx";
import VideoGallery from "../component/componentGeneral/VideoGallery.jsx";
import GeneralInfoStore from "../store/GeneralInfoStore.js";

const UserVideoGalleryPage = () => {

  const { GeneralInfoList } = GeneralInfoStore();

  useEffect(() => {
    if (GeneralInfoList?.CompanyName) {
      document.title = `Video Gallery | ${GeneralInfoList.CompanyName}`;
    } else {
      document.title = "Video Gallery";
    }
  }, [GeneralInfoList]);


  return (
    <Layout>
      <VideoGallery/>
    </Layout>
  );
};

export default UserVideoGalleryPage;