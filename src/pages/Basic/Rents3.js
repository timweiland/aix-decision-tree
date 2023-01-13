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
                Wie schätzt die KI die Mieten in Tübingen?
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Wenn die KI <i>alle möglichen</i> Unterteilungen von links nach rechts und von oben nach unten getestet hat, wählt sie die <i>beste</i> Unterteilung.
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Am besten ist die Unterteilung, bei der die Unterschiede zwischen den echten Mietpreisen und der durchschnittlichen Miete, gemittelt über beide Bereiche, am <i>kleinsten</i> sind. Es spielen also die Unterschiede für beide Bereiche zusammen eine Rolle.
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
                Die entsprechende Unterteilung resultiert in einer Linie auf der Karte und einer Verzweigung im Entscheidungsbaum.
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
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
  
