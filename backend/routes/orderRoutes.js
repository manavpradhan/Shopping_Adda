import express from "express";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";
import {
  deleteOrder,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/orderController.js";

const router = express.Router();

//for registered users
router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

//for admin use
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), myOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

export default router;
