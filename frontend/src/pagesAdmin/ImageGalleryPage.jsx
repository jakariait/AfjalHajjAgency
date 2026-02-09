import React from 'react';
import LayoutAdmin from "../component/componentAdmin/LayoutAdmin.jsx";
import Breadcrumb from "../component/componentAdmin/Breadcrumb.jsx";
import RequirePermission from "../component/componentAdmin/RequirePermission.jsx";
import AbandonedCartsContainer from "../component/componentAdmin/AbandonedCartsContainer.jsx";
import ResultsUpload from "../component/componentAdmin/ResultsUpload.jsx";

const ImageGalleryPage = () => {
  return (
    <LayoutAdmin>
      <Breadcrumb
        pageDetails="IMAGE GALLERY"
        title="Manage Image Gallery"
      />
      {/* Remove the "/" from the first tag so it can wrap the container */}
      <RequirePermission permission="image_gallery">
        <ResultsUpload/>
      </RequirePermission>
    </LayoutAdmin>
  );
};
export default ImageGalleryPage;