import React from 'react';
import LayoutAdmin from "../component/componentAdmin/LayoutAdmin.jsx";
import Breadcrumb from "../component/componentAdmin/Breadcrumb.jsx";
import RequirePermission from "../component/componentAdmin/RequirePermission.jsx";
import AdminTestimonial from "../component/componentAdmin/AdminTestimonial.jsx";

const TestimonialsPage = () => {
  return (
    <LayoutAdmin>
      <Breadcrumb pageDetails="TESTIMONIALS" title="Manage Testimonials" />
      <RequirePermission permission="testimonial">
        <AdminTestimonial/>
      </RequirePermission >



    </LayoutAdmin>
  );
};

export default TestimonialsPage;