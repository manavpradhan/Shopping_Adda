import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productsReducer,
  updateProductReducer,
} from "./store/reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
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
  allUsers: allUsersReducer,
  allOrders: allOrdersReducer,
  newProduct: newProductReducer,
  updateProduct: updateProductReducer,
  updateOrder: updateOrderReducer,
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
