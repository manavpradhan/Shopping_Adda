import { useEffect } from "react";
import "./App.css";
import Webfont from "webfontloader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/home/Home";
import ProductDetails from "./components/product/ProductDetails";

function App() {
  useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
