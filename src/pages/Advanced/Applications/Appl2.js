import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack"
import * as React from 'react';

export default function Appl2() {  
    return (
        <div
        className="column-container"
        >
            <Stack className="space-y-6" direction="column" style={{ marginTop: "13vh", marginLeft: "14.5vw", marginRight: "16.5vw", marginBottom: "7vh" }}>
                <div
                class="text-6xl mb-10 text-black font-semibold"
                >
                    Entscheidungsbäume bei Krediten
                </div>
                <div
                class="text-3xl text-black font-normal leading-relaxed"
                >
                    Banken können Entscheidungsbäume nutzen, um einzuschätzen, ob eine Person einen Kredit zurückzahlen wird oder nicht. Entsprechend können sie den Kredit bewilligen oder verweigern. 
                </div>
                <div
                class="text-3xl text-black font-normal leading-relaxed"
                >
                    Relevante Merkmale sind unter anderem:
                </div>
                <div
                class="text-3xl text-black font-normal leading-relaxed"
                >
                <p>&#9679; Höhe des Kredits</p>
                <p>&#9679; Ersparnisse</p>
                <p>&#9679; Gehalt</p>
                <p>&#9679; Dauer der aktuellen Anstellung</p>
                </div>
                <div
                class="text-3xl text-black font-normal leading-relaxed"
                >
                    Sollte die KI zu dem Ergebnis kommen, dass der Kredit vermutlich nicht zurückgezahlt werden wird, ist es für die Bank und den_die Antragsteller_in wichtig zu wissen, wieso.
                </div>
            </Stack>

            <Link to="/final">
                <div
                className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-40 pt-2 pb-3 left-8 pl-7 pr-7 shadow-2xl shadow-green-700 opacity-80 text-white"
                style={{ fontSize: "40pt" }}
                >
                    Menü
                </div>
            </Link>
            <Link to="/appl1">
                <div
                className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                style={{ fontSize: "50pt" }}
                >
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                </div>
            </Link>
            <Link to="/choose">
                <div
                className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                style={{ fontSize: "50pt" }}
                >
                    <FontAwesomeIcon icon={faArrowRightLong} />
                </div>
            </Link>
            <Link to="/">
          <div 
              className="absolute hover:cursor-pointer bg-red-700 rounded-3xl /*top-10 right-10 pl-8 pr-8*/ top-8 right-8 pr-20 pl-20 pt-2 shadow-2xl shadow-red-700 opacity-90 text-white btn btn-lg h-25 z-10" 
              style={{ fontSize: "67px", height: "100px", width: "200px"}}            >
                  <FontAwesomeIcon icon={faXmark} />
          </div>
        </Link>  
        </div>  
    );
}
  
