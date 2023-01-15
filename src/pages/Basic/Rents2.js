import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack"
import * as React from 'react';

export default function Rents2() {
    const [Counter, setCounter] = useState(1);
  
    return (
      <div className="column-container">
        <Stack className="space-y-8" direction="column" style={{ marginTop: "15vh", marginLeft: "16.5vw", marginRight: "20vw", marginBottom: "7vh" }}>
            <div 
            class="text-6xl mb-10 text-black font-semibold"
            >
                Wie schätzt die KI die Mieten in Tübingen?
            </div>
            <div
            class="text-3xl text-black font-normal leading-relaxed"
            >
               Herausfinden bedeutet für die KI berechnen. Dabei führt sie folgenden Algorithmus aus: 
            </div>
            <div id="addStatement"> </div>
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
            <Link to="/rents1">
                <div
                className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                style={{ fontSize: "50pt" }}
                >
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                </div>
            </Link>
        </div>
            {Counter < 7 ? (
            <div
              className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
              style={{ fontSize: "50pt" }}
              onClick={() => {
                setCounter(Counter + 1);
                addStatement(Counter, "addStatement");
              }}
            >
              {/* <button className="btn btn-lg text-4xl text-white btn-secondary">WEITER</button> */}
              <FontAwesomeIcon icon={faArrowRightLong} />
            </div>
          ) : (
            <div>
                <Link to="/rents3">
                    <div
                    className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 right-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
                    style={{ fontSize: "50pt" }}
                    >
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </div>
                </Link>
            </div>
            
          )}
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
  
  function addStatement(counter, div_id) {
    var theDiv = document.getElementById(div_id);  
    {
      (() => {
        switch (counter) {
          case 1:
            return theDiv.insertAdjacentHTML(
              "beforeend",
              "<div class='text-3xl text-black font-normal leading-relaxed mb-2'> 1. Probiere eine Unterteilung. Fange dafür mit einem Strich ganz links am Rand der Karte an. </div>"
            );
            case 2:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='text-3xl text-black font-normal leading-relaxed mb-2'> 2. Berechne die durchschnittliche Miete in beiden Bereichen. </div>"
          );
        case 3:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='text-3xl text-black font-normal leading-relaxed mb-2'> 3. Berechne den Unterschied zwischen den echten Mietpreisen und der durchschnittlichen Miete für beide Bereiche. </div>"
          );
        case 4:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='text-3xl text-black font-normal leading-relaxed mb-2'> 4. Speichere die Unterschiede. </div>"
          );
        case 5:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='text-3xl text-black font-normal leading-relaxed mb-2'> 5. Probiere eine weitere Unterteilung. Zeichne den Strich diesmal ein bisschen weiter rechts. </div>"
          );
          
        case 6:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='text-3xl text-black font-normal leading-relaxed mb-2 mt-8'> Dieser Algorithmus wird so lange wiederholt, bis alle möglichen Unterteilungen von <i>links nach rechts</i> und von <i>oben nach unten</i> getestet wurden.</div>"
          );
          default:
            return;
        }
      })();
    }
  }