import "./StartPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import bob from "../assets/bob.png";
import alice from "../assets/alice.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

function StartPage() {
  const [Counter, setCounter] = useState(1);

  return (
    <div
      className="column-container"
      onClick={() => {
        setCounter(Counter + 1);
        // addStatement(Counter, "addStatement");
      }}
    >
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
        {/* <div class="box sbbob">
          {" "}
          Ich bin neu in Tübingen und will wissen, wie hoch die Miete für ein
          Studierendenzimmer ist!
        </div>
        <div class="box sbalice"> Hast Du Lust mitzumachen? </div> */}
        <div>
          <Link to="/dialogue">
            <div
              className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
              style={{ fontSize: "50pt" }}
            >
              {/* <button className="btn btn-lg text-4xl text-white btn-secondary">WEITER</button> */}
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
