import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack";
import * as React from "react";

export default function Rents5() {
  return (
    <div className="column-container">
            <Stack className="space-y-6" direction="column" style={{ marginTop: "13vh", marginLeft: "14.5vw", marginRight: "16.5vw", marginBottom: "7vh" }}>
            <div 
            class="text-6xl mb-10 text-black font-semibold"
            >
                Wie schätzt die KI die Mieten in Tübingen?
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Das Beispiel der Mietpreise ist so gewählt, dass Menschen es nachvollziehen und ihren eigenen Entscheidungsbaum erstellen können.
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
                Eine KI kann nach dem hier beschriebenen Prinzip Entscheidungsbäume auch für viel größere Datenmengen berechnen. 
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
                Gleichzeitig bleiben die Ergebnisse von Entscheidungsbäumen auch bei großen Datenmengen nachvollziehbar. Das macht sie zu einem sehr beliebten Algorithmus.
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
                Unter <i>Fortgeschritten</i> kannst du mehr darüber erfahren.
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
