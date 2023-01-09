import "./Instructions.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import instr_lines from "../assets/instructions_lines.jpeg";
import instr_divisions from "../assets/instructions_divisions.jpeg";
import instr_decisiontree from "../assets/instructions_decisiontree.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

function Instructions() {
  const [Counter, setCounter] = useState(1);
  const imgs = [
    instr_lines,
    instr_divisions,
    instr_decisiontree,
    instr_decisiontree,
  ];

  return (
    <div className="column-container">
      <div className="left">
        <img src={imgs[Counter - 1]} alt="img" />
      </div>

      <div className="right">
        <div className="instr" id="instr0">
          Zeichne vertikale oder horizontale Linien, um die Karte einzuteilen.
          Mit <FontAwesomeIcon icon={faRotateLeft} /> kannst du deinen Strich
          rückgängig machen.
        </div>
        <div id="addInstruction"></div>

        {Counter < 4 ? (
          <div
            className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
            style={{ fontSize: "50pt" }}
            onClick={() => {
              setCounter(Counter + 1);
              addInstruction(Counter, "addInstruction");
              changeColor(Counter);
            }}
          >
            {/* <button className="btn btn-lg text-4xl text-white btn-secondary">WEITER</button> */}
            <FontAwesomeIcon icon={faArrowRightLong} />
          </div>
        ) : (
          <Link to="/Tutorial">
            <div
              className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
              style={{ fontSize: "50pt" }}
            >
              {/* <button className="btn btn-lg text-4xl text-white btn-secondary">WEITER</button> */}
              <FontAwesomeIcon icon={faArrowRightLong} />
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
            "<div class='instr' id='instr3'> Du kannst maximal 5 Linien ziehen. Mit <FontAwesomeIcon icon={faRotateLeft} /> kannst du früher abbrechen. Los gehts! </div>"
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
          return (document.getElementById("instr0").style.color = "lightgrey");
        case 2:
          return (document.getElementById("instr1").style.color = "lightgrey");
        case 3:
          return (document.getElementById("instr2").style.color = "lightgrey");
        default:
          return;
      }
    })();
  }
}

export default Instructions;
