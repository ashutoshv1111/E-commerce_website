import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { Link } from "react-router-dom";
// import Card from "../../../components/UI/Card";
import { MaterialButton } from "../../../componenets/MaterialUI";
import Rating from "../../../componenets/UI/Rating";
import Price from "../../../componenets/UI/Price";
import { generatePublicUrl } from "../../../urlConfig";


import { useParams } from "react-router-dom";
import Card from "../../../componenets/UI/Card";
// import getParams from "../../../utils/getParams";
// import ClothingAndAccessories from "./ClothingAndAccessories";
// import ProductPage from "./ProductPage";
// import ProductStore from "../ProductStore";

/**
 * @author
 * @function ProductStore
 **/

// const ProductStore = (props) => {
//   const product = useSelector((state) => state.product);
//   const priceRange = product.priceRange;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const { match } = props;
//     dispatch(getProductsBySlug(match.params.slug));
//   }, []);

//   return (
//     <>
//       {Object.keys(product.productsByPrice).map((key, index) => {
//         return (
//           <Card
//             headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`}
//             headerRight={
//               <MaterialButton
//                 title={"VIEW ALL"}
//                 style={{
//                   width: "96px",
//                 }}
//                 bgColor="#2874f0"
//                 fontSize="12px"
//               />
//             }
//             style={{
//               width: "calc(100% - 40px)",
//               margin: "20px",
//             }}
//           >
//             <div style={{ display: "flex" }}>
//               {product.productsByPrice[key].map((product) => (
//                 <Link
//                   to={`/${product.slug}/${product._id}/p`}
//                   style={{
//                     display: "block",
//                     textDecoration: "none",
//                     color: "#000",
//                   }}
//                   className="productContainer"
//                 >
//                   <div className="productImgContainer">
//                     <img src={product.productPictures[0].img} alt="" />
//                   </div>
//                   <div className="productInfo">
//                     <div style={{ margin: "10px 0" }}>{product.name}</div>
//                     <div>
//                       <Rating value="4.3" />
//                       &nbsp;&nbsp;
//                       <span
//                         style={{
//                           color: "#777",
//                           fontWeight: "500",
//                           fontSize: "12px",
//                         }}
//                       >
//                         (3353)
//                       </span>
//                     </div>
//                     <Price value={product.price} />
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </Card>
//         );
//       })}
//     </>
//   );
// };

// export default ProductStore;


const ProductStore = (props) => {



  const product = useSelector(state => state.product);
  // const priceRange = product.priceRange;
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000

  })
  const dispatch = useDispatch();

  const { slug } = useParams();

  useEffect(() => {
    // const {match} = props;
   
    dispatch(getProductsBySlug(slug));
  },[]);
 

  return(
   <>{
      Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            headerLeft={`${slug} mobile under ${priceRange[key]}`}
            headerRight={<MaterialButton
                title={"VIEW ALL"}
                style={{
                  width: "96px",
                }}
                bgColor="#2874f0"
                fontSize="12px"
              />}
           style={{
            width: 'calc(100% - 20px)',
            margin: '20px'
           }}
          >
           
            <div style={{display: 'flex'}}>
              {
                product.productsByPrice[key].map(product =>
                  <Link 
                  to={`/${product.slug}/${product._id}/p`}
                  style={{display: 'block'}} 
                  className="productContainer">
                    <div className="productImgContainer">
                      <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
                    </div>
                    <div className="productInfo">
                      <div >{product.name}</div>
                      <div>
                      <Rating value="4.3" />
                      &nbsp;&nbsp;
                      <span
                        style={{
                          color: "#777",
                          fontWeight: "500",
                          fontSize: "12px",
                        }}
                      >
                        (3353)
                      </span>
                      </div>
                      <Price value={product.price}/>
                    </div>
                  </Link>)
              }
    
            </div>
            </Card>
        );
      })
    }
    </> 
  )
}

export default ProductStore;





// const { slug } = useParams();

// useEffect(() => {
//   console.log(slug)
//   dispatch(getProductsBySlug(slug))
// }, [dispatch, slug]);