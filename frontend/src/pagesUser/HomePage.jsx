import React from "react";
import Layout from "../component/componentGeneral/Layout.jsx";
import ProductByFlag from "../component/componentGeneral/ProductByFlag.jsx";
import HajjHero from "../component/componentGeneral/HajjHero.jsx";
import Services from "../component/componentGeneral/Service.jsx";
import Gallery from "../component/componentGeneral/Gallery.jsx";
import VideoGallery from "../component/componentGeneral/VideoGallery.jsx";

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
      <Gallery isHomePage={true} />
      <VideoGallery isHomePage={true} />

    </Layout>
  );
};

export default HomePage;
