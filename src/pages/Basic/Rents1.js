
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import * as React from 'react';

function Rents1() {
  
    return (
        <div
        className="column-container"
        >
            <div 
            class="text"
            style={{ fontSize: "50pt"}}
            >
                <h1><b>Mieten in Tübingen</b></h1>
                <p>Um die Mieten in den verschiedenen Stadtteilen gut zu schätzen, muss die KI herausfinden, wo auf der Karte die Mieten möglichst ähnlich sind und diese von Bereichen mit anderen Mietpreisen unterscheiden. </p>

            </div>
            {/*<div
            class="body"
            style={ {fontsize: "30pt"}}
            >
                <p>Um die Mieten in den verschiedenen Stadtteilen gut zu schätzen, muss die KI herausfinden, wo auf der Karte die Mieten möglichst ähnlich sind und diese von Bereichen mit anderen Mietpreisen unterscheiden. </p>
            </div>*/}
            <div>
                <Link to="/explanation">
                    <div
                    className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                    style={{ fontSize: "50pt" }}
                    >
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                    </div>
                </Link>
            </div>
            <div>
                <Link to="/rents2">
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
  
export default Rents1;