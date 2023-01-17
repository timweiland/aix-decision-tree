import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack";
import * as React from "react";
import fish_2 from "../../../assets/fish_2.jpg";

export default function Interpret5() {  
    return (
        <div
        className="column-container"
        >
            <Stack className="space-y-6" direction="column" style={{ marginTop: "13vh", marginLeft: "14.5vw", marginRight: "16.5vw", marginBottom: "7vh" }}>
            <div
            class="text-6xl mb-10 text-black font-semibold"
            >
                Entscheidungsbäume nachvollziehen
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Bei Datenpunkten mit mehreren Merkmalen lässt sich die Unterteilung nicht mehr anhand einer Karte nachvollziehen. Hier hilft der Entscheidungsbaum weiter.
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Jede Verzweigung im Entscheidungsbaum enthält das Merkmal und seinen Wert, anhand dessen in zwei Gruppen unterteilt wurde.
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
                Wenn man den Entscheidungsbaum vom Beginn bis zu den Enden liest, kann man für jede Gruppe nachvollziehen, hinsichtlich welcher Merkmale die Datenpunkte in dieser Gruppe <i>ähnlich</i> sind.
            </div>
            <div>
                <img style={{ height: "48vh", marginLeft: "-4.5vw", marginTop: "-10vh" }} src={fish_2} alt="fish_2" />    
            </div>         
            
            {/*<div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Aus dieser <i>Ähnlichkeit</i> schließt der Algorithmus, dass es sich bei dieser Gruppe um Datenpunkte mit einem bestimmten Mietpreis oder der gleichen Fischart handelt.
    </div>*/}
      </Stack>

      <Link to="/final">
        <div
          className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-40 pt-2 pb-3 left-8 pl-7 pr-7 shadow-2xl shadow-green-700 opacity-80 text-white"
          style={{ fontSize: "40pt" }}
        >
          Menü
        </div>
      </Link>
      <Link to="/interpret3">
        <div
          className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
          style={{ fontSize: "50pt" }}
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </div>
      </Link>
      <Link to="/choose">
        <div
          className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
          style={{ fontSize: "50pt" }}
        >
          <FontAwesomeIcon icon={faArrowRightLong} />
        </div>
      </Link>
      <Link to="/">
        <div
          className="absolute hover:cursor-pointer bg-red-700 rounded-2xl top-10 right-10 pl-8 pr-8 shadow-2xl shadow-red-700 opacity-90 text-white btn btn-lg h-25 z-10 border-transparent"
          style={{ fontSize: "60px" }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </Link>
    </div>
  );
}
