import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack";
import * as React from "react";
import CancelPopup from "../popup/CancelPopup";
import { useState } from "react";

export default function Appl() {
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  console.log(showCancelPopup);
  const exitApp = () => {
    window.location.replace("/");
  };
  return (
    <div className="column-container">
      <Stack
        className="space-y-6"
        direction="column"
        style={{
          marginTop: "13vh",
          marginLeft: "14.5vw",
          marginRight: "16.5vw",
          marginBottom: "7vh",
        }}
      >
        <div class="text-6xl mb-10 text-black font-semibold">
          Entscheidungsbäume in der Medizin
        </div>
        <div class="text-3xl text-black font-normal leading-relaxed">
          Entscheidungsbäume werden in der Medizin verwendet, denn hier ist
          Nachvollziehbarkeit besonders wichtig.
        </div>
        <div class="text-3xl text-black font-normal leading-relaxed">
          Sie können Ärzt_innen bei der Diagnose von Brustkrebs unterstützen.
          Anhand folgender Merkmale können sie gutartige und bösartige Tumore
          voneinander unterscheiden:
        </div>
        <div class="text-3xl text-black font-normal leading-relaxed">
          <div class="text-3xl text-black font-normal leading-relaxed">
            <p>&#9679; Größe des Zellklumpens</p>
            <p>&#9679; Gleichmäßigkeit der Größe der Zellen</p>
            <p>&#9679; Gleichmäßigkeit der Form der Zellen</p>
            <p>&#9679; Dichte des Gewebes</p>
          </div>
        </div>
      </Stack>

      {/*<Link to="/final">
                <div
                className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-40 pt-2 pb-3 left-8 pl-7 pr-7 shadow-2xl shadow-green-700 opacity-80 text-white"
                style={{ fontSize: "40pt" }}
                >
                    Menü
                </div>
    </Link>*/}
      <Link to="/final">
        <div
          className="absolute hover:cursor-pointer bg-green-700 rounded-2xl bottom-10 left-10 pl-8 pr-8 shadow-2xl shadow-green-700 opacity-90 text-white btn btn-lg h-25 z-50 border-transparent"
          style={{ fontSize: "60px" }}
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </div>
      </Link>
      {/*<Link to="/appl2">
                <div
                className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                style={{ fontSize: "50pt" }}
                >
                    <FontAwesomeIcon icon={faArrowRightLong} />
                </div>
</Link>*/}
      <div
        className="absolute hover:cursor-pointer bg-red-700 rounded-2xl top-10 right-10 pl-8 pr-8 shadow-2xl shadow-red-700 opacity-90 text-white btn btn-lg h-25 z-10 border-transparent"
        style={{ fontSize: "60px" }}
        onClick={() => setShowCancelPopup(true)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>
      {showCancelPopup && (
        <CancelPopup
          title="Beenden"
          closeCallback={exitApp}
          cancelCallback={() => setShowCancelPopup(false)}
        >
          Möchtest du beenden und wieder zurück zum Start?
        </CancelPopup>
      )}
    </div>
  );
}
