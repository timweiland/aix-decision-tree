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
import algo5 from "../assets/algo_sketch5.png";

function Rents({ onComplete }) {
  return (
    <div className="column-container">
      <div className="grid grid-rows-2">
        <Stack
          className="space-y-6"
          direction="column"
          style={{
            marginTop: "11.5vh",
            marginLeft: "14.5vw",
            marginRight: "16.5vw",
            marginBottom: "7vh",
          }}
        >
          <div class="text-6xl mb-10 text-black font-semibold">
            Wie schätzt die KI die Mieten in Tübingen?
          </div>
          <div class="text-3xl text-black font-normal leading-relaxed">
            Die KI <i>berechnet</i> ihre Lösung. Für eine Teilung der Karte
            probiert sie systematisch <i>alle möglichen</i> Trennungslinien von
            links nach rechts und von oben nach unten aus.
          </div>
          <div class="text-3xl text-black font-normal leading-relaxed">
            Für jede Linie berechnet sie die durchschnittliche Miete in beiden
            Bereichen. Schließlich wählt sie die Linie, wo der
            <i> Unterschied</i> zwischen echten Mieten und durchschnittlicher
            Miete am <i>kleinsten</i> ist. Das führt dazu, dass innerhalb eines
            Bereichs die Mieten <i>ähnlich</i> sind.
          </div>
          <div class="text-3xl text-black font-normal leading-relaxed">
            Damit ist die erste Linie festgelegt. Für alle Teilungen in weitere
            Unterbereiche verfährt die KI genauso. Wenn sie fertig ist,
            verwendet sie die durchschnittliche Miete pro Bereich als{" "}
            <i>Schätzung</i>.
          </div>
        </Stack>

        <div
          class="grid grid-cols-5"
          style={{
            fontSize: "50px",
            marginLeft: "11.5vw",
            marginRight: "12.5vw",
            marginBottom: "7vh",
            marginTop: "14vh",
          }}
        >
          <div>
            <img style={{ height: "28vh" }} src={algo1} alt="algo1" />
            <div class="text-base" style={{ marginLeft: "3.1vw" }}>
              Erste Linie probieren
            </div>
          </div>
          <div>
            <img style={{ height: "28vh" }} src={algo2} alt="algo2" />
            <div class="text-base" style={{ marginLeft: "3.1vw" }}>
              Durchschnitte berechnen
            </div>
          </div>
          <div>
            <img style={{ height: "28vh" }} src={algo3} alt="algo3" />
            <div class="text-base" style={{ marginLeft: "3.1vw" }}>
              Systematisch durchprobieren
            </div>
          </div>
          <div>
            <img style={{ height: "28vh" }} src={algo5} alt="algo5" />
            {/*<div class="text-base" style={{ marginLeft: "3.1vw"}}>Systematisch durchprobieren</div>*/}
          </div>
          <div>
            <img style={{ height: "28vh" }} src={algo4} alt="algo4" />
            <div class="text-base" style={{ marginLeft: "3.1vw" }}>
              Beste Linie wählen
            </div>
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
        <div
          onClick={onComplete}
          className="absolute hover:bg-green-700 bg-green-700 rounded-2xl bottom-10 left-10 pl-8 pr-8 shadow-2xl shadow-green-700 opacity-90 text-white btn btn-lg h-25 z-50 border-transparent"
          style={{ fontSize: "60px" }}
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </div>
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
    </div>
  );
}

export default Rents;
