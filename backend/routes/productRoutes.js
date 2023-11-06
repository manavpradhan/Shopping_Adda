import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getProductDetails,
  getProductReviews,
  updateProduct,
} from "../controllers/productController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

//for everyone
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductDetails);
router.route("/reviews").get(getProductReviews);

//for admin use only
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

//for registered users
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

export default router;
