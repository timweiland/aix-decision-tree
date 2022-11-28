import "./Dialogue.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import bob from "../assets/bob.png";
import alice from "../assets/alice.png";

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
        <div class="box sbbob">
          {" "}
          Ich bin neu in Tübingen und will wissen wie hoch die Miete für ein
          Studentenzimmer ist!
        </div>
        <div class="box sbalice"> Hast du Lust mitzumachen? </div>
        <div id="addStatement"> </div>
      </div>

      <div className="column">
        <img src={alice} alt="alice" />
        <div className="rowButtons">
          <Link to="/">
            <div style={{ textAlign: "center", padding: 10 }}>
              <button>ZURÜCK</button>
            </div>
          </Link>

          <Link to="/instructions_01">
            <div style={{ textAlign: "center", padding: 10 }}>
              <button>WEITER</button>
            </div>
          </Link>
        </div>
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
            "<div class='box sbbob'> Wenn ich hier Mittelwerte blabla </div>"
          );
        case 2:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='box sbalice'> Das ist aber nicht sehr genau junger Mann </div>"
          );
        case 3:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='box sbbob'>  Ich habe eine bessere Idee: Ich kann die Stadt in teure und billige Viertel einteilen, und dann den Durchschnittspreis berechnen! </div>"
          );
        case 4:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='box sbalice'> Gute Idee! Und ich kann eine KI programmieren, die das Gleichemacht, dann können wir am Ende beide Ergebnisse vergleichen. </div>"
          );
        default:
          return;
      }
    })();
  }

  const statement1 = {
    person: "box sbbob",
    text: "Wenn ich hier Mittelwerte blabla",
  };
  const statement2 = {
    person: "box sbalice",
    text: "Das ist aber nicht sehr genau junger Mann",
  };
  const statement3 = {
    person: "box sbbob",
    text: "Ich habe eine bessere Idee: Ich kann die Stadt in teure und billige Viertel einteilen, und dann den Durchschnittspreis berechnen!",
  };
  const statement4 = {
    person: "box sbalice",
    text: "Gute Idee! Und ich kann eine KI programmieren, die das Gleiche macht, dann können wir am Ende beide Ergebnisse vergleichen.",
  };
}
export default Dialogue;

/* 
{(() => {
    switch (Counter) {
      case 1:
        return (
          <div class="box sbbob"> Wenn ich hier Mittelwerte blabla </div>
        );
      case 2:
        return (
          <div class="box sbalice">
            {" "}
            Das ist aber nicht sehr genau junger Mann{" "}
          </div>
        );
      case 3:
        return (
          <div class="box sbbob">
            {" "}
            Gute Idee! Und ich kann eine KI programmieren, die das Gleiche
            macht, dann können wir am Ende beide Ergebnisse vergleichen.{" "}
          </div>
        );
      case 4:
        return (
          <div class="box sbalice">
            {" "}
            Das ist aber nicht sehr genau junger Mann{" "}
          </div>
        );
      default:
        return;
    }
  })()} */
