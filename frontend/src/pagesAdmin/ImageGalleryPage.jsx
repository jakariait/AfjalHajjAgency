import React from 'react';
import LayoutAdmin from "../component/componentAdmin/LayoutAdmin.jsx";
import Breadcrumb from "../component/componentAdmin/Breadcrumb.jsx";
import RequirePermission from "../component/componentAdmin/RequirePermission.jsx";

import ResultsUpload from "../component/componentAdmin/ResultsUpload.jsx";
import AdminVideoLink from "../component/componentAdmin/AdminVideoLink.jsx";

const ImageGalleryPage = () => {
  return (
    <LayoutAdmin>
      <Breadcrumb
        pageDetails="GALLERY"
        title="Manage Image And Video Gallery"
      />
      {/* Remove the "/" from the first tag so it can wrap the container */}
      <RequirePermission permission="image_gallery">
        <AdminVideoLink/>
        <ResultsUpload/>
      </RequirePermission>
    </LayoutAdmin>
  );
};
export default ImageGalleryPage;