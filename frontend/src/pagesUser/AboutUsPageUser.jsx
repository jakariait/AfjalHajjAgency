import React, {useEffect} from "react";
import Layout from "../component/componentGeneral/Layout.jsx";
import AboutUs from "../component/componentGeneral/AboutUs.jsx";
import Testimonials from "../component/componentGeneral/Testimonial.jsx";
import GeneralInfoStore from "../store/GeneralInfoStore.js";

const HomePage = () => {

  const { GeneralInfoList } = GeneralInfoStore();

  useEffect(() => {
    if (GeneralInfoList?.CompanyName) {
      document.title = `About Us | ${GeneralInfoList.CompanyName}`;
    } else {
      document.title = "About Us";
    }
  }, [GeneralInfoList]);

  return (
    <Layout>
      <AboutUs />
      <Testimonials />
    </Layout>
  );
};

export default HomePage;
