import "./taskbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function Taskbar({ undo, openTutorial }) {
  return (
    <div
      style={{
        height: "5%",
        width: "100%",
        position: "absolute",
        top: `${95}%`,
        left: `${0}%`,
      }}
    >
      <div class="taskbar-container" style={{ position: "absolute", top: `${0}%`, left: `${80}%`, width: "20%" }}>
        <div class="taskbar">
          <div class="button" onClick={openTutorial}>
            <FontAwesomeIcon icon={faQuestion} />
          </div>
        </div>

        <div class="taskbar">
          <div id="rotateleft" class="button" onClick={undo}>
            <FontAwesomeIcon icon={faRotateLeft} />
          </div>
        </div>
      </div>

      <div class="taskbar-container" style={{ position: "absolute", top: `${0}%`, left: `${70}%`, width: "10%" }}></div>


      <div class="taskbar-container" style={{ top: `${0}%`, right: `${30}%`, width: "70%" }}>
        <div className="text-white">
          Preise pro Quadratmeter:
        </div>
        <div className="w-1"></div>
        <div class="taskbar">
          <div class="legend">10€: </div>
          <div class="legend">
            <div class="point" style={{ width: "15px", height: "15px" }} />
          </div>
        </div>

        <div class="taskbar">
          <div id="taskbar20" class="legend">20€: </div>
          <div class="legend">
            <div class="point" style={{ width: "27px", height: "27px" }} />
          </div>
        </div>

        <div clasS="taskbar">
          <div class="legend"> 30€: </div>
          <div class="legend">
            <div class="point" style={{ width: "40px", height: "40px" }} />
          </div>
        </div>

      </div>
    </div>
  )
}
