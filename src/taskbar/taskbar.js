
import "./taskbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faCheck, faRotateLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default function Taskbar({ cleanUp, complete, undo }) {
  return <div style={{ height: "5%", width: "100%", position: "absolute", top: `${95}%`, left: `${0}%` }}>

    <div class="taskbar-container" style={{ position: "absolute", top: `${0}%`, left: `${50}%` }}>

      <div class="taskbar">
        <div class="button"><FontAwesomeIcon icon={faQuestion} /></div>
      </div>

      <div class="taskbar">
        <div class="button" onClick={undo}>
          <FontAwesomeIcon icon={faRotateLeft} />
        </div>
      </div>

      <div class="taskbar">
        <div class="button" onClick={complete}>
          <FontAwesomeIcon icon={faCheck} />
        </div>
      </div>

      <div class="taskbar">
        <div className="button">
          <Link to="/" style={{ textDecoration: 'none' }} onClick={cleanUp}>
          <FontAwesomeIcon icon={faXmark} />
          </Link>
        </div>
      </div>

    </div>


    <div class="taskbar-container" style={{ top: `${0}%`, right: `${50}%` }}>

      <div class="taskbar">
        <div class="legend">10€: </div>
        <div class="legend">
          <div class="point" style={{ width: "20px", height: "20px" }} />
        </div>
      </div>

      <div class="taskbar">
        <div class="legend">20€: </div>
        <div class="legend">
          <div class="point" style={{ width: "35px", height: "35px" }} />
        </div>
      </div>

      <div clasS="taskbar">
        <div class="legend"> 30€: </div>
        <div class="legend">
          <div class="point" style={{ width: "50px", height: "50px" }} />
        </div>
      </div>

    </div>
  </div>
}