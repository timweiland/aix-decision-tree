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
import Choose from "./pages/Advanced/Choose";
import Rents1 from "./pages/Basic/Rents1";
import Rents2 from "./pages/Basic/Rents2";
import Test from "./pages/Test";

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
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
