import React from "react";
import Layout from "../component/componentGeneral/Layout.jsx";
import AboutUs from "../component/componentGeneral/AboutUs.jsx";
import Testimonials from "../component/componentGeneral/Testimonial.jsx";

const HomePage = () => {
  return (
    <Layout>
      <AboutUs />
      <Testimonials />
    </Layout>
  );
};

export default HomePage;
