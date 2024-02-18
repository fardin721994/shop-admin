import React from "react";
import "./App.scss";
import "./fonts/Vazirmatn-Regular.ttf";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Main from "./Main/Main";
import NewProduct from "./NewProduct/NewProduct";
import FilePicker from "./NewProduct/FilePicker";
import Images from "./NewProduct/Images";

function App() {
  return (
    <div className="App" dir="rtl">
      {/* <Images /> */}
      {/* <FilePicker /> */}
      <NewProduct />
      {/* <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="" element={<Main />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
