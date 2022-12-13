import "./Instructions.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import map from "../assets/instruction_vertical_lines.jpg";
import bob from "../assets/bob.png";

function Instructions() {
  const [Counter, setCounter] = useState(1);
  const imgs = [map, map, map, map, map];

  return (
    <div className="column-container">
      <div className="columns">
        <img src={imgs[Counter - 1]} alt="img" height="600vh" />
      </div>

      <div className="columns">
        <div className="instr" id="instr0">
          Zeichne vertikale oder horizontale Linien, um die Karte einzuteilen.
          Du kannst deine gezeichneten Striche rückgängig machen, indem du auf
          das U klickst.
        </div>
        <div id="addInstruction"></div>

        {Counter < 4 ? (
          <div
            className="rowButtons"
            onClick={() => {
              setCounter(Counter + 1);
              addInstruction(Counter, "addInstruction");
              changeColor(Counter);
            }}
          >
            <button className="btn btn-lg text-4xl text-white btn-secondary">WEITER</button>
          </div>
        ) : (
          <Link to="/App">
            <div className="rowButtons">
              <div>
                <button className="btn btn-lg text-4xl text-white btn-primary">WEITER</button>
              </div>
            </div>
          </Link>
        )}
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
            "<div class='instr' id='instr1'> Wenn du die Karte geteilt hast, kannst du jeweils die Teilbereiche weiter unterteilen.</div>"
          );
        case 2:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='instr' id='instr2'> Parallel entsteht auf der rechten Seite eine Struktur, die deine Unterteilungen zeigt. Sie sieht aus wie ein umgedrehter Baum und wird deshalb in der Fachsprache Entscheidungsbaum genannt.</div>"
          );
        case 3:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='instr' id='instr3'> Du kannst insgesamt x Bereiche unterteilen, das entspricht y Strichen. Wenn du früher fertig sein solltest, kannst du auf Fertig klicken. Alles verstanden? </div>"
          );
        default:
          return;
      }
    })();
  }
}

function changeColor(counter) {
  {
    (() => {
      switch (counter) {
        case 1:
          return (document.getElementById("instr0").style.color = "grey");
        case 2:
          return (document.getElementById("instr1").style.color = "grey");
        case 3:
          return (document.getElementById("instr2").style.color = "grey");
        default:
          return;
      }
    })();
  }
}

export default Instructions;
