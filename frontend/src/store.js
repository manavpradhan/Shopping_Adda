import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReviewsReducer,
  productsReducer,
  updateProductReducer,
  updateReviewReducer,
} from "./store/reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./store/reducers/userReducer";
import { cartReducer, shippingReducer } from "./store/reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  updateOrderReducer,
} from "./store/reducers/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  newReview: newReviewReducer,
  user: userReducer,
  cart: cartReducer,
  shippingInfo: shippingReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  allOrders: allOrdersReducer,
  allUsers: allUsersReducer,
  newProduct: newProductReducer,
  updateProduct: updateProductReducer,
  updateOrder: updateOrderReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  updateReview: updateReviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  shippingInfo: {
    details: sessionStorage.getItem("shippingInfo")
      ? JSON.parse(sessionStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
