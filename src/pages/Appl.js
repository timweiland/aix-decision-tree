import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack";
import * as React from "react";

export default function Appl({ onComplete }) {
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
          Entscheidungsbäume werden gern in der Medizin eingesetzt, weil sie
          erklärbar sind (siehe <i>Erklärbarkeit</i>). Zum Beispiel können sie
          Ärzt_innen bei der Diagnose von Brustkrebs <i>unterstützen</i>. Es ist
          wichtig, die Ergebnisse der KI zu verstehen, bevor sie für die weitere
          Behandlung in Betracht gezogen werden.
        </div>
        <div class="text-3xl text-black font-normal leading-relaxed">
          Anhand folgender Merkmale können gutartige von bösartigen Tumore
          unterschieden werden:
        </div>
        <div class="text-3xl text-black font-normal leading-relaxed">
          <div class="text-3xl text-black font-normal leading-relaxed">
            <p>&#9679; Größe des Zellklumpens</p>
            <p>&#9679; Gleichmäßigkeit der Größe der Zellen</p>
            <p>&#9679; Gleichmäßigkeit der Form der Zellen</p>
            <p>&#9679; Dichte des Gewebes</p>
            <p>&#9679; U.v.m.</p>
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
      <div
        onClick={onComplete}
        className="absolute hover:bg-green-700 bg-green-700 rounded-2xl bottom-10 left-10 pl-8 pr-8 shadow-2xl shadow-green-700 opacity-90 text-white btn btn-lg h-25 z-50 border-transparent"
        style={{ fontSize: "60px" }}
      >
        <FontAwesomeIcon icon={faArrowLeftLong} />
      </div>
      {/*<Link to="/appl2">
                <div
                className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                style={{ fontSize: "50pt" }}
                >
                    <FontAwesomeIcon icon={faArrowRightLong} />
                </div>
</Link>*/}
    </div>
  );
}
