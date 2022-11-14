import "./Instructions.css";
import { Link } from "react-router-dom";
import map from "../assets/instruction_vertical_lines.jpg";

function Instructions_02() {
  return (
    <div className="container">
      <div className="left">
        <img src={map} alt="map" height="600vh" />
      </div>

      <div className="right">
        <div className="instr">
          Parallel entsteht auf der rechten Seite eine Struktur, die deine
          Unterteilungen zeigt. Sie sieht aus wie ein umgedrehter Baum und wird
          deshalb in der Fachsprache Entscheidungsbaum genannt.
        </div>
        <div className="rowButtons">
          <Link to="/instructions_02">
            <div style={{ textAlign: "center", padding: 10 }}>
              <button>ZURÜCK</button>
            </div>
          </Link>

          <Link to="/instructions_04">
            <div style={{ textAlign: "center", padding: 10 }}>
              <button>WEITER</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Instructions_02;
