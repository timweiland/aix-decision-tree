import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack"
import * as React from 'react';

export default function Interpret4() {  
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
               Bei Datenpunkten mit mehreren Merkmalen lässt sich die Unterteilung nicht mehr auf einer Karte visualisieren. Hier hilft der Entscheidungsbaum weiter.
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
                Jede Verzweigung im Baum enthält das Merkmal und seinen Wert, anhand dessen in zwei Gruppen unterteilt wurde.
            </div>
            <div>
                Wenn man den Entscheidungsbaum vom Beginn bis zu den Enden liest, kann man für jede Gruppe nachvollziehen, hinsichtlich welcher Merkmale die Datenpunkte in den Gruppen <i>ähnlich</i> sind.
            </div>
            </Stack>

            <div>
                <Link to="/Interpret3">
                    <div
                    className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                    style={{ fontSize: "50pt" }}
                    >
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                    </div>
                </Link>
            </div>
            <div>
                <Link to="/Interpret5">
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
  
