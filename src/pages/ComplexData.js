import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faArrowLeftLong,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { Stack } from "@mui/material";
import CancelPopup from "../popup/CancelPopup";
import { useState } from "react";

function Complex() {
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
          Entscheidunsbäume bei großen Datenmengen
        </div>
        <div class="text-3xl text-black font-normal leading-relaxed">
          Die Datenpunkte auf der Karte Tübingens haben zwei <i>Merkmale</i>:
          Längen- und Breitengrad. Zusammen bestimmen sie die Position auf der
          Karte.
        </div>

        <div class="text-3xl text-black font-normal leading-relaxed">
          Oft haben Daten deutlich mehr Merkmale. Fische können mit den
          Merkmalen Länge, Gewicht, Anzahl der Flossen, Länge der
          Schwanzflosse u.v.m. beschrieben werden.
        </div>
        <div class="text-3xl text-black font-normal leading-relaxed">
          Eine KI kann in sehr kurzer Zeit einen Entscheidungsbaum berechnen,
          der anhand dieser Merkmale verschiedene Fischarten voneinander
          unterscheiden kann. Auch wenn der Datensatz tausende von Datenpunkten
          enthält. Wir Menschen würden deutlich länger brauchen und könnten
          schnell den Überblick verlieren.
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

export default Complex;
