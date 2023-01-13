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

      <div className="column">
        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-primary text-6xl top-8 mx-3 my-10">
            <div className="m-3">
              Ich bin neu in Tübingen und will wissen, wie hoch die Miete für
              ein Studierendenzimmer ist!
            </div>
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-secondary text-6xl mx-3 my-10">
            <div className="m-5">Hast Du Lust mitzumachen?</div>
          </div>
        </div>
        <div>
          <Link to="/dialogue">
            <div
              className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
              style={{ fontSize: "50pt" }}
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
