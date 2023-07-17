import React, { useEffect } from "react";
import Layout from "../../componenets/Layout";
// import { useDispatch, useSelector } from 'react-redux';
// import { useState } from 'react'
// import { getProductsBySlug } from "../../actions";
// import { useParams } from "react-router-dom";
import getParams from "../../utils/getParams";
import ClothingAndAccessories from "./ClothingAndAccessories";
// import ProductPage from "./ProductPage";
// import ProductStore from "./ProductStore";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
import ProductStore from "./ProductStore";
import ProductPage from "./ProductPage"

/**
 * @author
 * @function ProductListPage
 **/ 

const ProductListPage = (props) => {

  const renderProduct = () => {
    console.log(props);
    const params = getParams(window.location.search);
    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;
      case "page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = <ClothingAndAccessories {...props} />; 
     
    }

    return content;

  }

  return (
    <Layout>
      {renderProduct()}
    </Layout>
  )
};



export default ProductListPage;

 // const renderProduct = () => {
  //   console.log(props);
  //   const params = getParams(props.location.search);
  //   let content = null;
  //   switch (params.type) {
  //     case "store":
  //       content = <ProductStore {...props} />;
  //       break;
  //     case "page":
  //       content = <ProductPage {...props} />;
  //       break;
  //     default:
  //       content = <ClothingAndAccessories {...props} />;
  //   }

    // return content;




    // return <Layout>{renderProduct()}</Layout>;
// };


// default:
//   content = <ClothingAndAccessories {...props} />;