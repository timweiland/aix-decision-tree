import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack"
import * as React from 'react';

export default function Appl1() {  
    return (
        <div
        className="column-container"
        >
            <Stack className="space-y-8" direction="column" style={{ marginTop: "15vh", marginLeft: "16.5vw", marginRight: "20vw", marginBottom: "7vh" }}>
            <div
            class="text-6xl mb-10 text-black font-semibold"
            >
                Entscheidungsbäume in der Medizin
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Weil sie nachvollziehbar sind, sind Entscheidungsbäume ein sehr beliebter Algorithmus. 
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               In der Medizin können sie Ärzt_innen bei der Diagnose von Brustkrebs unterstützen. Anhand von Aufnahmen von Brustgewebe und Merkmalen wie
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
                <div
                class="text-3xl text-black font-normal leading-relaxed"
                >
                <p>&#9679; Größe des Zellklumpens</p>
                <p>&#9679; Gleichmäßigkeit der Größe der Zellen</p>
                <p>&#9679; Gleichmäßigkeit der Form der Zellen</p>
                <p>&#9679; Dichte des Gewebes</p>
                </div>
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
                unterscheidet die KI zwischen gutartigen und bösartigen Tumoren.
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
                Für die Ärzt_innen und Patient_innen ist es wichtig zu wissen, wieso die KI einen Tumor als gutartig oder bösartig eingestuft hat.
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
            <Link to="/choose">
                <div
                className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                style={{ fontSize: "50pt" }}
                >
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                </div>
            </Link>
            <Link to="/appl2">
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
  
