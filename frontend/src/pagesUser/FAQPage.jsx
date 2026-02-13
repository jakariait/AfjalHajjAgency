import React, {useEffect} from "react";
import Layout from "../component/componentGeneral/Layout.jsx";

import FAQSection from "../component/componentGeneral/FAQSection.jsx";
import GeneralInfoStore from "../store/GeneralInfoStore.js";

const HomePage = () => {

  const { GeneralInfoList } = GeneralInfoStore();

  useEffect(() => {
    if (GeneralInfoList?.CompanyName) {
      document.title = `FAQs | ${GeneralInfoList.CompanyName}`;
    } else {
      document.title = "FAQs";
    }
  }, [GeneralInfoList]);

  return (
    <Layout>
      <FAQSection />
    </Layout>
  );
};

export default HomePage;
