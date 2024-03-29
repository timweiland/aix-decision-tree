import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faArrowLeftLong,
  faXmark,
  faSync,
  faBook,
  faLaptopCode,
  faLightbulb,
  faArrowUpRightDots,
  faUniversalAccess,
  faHouseMedical,
  faHandPointer,
} from "@fortawesome/free-solid-svg-icons";
import CancelPopup from "../popup/CancelPopup";
import { useState } from "react";
import { reject } from "lodash";

/*
function Choose() {
    return(
        <Stack spacing={4} direction="column" style={{ alignItems: "center", justifyContent: "center", marginTop: "40vh"}}>
                <Button 
                variant='outlined' 
                style={{ fontSize: '63px', width: '35vw'}}>
                    Komplexe Daten
                </Button>
                <Button variant='outlined'
                style={{ fontSize: '63px', width: '35vw' }}>
                    Nachvollziehbarkeit
                </Button>
        </Stack>    
    );
}

export default Choose;
*/

export default function FinalScreen({ restartWithoutTutorial, switchToAppl, switchToInterpret, switchToComplex, switchToRents }) {
  return (
    <div>

      <Stack
        spacing={15}
        direction="column"
        style={{
          //marginTop: "22vh",
          marginLeft: "25vw",
          marginRight: "25vw",
        }}
      >
        <div style={{ marginTop: "22vh" }}>
          <div
            onClick={switchToRents}
            className="absolute hover:cursor-pointer bg-blue-600 rounded-3xl shadow-2xl bg-blue-600 opacity-80 text-white align-middle"
            style={{
              fontSize: "30pt",
              width: "45vw",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faLaptopCode}
              style={{ marginRight: "50px" }}
            />
            Wie schätzt die KI die Mieten?
          </div>
        </div>
        <div>
          <div
            onClick={switchToComplex}
            className="absolute hover:cursor-pointer bg-blue-600 rounded-3xl shadow-2xl bg-blue-600 opacity-80 text-white align-middle"
            style={{
              fontSize: "30pt",
              width: "45vw",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faArrowUpRightDots}
              style={{ marginRight: "50px" }}
            />
            Große Datenmengen
          </div>
        </div>
        <div>
          <div
            onClick={switchToInterpret}
            className="absolute hover:cursor-pointer bg-blue-600 rounded-3xl shadow-2xl bg-blue-600 opacity-80 text-white align-middle"
            style={{
              fontSize: "30pt",
              width: "45vw",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faLightbulb}
              style={{ marginRight: "50px" }}
            />
            Erklärbarkeit
          </div>
        </div>
        <div>
          <div
            onClick={switchToAppl}
            className="absolute hover:cursor-pointer bg-blue-600 rounded-3xl shadow-2xl bg-blue-600 opacity-80 text-white align-middle"
            style={{
              fontSize: "30pt",
              width: "45vw",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faHouseMedical}
              style={{ marginRight: "50px" }}
            />
            Anwendung in der Medizin
          </div>
        </div>
        <div
          onClick={restartWithoutTutorial}
          className="absolute hover:cursor-pointer bg-orange-600 rounded-3xl shadow-2xl opacity-60 text-white align-middle"
          style={{
            fontSize: "30pt",
            width: "45vw",
            padding: "20px",
            textAlign: "center",
            marginTop: "71vh",
          }}
        >
          <FontAwesomeIcon
            icon={faHandPointer}
            style={{ marginRight: "50px" }}
          />
          Nochmal zeichnen
        </div>
      </Stack>
    </div>
  );
}
