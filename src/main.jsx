import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import ScrollTop from "./comp/ScrollTop";
import './i18n'; // 👈 مهم جدًا تكتبه هنا
ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <ScrollTop />
      <App />
  </BrowserRouter>
);
