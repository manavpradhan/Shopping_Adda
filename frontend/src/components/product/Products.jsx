import React, { Fragment, useEffect, useState } from "react";
import "./products.css";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../home/ProductCard";
import MetaData from "../layout/MetaData";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { Typography, Slider } from "@mui/material";
import { clearErrors, getProducts } from "../../store/actions/productActions";
import { useParams } from "react-router-dom";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  let count = filteredProductsCount;

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const keyword = params.keyword;

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
  const shuffledProducts = shuffle(products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, alert, error, currentPage, price, category, ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Products" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {count > 0 ? (
              shuffledProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <h2>Sorry! No such products are found...</h2>
            )}
          </div>

          <div className="filterBox">
            <div className="price">
              <Typography>Price</Typography>
              <Slider
                className="slider"
                onChange={priceHandler}
                valueLabelDisplay="auto"
                getAriaLabel={() => "Price Range"}
                value={price}
                min={0}
                max={100000}
              />
            </div>
            <div className="category">
              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div className="ratings">
              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  className="slider"
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={(e) => {
                  setCurrentPage(e);
                }}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
