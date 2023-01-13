import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Dialogue from "./pages/Dialogue";
import StartPage from "./pages/StartPage";
import ByePage from "./pages/ByePage";
import Explanation from "./pages/Explanation";
import reportWebVitals from "./reportWebVitals";
import Choose from "./pages/Advanced/Choose";
import Rents1 from "./pages/Basic/Rents1";
import Rents2 from "./pages/Basic/Rents2";
import Rents3 from "./pages/Basic/Rents3";
import Rents4 from "./pages/Basic/Rents4";
import Rents5 from "./pages/Basic/Rents5";
import Complex1 from "./pages/Advanced/complexData/Complex1";
import Complex2 from "./pages/Advanced/complexData/Complex2";
import Complex3 from "./pages/Advanced/complexData/Complex3";
import Interpret1 from "./pages/Advanced/interpretability/Interpret1";
import Interpret2 from "./pages/Advanced/interpretability/Interpret2";
import Interpret3 from "./pages/Advanced/interpretability/Interpret3";
import Interpret4 from "./pages/Advanced/interpretability/Interpret4";
import Interpret5 from "./pages/Advanced/interpretability/Interpret5";
import Interpret6 from "./pages/Advanced/interpretability/Interpret6";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<StartPage />} />
        <Route path="/app" element={<App />} />
        <Route path="/dialogue" element={<Dialogue />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/byebye" element={<ByePage />} />
        <Route path="/explanation" element={<Explanation />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/rents1" element={<Rents1 />} />
        <Route path="/rents2" element={<Rents2 />} />
        <Route path="/rents3" element={<Rents3 />} />
        <Route path="/rents4" element={<Rents4 />} />
        <Route path="/rents5" element={<Rents5 />} />
        <Route path="/complex1" element={<Complex1 />} />
        <Route path="/complex2" element={<Complex2 />} />
        <Route path="/complex3" element={<Complex3 />} />
        <Route path="/interpret1" element={<Interpret1 />} />
        <Route path="/interpret2" element={<Interpret2 />} />
        <Route path="/interpret3" element={<Interpret3 />} />
        <Route path="/interpret4" element={<Interpret4 />} />
        <Route path="/interpret5" element={<Interpret5 />} />
        <Route path="/interpret6" element={<Interpret6 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
