import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack"
import * as React from 'react';

export default function Interpret1() {  
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
               Die Datenpunkte haben zwei Merkmale: Längengrad und Breitengrad, zusammen ergeben sie eine bestimmte Position auf der Karte. 
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Die KI zeichnet Schritt für Schritt entweder eine waagerechte oder eine senkrechte Linie in die Karte ein.
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               In jedem Schritt teilt sie die Datenpunkte anhand eines ihrer beiden Merkmale auf, entweder Breitengrad (waagerechte Linie) oder Längengrad (senkrechte Linie).
            </div>
            </Stack>

            <div>
                <Link to="/choose">
                    <div
                    className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                    style={{ fontSize: "50pt" }}
                    >
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                    </div>
                </Link>
            </div>
            <div>
                <Link to="/interpret2">
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
  
