import React, {useEffect} from 'react';
import Layout from "../component/componentGeneral/Layout.jsx";
import Product from "../component/componentGeneral/Product.jsx";
import GeneralInfoStore from "../store/GeneralInfoStore.js";

const ShopPage = () => {

  const { GeneralInfoList } = GeneralInfoStore();

  useEffect(() => {
    if (GeneralInfoList?.CompanyName) {
      document.title = `Shop | ${GeneralInfoList.CompanyName}`;
    } else {
      document.title = "Shop";
    }
  }, [GeneralInfoList]);
  return (
    <Layout>
      <Product/>
    </Layout>
  );
};

export default ShopPage;