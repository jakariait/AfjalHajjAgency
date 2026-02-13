import React, {useEffect} from 'react';
import Layout from "../component/componentGeneral/Layout.jsx";
import Gallery from "../component/componentGeneral/Gallery.jsx";
import GeneralInfoStore from "../store/GeneralInfoStore.js";

const UserImageGalleryPage = () => {
  const { GeneralInfoList } = GeneralInfoStore();

  useEffect(() => {
    if (GeneralInfoList?.CompanyName) {
      document.title = `Image Gallery | ${GeneralInfoList.CompanyName}`;
    } else {
      document.title = "Image Gallery";
    }
  }, [GeneralInfoList]);


  return (
    <Layout>
      <Gallery/>
    </Layout>
  );
};

export default UserImageGalleryPage;