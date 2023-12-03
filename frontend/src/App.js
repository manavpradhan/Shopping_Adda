import { useEffect, useState } from "react";
import "./App.css";
import Webfont from "webfontloader";
import axios from "axios";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import store from "./store.js";
import { loadUser } from "./store/actions/userActions.js";

import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/home/Home";
import ProductDetails from "./components/product/ProductDetails";
import Products from "./components/product/Products";
import Search from "./components/product/Search";
import LoginSignUp from "./components/user/LoginSignUp";
import UserOptions from "./components/layout/header/UserOptions.jsx";
import Profile from "./components/user/Profile.jsx";
import ProtectedUserRoute from "./components/route/ProtectedUserRoute.jsx";
import ProtectedAdminRoute from "./components/route/ProtectedAdminRoute.jsx";
import UpdateProfile from "./components/user/UpdateProfile.jsx";
import ForgotPassword from "./components/user/ForgotPassword.jsx";
import UpdatePassword from "./components/user/UpdatePassword.jsx";
import PasswordReset from "./components/user/PasswordReset.jsx";
import Cart from "./components/cart/Cart.jsx";
import Shipping from "./components/cart/Shipping.jsx";
import ConfirmOrder from "./components/cart/ConfirmOrder.jsx";
import PaymentRoute from "./components/route/PaymentRoute.jsx";
import OrderSuccess from "./components/cart/OrderSuccess.jsx";
import MyOrder from "./components/order/MyOrder.jsx";
import OrderDetails from "./components/order/OrderDetails.jsx";
import Dashboard from "./components/admin/Dashboard.jsx";
import ProductList from "./components/admin/ProductList.jsx";
import NewProduct from "./components/admin/NewProduct.jsx";
import UpdateProduct from "./components/admin/UpdateProduct.jsx";
import OrderList from "./components/admin/OrderList.jsx";
import ProcessOrder from "./components/admin/ProcessOrder.jsx";
import UserList from "./components/admin/UserList.jsx";
import UpdateUser from "./components/admin/UpdateUser.jsx";
import ProductReviews from "./components/admin/ProductReviews.jsx";
import About from "./components/layout/about/About.jsx";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    // getStripeApiKey();
    // console.log(stripeApiKey);

    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<PasswordReset />}
        />
        <Route exact path="/cart" element={<Cart />} />
        <Route element={<ProtectedUserRoute />}>
          <Route exact path="/account" element={<Profile />} />
          <Route exact path="/me/update" element={<UpdateProfile />} />
          <Route exact path="/password/update" element={<UpdatePassword />} />
          <Route exact path="/shipping" element={<Shipping />} />
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
          <Route
            exact
            path="/process/payment"
            element={<PaymentRoute stripeApiKey={stripeApiKey} />}
          />
          <Route exact path="/success" element={<OrderSuccess />} />
          <Route exact path="/orders" element={<MyOrder />} />
          <Route exact path="/order/:id" element={<OrderDetails />} />
        </Route>
        <Route element={<ProtectedAdminRoute />}>
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin/products" element={<ProductList />} />
          <Route exact path="/admin/product/new" element={<NewProduct />} />
          <Route exact path="/admin/product/:id" element={<UpdateProduct />} />
          <Route exact path="/admin/orders" element={<OrderList />} />
          <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
          <Route exact path="/admin/users" element={<UserList />} />
          <Route exact path="/admin/user/:id" element={<UpdateUser />} />
          <Route exact path="/admin/reviews" element={<ProductReviews />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
