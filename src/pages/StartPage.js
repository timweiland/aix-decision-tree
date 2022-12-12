import "./StartPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import bob from "../assets/bob.png";
import alice from "../assets/alice.png";

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
        <div class="box sbbob">
          {" "}
          Ich bin neu in Tübingen und will wissen wie hoch die Miete für ein
          Studentenzimmer ist! xyz
        </div>
        <div class="box sbalice"> Hast du Lust mitzumachen? </div>
        <div className="rowButtons">
          <Link to="/dialogue">
            <div style={{ textAlign: "center", padding: 10 }}>
              <button>START</button>
            </div>
          </Link>
        </div>
      </div>

      <div className="column">
        <img src={alice} alt="alice" />
      </div>
    </div>
  );
}

function StartPage_old() {
  return (
    <div>
      <h1> WG-Zimmer gesucht? </h1>
      <br />
      <h3>
        {" "}
        Hier kannst du Mietpreise vorhersagen und dich mit einer KI vergleichen.
      </h3>
      <br />
      <br />
      <Link to="/app">
        <div style={{ textAlign: "center" }}>
          <button>LOS</button>
        </div>
      </Link>

      <Link to="/dialogue">
        <div style={{ textAlign: "center" }}>
          <button>INSTRUKTIONEN</button>
        </div>
      </Link>
    </div>
  );
}

export default StartPage;
