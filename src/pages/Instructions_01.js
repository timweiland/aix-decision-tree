import "./Instructions.css";
import { Link } from "react-router-dom";
import map from "../assets/instruction_vertical_lines.jpg";

function Instructions_01() {
  return (
    <div className="container">
      <div className="left">
        <img src={map} alt="map" height="600vh" />
      </div>

      <div className="right">
        <div className="instr">
          Zeichne vertikale oder horizontale Linien in die Karte, um die Karte
          einzuteilen. Du kannst deine gezeichneten Striche rückgängig machen,
          indem du auf das U klickst.
        </div>
        <div className="rowButtons">
          <Link to="/">
            <div style={{ textAlign: "center", padding: 10 }}>
              <button>ZURÜCK</button>
            </div>
          </Link>

          <Link to="/instructions_02">
            <div style={{ textAlign: "center", padding: 10 }}>
              <button>WEITER</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Instructions_01;
