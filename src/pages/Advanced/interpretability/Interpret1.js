import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack";
import * as React from "react";

export default function Interpret1() {
  return (
    <div className="column-container">
      <Stack className="space-y-6" direction="column" style={{ marginTop: "13vh", marginLeft: "14.5vw", marginRight: "16.5vw", marginBottom: "7vh" }}>
            <div
            class="text-6xl mb-10 text-black font-semibold"
            >
                Entscheidungsbäume nachvollziehen
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Jedes Mal, wenn die KI eine Linie in die Karte zeichnet, teilt sie die Datenpunkte anhand des Längengrades (mit einer waagerechten Linie) oder des Breitengrades (mit einer senkrechten Linie) auf.
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Längen- und Breitengrad sind die sogenannten Merkmale eines jeden Datenpunkts. Zusammen ergeben sie eine Position auf der Karte.
            </div>
            </Stack>

            <Link to="/final">
                <div
                className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-40 pt-2 pb-3 left-8 pl-7 pr-7 shadow-2xl shadow-green-700 opacity-80 text-white"
                style={{ fontSize: "40pt" }}
                >
                    Menü
                </div>
            </Link>
                <Link to="/choose">
                    <div
                    className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                    style={{ fontSize: "50pt" }}
                    >
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                    </div>
                </Link>
                <Link to="/interpret2">
                    <div
                    className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                    style={{ fontSize: "50pt" }}
                    >
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </div>
                </Link>
                <Link to="/">
          <div 
              className="absolute hover:cursor-pointer bg-red-700 rounded-3xl /*top-10 right-10 pl-8 pr-8*/ top-8 right-8 pr-20 pl-20 pt-2 shadow-2xl shadow-red-700 opacity-90 text-white btn btn-lg h-25 z-10" 
              style={{ fontSize: "67px", height: "100px", width: "200px"}}            >
                  <FontAwesomeIcon icon={faXmark} />
          </div>
        </Link>  
        </div>  
    );
}
