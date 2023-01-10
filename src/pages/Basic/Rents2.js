import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack"
import * as React from 'react';

export default function Rents2() {
    const [Counter, setCounter] = useState(1);
  
    return (
      <div className="column-container">
        <Stack spacing={1} direction="column" style={{ marginTop: "5vh", marginLeft: "5vw" }}>
            <div 
            class="text-2xl pl-16 pt-16 text-black font-semibold"
            >
                Mieten in Tübingen
            </div>
            <div
            class="text-base pl-16 pt-30 text-black font-normal"
            >
               Herausfinden bedeutet für die KI berechnen. Dabei führt sie folgenden Algorithmus aus: 
            </div>
            <div id="addStatement"> </div>
        </Stack>

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

            {Counter < 6 ? (
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
              "<div class='text-base pl-16 pt-30 text-black font-normal'> 1. Teste eine Unterteilung, fange ganz links am Rand an. </div>"
            );
            case 2:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='text-base pl-16 pt-30 text-black font-normal'> 2. Berechne die durchschnittliche Miete in beiden Bereichen. </div>"
          );
        case 3:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='text-base pl-16 pt-30 text-black font-normal'> 3. Berechne den Unterschied zwischen den echten Mietpreisen und der durchschnittlichen Miete für beide Bereiche. </div>"
          );
        case 4:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='text-base pl-16 pt-30 text-black font-normal'> 4. Speichere die Unterschiede. </div>"
          );
        case 5:
          return theDiv.insertAdjacentHTML(
            "beforeend",
            "<div class='text-base pl-16 pt-30 text-black font-normal'> 5. Teste eine weitere Unterteilung, diesmal ein bisschen weiter rechts. </div>"
          );
          default:
            return;
        }
      })();
    }
  }