import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack"
import * as React from 'react';

export default function Rents5() {  
    return (
        <div
        className="column-container"
        >
            <Stack spacing={1} direction="column" style={{ marginTop: "5vh", marginLeft: "5vw" }}>
            <div 
            class="text-2xl pl-16 pt-16 text-black font-semibold"
            >
                Mieten in Tübingen
            </div>
            <div
            class="text-base pl-16 pt-30 text-black font-normal"
            >
               Das Beispiel der Mietpreise ist so gewählt, dass Menschen es nachvollziehen und ihren eigenen Entscheidungsbaum erstellen können.
            </div>
            <div
            class="text-base pl-16 pt-30 text-black font-normal"
            >
                Eine KI kann nach dem hier beschriebenen Prinzip Entscheidungsbäume auch für viel komplexere Daten berechnen. 
            </div>
            <div
            class="text-base pl-16 pt-30 text-black font-normal"
            >
                Gleichzeitig bleiben die Ergebnisse/Vorhersagen von Entscheidungsbäumen auch bei komplexen Daten interpretierbar. Das macht sie zu einem sehr beliebten Algorithmus.
            </div>
            <div
            class="text-base pl-16 pt-30 text-black font-normal"
            >
                Unter <i>Fortgeschrittenes</i> kannst du mehr darüber erfahren.
            </div>
            </Stack>

            <div>
                <Link to="/rents4">
                    <div
                    className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                    style={{ fontSize: "50pt" }}
                    >
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                    </div>
                </Link>
            </div>
            <div>
                <Link to="/explanation">
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
  
