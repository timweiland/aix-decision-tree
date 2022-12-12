import "./Instructions.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import map from "../assets/instruction_vertical_lines.jpg";
import bob from "../assets/bob.png";

function Instructions() {
  const [Counter, setCounter] = useState(1);
  const imgs = [map, bob, map];

  return (
    <div className="column-container">
      <div className="columns">
        <img src={imgs[Counter - 1]} alt="img" height="600vh" />
      </div>

      <div
        className="columns"
        id="instr"
        onClick={() => {
          setCounter(Counter + 1);
          addInstruction(Counter, "addInstruction");
        }}
      >
        <div className="instr">
          Zeichne vertikale oder horizontale Linien, um die Karte einzuteilen.
          Du kannst deine gezeichneten Striche rückgängig machen, indem du auf
          das U klickst.
        </div>
        <div id="addInstruction"></div>
        <Link to="/App">
          <div className="rowButtons">
            <div style={{ textAlign: "center", padding: 10 }}>
              <button>LOS</button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

function addInstruction(counter, div_id) {
  var theDiv = document.getElementById(div_id);

  {
    (() => {
      switch (counter) {
        case 1:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='instr'> Wenn du die Karte geteilt hast, kannst du jeweils die Teilbereiche weiter unterteilen.</div>"
          );
        case 2:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='instr'> Parallel entsteht auf der rechten Seite eine Struktur, die deine Unterteilungen zeigt. Sie sieht aus wie ein umgedrehter Baum und wird deshalb in der Fachsprache Entscheidungsbaum genannt.</div>"
          );
        case 3:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='instr'> Du kannst insgesamt x Bereiche unterteilen, das entspricht y Strichen. Wenn du früher fertig sein solltest, kannst du auf Fertig klicken. Alles verstanden? </div>"
          );
        default:
          return;
      }
    })();
  }
}

function changeImage(counter) {
  var img;

  {
    (() => {
      switch (counter) {
        case 1:
          img = map;
        case 2:
          img = map;

        default:
          img = bob;
      }
    })();
  }
  return img;
}

export default Instructions;
