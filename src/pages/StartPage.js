import "./StartPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import bob from "../assets/bob.png";
import alice from "../assets/alice.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

function StartPage() {
  return (
    <div className="column-container">
      <div className="column">
        <img src={bob} alt="bob" />
      </div>

      <div className="middle-column">
        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-error text-6xl top-8 my-10 shadow-2xl text-center">
            <div className="m-7">
              Wir sind neu in Tübingen und wollen wissen, wie hoch die Miete für
              ein WG-Zimmer ist!
            </div>
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-info text-6xl my-10 shadow-2xl text-center">
            <div className="m-7">Hey, hast Du Lust uns zu helfen?</div>
          </div>
        </div>
        <div>
          <Link to="/dialogue">
            <div
              className="absolute hover:cursor-pointer bg-green-700 rounded-2xl bottom-10 right-10 pl-8 pr-8 shadow-2xl shadow-green-700 opacity-90 text-white btn btn-lg h-25 z-50 border-transparent"
              style={{ fontSize: "60px" }}
            >
              <FontAwesomeIcon icon={faArrowRightLong} />
            </div>
          </Link>
        </div>
      </div>

      <div className="column">
        <img src={alice} alt="alice" className="imgalice" />
      </div>
    </div>
  );
}

export default StartPage;
