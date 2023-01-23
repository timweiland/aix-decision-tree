import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  faArrowRightLong,
  faArrowLeftLong,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { Stack } from "@mui/material";
import algo1 from "../assets/algo_sketch1.png";
import algo2 from "../assets/algo_sketch2.png";
import algo3 from "../assets/algo_sketch3.png";
import algo4 from "../assets/algo_sketch4.png";
import CancelPopup from "../popup/CancelPopup";

function Rents() {
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  console.log(showCancelPopup);
  const exitApp = () => {
    window.location.replace("/");
  };
  return (
    <div className="column-container">
      <div className="grid grid-rows-2">
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
            Wie schätzt die KI die Mieten in Tübingen?
          </div>
          <div class="text-3xl text-black font-normal leading-relaxed">
            Die KI berechnet ihre Lösung. Für eine Teilung der Karte probiert
            sie systematisch alle möglichen Trennungslinien von links nach
            rechts und von oben nach unten aus.
          </div>
          <div class="text-3xl text-black font-normal leading-relaxed">
            Für jede Linie berechnet sie die durchschnittliche Miete auf beiden
            Seiten der Linie. Schließlich wählt sie die Linie, wo der
            Unterschied zwischen echten Mietpreisen und durchschnittlicher Miete
            am kleinsten ist. [Checken die Leute das? Erwähnen, dass Ähnlichkeit
            der Mietpreise guter Indikator?]
          </div>
          <div class="text-3xl text-black font-normal leading-relaxed">
            Diese Berechnung wiederholt sie genauso für alle weiteren
            Unterteilungen. Am Ende verwendet sie die durchschnittlichen Mieten
            pro Bereich als Schätzung.
          </div>
        </Stack>

        <div
          class="grid grid-cols-4"
          style={{
            fontSize: "50px",
            marginLeft: "10.5vw",
            marginRight: "12.5vw",
            marginBottom: "7vh",
            marginTop: "25vh",
          }}
        >
          <div>
            <img style={{ height: "20vh" }} src={algo1} alt="algo1" />
          </div>
          <div>
            <img style={{ height: "20vh" }} src={algo2} alt="algo2" />
          </div>
          <div>
            <img style={{ height: "20vh" }} src={algo3} alt="algo3" />
          </div>
          <div>
            <img style={{ height: "20vh" }} src={algo4} alt="algo4" />
          </div>
        </div>
        {/*<Link to="/final">
                <div
                className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-40 pt-2 pb-3 left-8 pl-7 pr-7 shadow-2xl shadow-green-700 opacity-80 text-white"
                style={{ fontSize: "40pt" }}
                >
                    Menü
                </div>
  </Link>*/}
      </div>
      <div>
        <Link to="/final">
          <div
            className="absolute hover:cursor-pointer bg-green-700 rounded-2xl bottom-10 left-10 pl-8 pr-8 shadow-2xl shadow-green-700 opacity-90 text-white btn btn-lg h-25 z-50 border-transparent"
            style={{ fontSize: "60px" }}
          >
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </div>
        </Link>
      </div>
      {/*<div>
                <Link to="/rents2">
                    <div
                    className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                    style={{ fontSize: "50pt" }}
                    >
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </div>
                </Link>
</div>*/}

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

export default Rents;
