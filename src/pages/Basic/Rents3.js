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
            <Stack spacing={1} direction="column" style={{ marginTop: "5vh", marginLeft: "5vw" }}>
            <div 
            class="text-2xl pl-16 pt-16 text-black font-semibold"
            >
                Mieten in Tübingen
            </div>
            <div
            class="text-base pl-16 pt-30 text-black font-normal"
            >
               Wenn die KI <i>alle möglichen</i> Unterteilungen von links nach rechts und von oben nach unten getestet hat, wählt sie die <i>beste</i> Unterteilung.
            </div>
            <div
            class="text-base pl-16 pt-30 text-black font-normal"
            >
               Am besten ist die Unterteilung, bei der die Unterschiede zwischen den echten Mietpreisen und der durchschnittlichen Miete, gemittelt über beide Bereiche, am <i>kleinsten</i> sind. Es spielen also die Unterschiede für beide Bereiche zusammen eine Rolle.
            </div>
            <div
            class="text-base pl-16 pt-30 text-black font-normal"
            >
                Die entsprechende Unterteilung resultiert in einer Linie auf der Karte und einer Verzweigung im Entscheidungsbaum.
            </div>
            <div
            class="text-base pl-16 pt-30 text-black font-normal"
            >
                Die Schätzungen der KI entsprechen den durchschnittlichen Mieten in den jeweiligen Bereichen.
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
  
