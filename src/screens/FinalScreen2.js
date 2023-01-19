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
  faHouseMedical
} from "@fortawesome/free-solid-svg-icons";

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

export default function FinalScreen({ restartWithoutTutorial, exitApp }) {
  return (
    <Stack
      spacing={15}
      direction="column"
      style={{
        marginTop: "22vh",
        marginLeft: "25vw",
        marginRight: "25vw",
      }}
    >
     <div>
      <Link to="/explanation">
        <div
          className="absolute hover:cursor-pointer bg-blue-600 rounded-3xl shadow-2xl bg-blue-600 opacity-80 text-white align-middle"
          style={{
            fontSize: "30pt",
            width: "45vw",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <FontAwesomeIcon icon={faLaptopCode} style={{ marginRight: "50px" }} />
          Wie schätzt die KI die Mieten?
        </div>
      </Link>
      </div>
      <div>
      <Link to="/explanation">
        <div
          className="absolute hover:cursor-pointer bg-blue-600 rounded-3xl shadow-2xl bg-blue-600 opacity-80 text-white align-middle"
          style={{
            fontSize: "30pt",
            width: "45vw",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <FontAwesomeIcon icon={faArrowUpRightDots} style={{ marginRight: "50px" }} />
          Große Datenmengen
        </div>
      </Link>
      </div>
      <div>
      <Link to="/explanation">
        <div
          className="absolute hover:cursor-pointer bg-blue-600 rounded-3xl shadow-2xl bg-blue-600 opacity-80 text-white align-middle"
          style={{
            fontSize: "30pt",
            width: "45vw",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <FontAwesomeIcon icon={faLightbulb} style={{ marginRight: "50px" }} />
          Erklärbarkeit
        </div>
      </Link>
      </div>
      <div>
      <Link to="/explanation">
        <div
          className="absolute hover:cursor-pointer bg-blue-600 rounded-3xl shadow-2xl bg-blue-600 opacity-80 text-white align-middle"
          style={{
            fontSize: "30pt",
            width: "45vw",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <FontAwesomeIcon icon={faHouseMedical} style={{ marginRight: "50px" }} />
          Anwendung in der Medizin
        </div>
      </Link>        
      </div> 
      <div
        class="absolute hover:cursor-pointer bg-orange-600 rounded-3xl shadow-2xl opacity-60 text-white align-middle"
        style={{
          fontSize: "30pt",
          width: "45vw",
          padding: "20px",
          textAlign: "center",
          marginTop: "48vh"
        }}
        onClick={restartWithoutTutorial}
      >
        <FontAwesomeIcon icon={faSync} style={{ marginRight: "50px" }} />
        Wiederholen
      </div>  
      
      <Link to="/">
        <div
          className="absolute hover:cursor-pointer bg-red-700 rounded-2xl top-10 right-10 pl-8 pr-8 shadow-2xl shadow-red-700 opacity-90 text-white btn btn-lg h-25 z-10 border-transparent"
          style={{ fontSize: "60px" }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </Link>
    </Stack>
  );
}
