import React, { useEffect } from "react";
import Layout from "../component/componentGeneral/Layout.jsx";
import ContactSection from "../component/componentGeneral/ContactSection.jsx";
import GeneralInfoStore from "../store/GeneralInfoStore.js";

const ContactUsPage = () => {
  const { GeneralInfoList } = GeneralInfoStore();

  useEffect(() => {
    if (GeneralInfoList?.CompanyName) {
      document.title = `Contact Us | ${GeneralInfoList.CompanyName}`;
    } else {
      document.title = "Contact Us";
    }
  }, [GeneralInfoList]);

  return (
    <Layout>
      <ContactSection />
    </Layout>
  );
};

export default ContactUsPage;
