import React, { useEffect } from "react";
import Service from "../component/componentGeneral/Service.jsx";
import Layout from "../component/componentGeneral/Layout.jsx";
import GeneralInfoStore from "../store/GeneralInfoStore.js";

const ServicePage = () => {
  const { GeneralInfoList } = GeneralInfoStore();

  useEffect(() => {
    if (GeneralInfoList?.CompanyName) {
      document.title = `Services | ${GeneralInfoList.CompanyName}`;
    } else {
      document.title = "Services";
    }
  }, [GeneralInfoList]);

  return (
    <Layout>
      <Service />
    </Layout>
  );
};

export default ServicePage;
