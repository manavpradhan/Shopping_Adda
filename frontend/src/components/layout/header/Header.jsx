import React, { useEffect } from "react";
import { ReactNavbar } from "overlay-navbar";
import { MdAccountCircle, MdAddShoppingCart, MdSearch } from "react-icons/md";
import logo from "../../../images/logo.png";
import oldLogo from "../../../images/oldlogo.png";
import "./header.css";

const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "rgba(214, 214, 214, 0.575)",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.5vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIcon: true,
  profileIconColor: "rgba(35, 35, 35,0.8)",
  ProfileIconElement: MdAccountCircle,
  searchIcon: true,
  searchIconUrl: "/search",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  SearchIconElement: MdSearch,
  cartIcon: true,
  cartIconColor: "rgba(35, 35, 35,0.8)",
  CartIconElement: MdAddShoppingCart,
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};

const Header = () => {
  useEffect(() => {
    if (window.innerWidth < 600) {
      options.logo = oldLogo;
    }
  }, [window.innerWidth]);

  return <ReactNavbar {...options} />;
};

export default Header;
