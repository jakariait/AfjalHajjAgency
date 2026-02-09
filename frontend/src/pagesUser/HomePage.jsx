import React from "react";
import Layout from "../component/componentGeneral/Layout.jsx";
import ProductCarousel from "../component/componentGeneral/ProductCarousel.jsx";
import Feature from "../component/componentGeneral/Feature.jsx";
import ProductByFlag from "../component/componentGeneral/ProductByFlag.jsx";
import HajjHero from "../component/componentGeneral/HajjHero.jsx";
import Services from "../component/componentGeneral/Service.jsx";

const HomePage = () => {
  return (
    <Layout>
      <HajjHero />
      <Services
        selectedServices={[
          "ভিসা প্রসেসিং",
          "এয়ার টিকিট বুকিং",
          "মানসম্মত হোটেল",
        ]}
        isHomePage={true}
      />
      <ProductByFlag />
    </Layout>
  );
};

export default HomePage;
