import React, { Fragment, useEffect } from "react";
import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { CgMouse } from "react-icons/cg";
import MetaData from "../layout/MetaData";
import ProductCard from "./ProductCard";
import Loader from "../../components/layout/loader/Loader";
import {
  clearErrors,
  getProducts,
} from "../../store/actions/productActions.js";

// const product = {
//   name: "Iphone",
//   images: [
//     {
//       url: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-01.jpg",
//     },
//   ],
//   price: 30000,
//   ratings: 3.5,
//   numOfReviews: 4,
//   _id: "manav",
// };

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Shopping Adda" />

          <div className="banner">
            <p>Welcome to Shopping Adda</p>
            <h1>
              GOT A WISHLIST?
              <br />
              WELL, YOU ARE AT THE RIGHT PLACE
            </h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
