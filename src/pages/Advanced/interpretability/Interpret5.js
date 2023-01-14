import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack"
import * as React from 'react';

export default function Interpret5() {  
    return (
        <div
        className="column-container"
        >
            <Stack className="space-y-8" direction="column" style={{ marginTop: "15vh", marginLeft: "16.5vw", marginRight: "20vw", marginBottom: "7vh" }}>
            <div
            class="text-6xl mb-10 text-black font-semibold"
            >
                Entscheidungsbäume nachvollziehen
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Jede Verzweigung im Baum enthält das Merkmal und seinen Wert, anhand dessen in zwei Gruppen unterteilt wurde.
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
                Wenn man den Entscheidungsbaum vom Beginn bis zu den Enden liest, kann man für jede Gruppe nachvollziehen, hinsichtlich welcher Merkmale die Datenpunkte in dieser Gruppe <i>ähnlich</i> sind.
            </div>
            {/*<div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Aus dieser <i>Ähnlichkeit</i> schließt der Algorithmus, dass es sich bei dieser Gruppe um Datenpunkte mit einem bestimmten Mietpreis oder der gleichen Fischart handelt.
    </div>*/}
            </Stack>

            <div>
                <Link to="/interpret4">
                    <div
                    className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                    style={{ fontSize: "50pt" }}
                    >
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                    </div>
                </Link>
            </div>
            <div>
                <Link to="/interpret6">
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
  
