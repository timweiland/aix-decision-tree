import "./Dialogue.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import bob from "../assets/bob.png";
import alice from "../assets/alice.png";
import alice_map from "../assets/alice_map.png";
import alice_laptop from "../assets/alice_laptop.png";

function Dialogue() {
  const [Counter, setCounter] = useState(1);

  return (
    <div
      className="column-container"
      onClick={() => {
        setCounter(Counter + 1);
        addStatement(Counter, "addStatement");
      }}
    >
      <div className="column">
        <img src={bob} alt="bob" />
      </div>

      <div className="column">
        <div class="box sbalice">
          {" "}
          Hier ist eine Karte von Tübingen, auf denen die Mietpreise pro
          Quadratmeter eingezeichnet sind.{" "}
        </div>
        <div id="addStatement"> </div>
      </div>

      <div className="column">
        {Counter > 4 ? (
          <img src={alice_laptop} alt="alice_laptop" />
        ) : (
          <img src={alice_map} alt="alice_map" />
        )}
        <Link to="/">
          <div style={{ textAlign: "center", padding: 10 }}>
            <button>ZURÜCK</button>
          </div>
        </Link>
        <Link to="/instructions">
          <div style={{ textAlign: "center", padding: 10 }}>
            <button>WEITER</button>
          </div>
        </Link>
      </div>
    </div>
  );
}

function addStatement(counter, div_id) {
  var theDiv = document.getElementById(div_id);

  {
    (() => {
      switch (counter) {
        case 1:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='box sbbob'> Wenn ich den Durchschnitt berechne, weiß ich ungefähr wie hoch die Miete ist...</div>"
          );
        case 2:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='box sbalice'>Das ist aber nicht sehr genau, es gibt viele Zimmer, die deutlich teurer oder billiger sind.</div>"
          );
        case 3:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='box sbbob'> Ich habe eine bessere Idee: Ich kann die Stadt in teure und billige Viertel einteilen, und dann jeweils den Durchschnittspreis berechnen! </div>"
          );
        case 4:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='box sbalice'>  Gute Idee! Und ich kann eine KI programmieren, die das Gleiche macht, dann können wir am Ende beide Ergebnisse vergleichen.  </div>"
          );
        case 5:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='box sbbob'> Hey, hast Du Lust mir zu helfen? Ich erkläre Dir wie es geht.  </div>"
          );
        default:
          return;
      }
    })();
  }
}

export default Dialogue;