import React from "react";
import Layout from "../component/componentGeneral/Layout.jsx";
import ProductByFlag from "../component/componentGeneral/ProductByFlag.jsx";
import HajjHero from "../component/componentGeneral/HajjHero.jsx";
import Services from "../component/componentGeneral/Service.jsx";
import Gallery from "../component/componentGeneral/Gallery.jsx";
import VideoGallery from "../component/componentGeneral/VideoGallery.jsx";
import Testimonial from "../component/componentGeneral/Testimonial.jsx";
import Package from "../component/componentGeneral/Package.jsx";
import HomePageProducts from "../component/componentGeneral/HomePageProducts.jsx";

const HomePage = () => {
  return (
    <Layout>
      <HajjHero />
      <Services
        selectedServices={[
          "হজ্জ ও উমরাহ ভিসা প্রসেসিং",
          "হজ্জ ও উমরাহ ফ্লাইট বুকিং",
          "মক্কা ও মদিনায় আবাসন সুবিধা",
        ]}
        isHomePage={true}
      />
      <Package isHomePage={true} />
      <HomePageProducts />
      <Gallery isHomePage={true} />
      <VideoGallery isHomePage={true} />
      <Testimonial />
    </Layout>
  );
};

export default HomePage;
