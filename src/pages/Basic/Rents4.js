import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack"
import * as React from 'react';

export default function Rents4() {  
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
               Die Bereiche können nach dem obigen Verfahren in weitere Unterbereiche unterteilt werden. Auf diese Weise entsteht Schritt für Schritt eine genauere Unterteilung der Karte.
            </div>
            <div
            class="text-base pl-16 pt-30 text-black font-normal"
            >
                Der zugehörige Entscheidungsbaum ist zunehmend verzweigt. Mit jeder neuen Unterteilung wird der Unterschied zwischen den echten Mieten und der durchschnittlichen Miete in dem jeweiligen Bereich kleiner, sodass die Schätzungen der KI am Ende sehr genau werden.
            </div>
            </Stack>

            <div>
                <Link to="/rents3">
                    <div
                    className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                    style={{ fontSize: "50pt" }}
                    >
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                    </div>
                </Link>
            </div>
            <div>
                <Link to="/rents5">
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
  
