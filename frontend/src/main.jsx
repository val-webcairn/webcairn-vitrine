import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/syne/latin-700.css";
import "@fontsource/syne/latin-800.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-700.css";
import "@/index.css";
import App from "@/App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
