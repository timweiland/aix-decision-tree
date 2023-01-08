import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import * as React from 'react';

function Rents2() {
  
    return (
        <div
        className="column-container"
        >
            <div 
            class="text"
            style={{ fontSize: "50pt"}}
            >
                <h1><b>Mieten in Tübingen</b></h1>
                <p>Herausfinden bedeutet für die KI berechnen. Dabei führt sie folgenden Algorithmus aus:</p>
                <p>1. Teste eine Unterteilung, fange ganz links am Rand an</p>
                <p>2. Berechne die durchschnittliche Miete in beiden Bereichen</p>
                <p>3. Berechne den Unterschied zwischen den echten Mietpreisen und der durchschnittlichen Miete für beide Bereiche</p>
                <p>4. Speichere die Unterschiede</p>
                <p>5. Teste eine weitere Unterteilung, diesmal ein bisschen weiter rechts</p>
            </div>
            <div>
                <Link to="/rents1">
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
  
export default Rents2;