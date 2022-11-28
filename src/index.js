import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Dialogue from "./pages/Dialogue";
import Instructions_01 from "./pages/Instructions_01";
import Instructions_02 from "./pages/Instructions_02";
import Instructions_03 from "./pages/Instructions_03";
import Instructions_04 from "./pages/Instructions_04";
import StartPage from "./pages/StartPage";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<StartPage />} />
        <Route path="/app" element={<App />} />
        <Route path="/dialogue" element={<Dialogue />} />
        <Route path="/instructions_01" element={<Instructions_01 />} />
        <Route path="/instructions_02" element={<Instructions_02 />} />
        <Route path="/instructions_03" element={<Instructions_03 />} />
        <Route path="/instructions_04" element={<Instructions_04 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
