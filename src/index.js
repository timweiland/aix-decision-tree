import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Dialogue from "./pages/Dialogue";
import Instructions from "./pages/Instructions";
import StartPage from "./pages/StartPage";
import ByePage from "./pages/ByePage";
import Explanation from "./pages/Explanation";
import reportWebVitals from "./reportWebVitals";
import Choose from "./pages/advanced/Choose";
import Rents1 from "./pages/basic/Rents1";
import Rents2 from "./pages/basic/Rents2";
import Rents3 from "./pages/basic/Rents3";
import Rents4 from "./pages/basic/Rents4";
import Rents5 from "./pages/basic/Rents5";
import Complex1 from "./pages/advanced/complexData/Complex1";
import Complex2 from "./pages/advanced/complexData/Complex2";


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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
