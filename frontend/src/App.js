import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CreateProductScreen from "./screens/CreatProductScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import CartScreen from "./screens/CartScreen";
import NotFound from "./screens/NotFound";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route path="/products/:id" element={<ProductScreen />} />
            <Route path="/product/create" element={<CreateProductScreen />} />
            <Route path="/product/:id/edit" element={<ProductEditScreen />} />
            <Route exact path="cart/:id?" element={<CartScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
