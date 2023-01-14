import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack"
import * as React from 'react';

export default function Interpret2() {  
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
               Jede Unterteilung geschieht anhand eines bestimmten <i>Werts</i> dieses Merkmals: Der eine Teil der Daten hat bei diesem Merkmal <i>kleinere</i> Werte, der andere Teil hat <i>größere</i> Werte. 
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Auf der Karte Tübingens wurden die Datenpunkte in jedem Schritt unterteilt in weiter <i>links oder rechts</i>, bzw. weiter <i>oberhalb oder unterhalb</i> der Trennungslinie. 
            </div>
            </Stack>

            <div>
                <Link to="/Interpret1">
                    <div
                    className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                    style={{ fontSize: "50pt" }}
                    >
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                    </div>
                </Link>
            </div>
            <div>
                <Link to="/Interpret3">
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
  
