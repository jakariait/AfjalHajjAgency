import React, {useEffect} from "react";
import Layout from "../component/componentGeneral/Layout.jsx";
import PrivacyPolicy from "../component/componentGeneral/PrivacyPolicy.jsx";
import GeneralInfoStore from "../store/GeneralInfoStore.js";

const HomePage = () => {

  const { GeneralInfoList } = GeneralInfoStore();

  useEffect(() => {
    if (GeneralInfoList?.CompanyName) {
      document.title = `Privacy Policy | ${GeneralInfoList.CompanyName}`;
    } else {
      document.title = "Privacy Policy";
    }
  }, [GeneralInfoList]);


  return (
    <Layout>
      <PrivacyPolicy/>
    </Layout>
  );
};

export default HomePage;
