import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack"
import * as React from 'react';

export default function Rents3() {  
    return (
        <div
        className="column-container"
        >
            <Stack className="space-y-8" direction="column" style={{ marginTop: "15vh", marginLeft: "16.5vw", marginRight: "20vw", marginBottom: "7vh" }}>
            <div
            class="text-6xl mb-10 text-black font-semibold"
            >
                Entscheidungsbäume für große, komplexe Daten
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Im Beispiel der Mieten in Tübingen hat jeder Datenpunkt zwei Merkmale: Längengrad und Breitengrad, zusammen ergeben sie eine bestimmte Position auf der Karte. 
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               In vielen Fällen haben Daten deutlich mehr als zwei Merkmale. Fische können zum Beispiel mit den Merkmalen Länge, Gewicht, Anzahl der Flossen und Länge der Schwanzflosse beschrieben werden.
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Außerdem enthält das Beispiel der Mieten in Tübingen nur knapp 160 Datenpunkte. Das ist sehr wenig.
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Datensätze, welche mehrere Hundert bis Tausend Datenpunkten enthalten, sind in realen Anwendungen keine Seltenheit. 
            </div>
            </Stack>

            <div>
                <Link to="/rents2">
                    <div
                    className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                    style={{ fontSize: "50pt" }}
                    >
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                    </div>
                </Link>
            </div>
            <div>
                <Link to="/rents4">
                    <div
                    className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                    style={{ fontSize: "50pt" }}
                    >
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </div>
                </Link>
            </div>
        </div>  
    );
}
  
