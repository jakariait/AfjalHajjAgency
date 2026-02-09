import React from "react";
import LayoutAdmin from "../component/componentAdmin/LayoutAdmin.jsx";
import Breadcrumb from "../component/componentAdmin/Breadcrumb.jsx";
import RequirePermission from "../component/componentAdmin/RequirePermission.jsx";
import AdminPackage from "../component/componentAdmin/AdminPackage.jsx";

const AdminPackagePage = () => {
  return (
    <LayoutAdmin>
      <Breadcrumb pageDetails="PACKAGES" title="Manage Packages" />
      <RequirePermission permission="packages">
        <AdminPackage />
      </RequirePermission>
    </LayoutAdmin>
  );
};

export default AdminPackagePage;
