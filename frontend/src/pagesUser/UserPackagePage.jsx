import React, {useEffect} from 'react';
import Packages from "../component/componentGeneral/Package.jsx";
import Layout from "../component/componentGeneral/Layout.jsx";
import GeneralInfoStore from "../store/GeneralInfoStore.js";

const UserPackagePage = () => {

  const { GeneralInfoList } = GeneralInfoStore();

  useEffect(() => {
    if (GeneralInfoList?.CompanyName) {
      document.title = `Package | ${GeneralInfoList.CompanyName}`;
    } else {
      document.title = "Package";
    }
  }, [GeneralInfoList]);

  return (
    <Layout>
      <Packages />
    </Layout>
  );
};

export default UserPackagePage;