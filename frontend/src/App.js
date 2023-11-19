import { useEffect } from "react";
import "./App.css";
import Webfont from "webfontloader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/home/Home";
import ProductDetails from "./components/product/ProductDetails";
import Products from "./components/product/Products";
import Search from "./components/product/Search";
import LoginSignUp from "./components/user/LoginSignUp";
import store from "./store.js";
import { loadUser } from "./store/actions/userActions.js";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/header/UserOptions.jsx";
import Profile from "./components/user/Profile.jsx";
import ProtectedUserRoute from "./components/route/ProtectedUserRoute.jsx";
import UpdateProfile from "./components/user/UpdateProfile.jsx";
import ForgotPassword from "./components/user/ForgotPassword.jsx";
import UpdatePassword from "./components/user/UpdatePassword.jsx";
import PasswordReset from "./components/user/PasswordReset.jsx";
import Cart from "./components/cart/Cart.jsx";
import Shipping from "./components/cart/Shipping.jsx";
import ConfirmOrder from "./components/cart/ConfirmOrder.jsx";

function App() {
  useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  const { user, isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
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
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
