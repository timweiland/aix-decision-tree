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
          Du kannst insgesamt x Bereiche unterteilen, das entspricht y Strichen.
          Wenn du früher fertig sein solltest, kannst du auf Fertig klicken.
          Alles verstanden?
        </div>
        <div className="rowButtons">
          <Link to="/instructions_03">
            <div style={{ textAlign: "center", padding: 10 }}>
              <button>ZURÜCK</button>
            </div>
          </Link>

          <Link to="/app">
            <div style={{ textAlign: "center", padding: 10 }}>
              <button>LOS</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Instructions_02;
