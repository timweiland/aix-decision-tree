import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faArrowLeftLong,
  faXmark,
  faLightbulb,
  faArrowUpRightDots,
  faUniversalAccess,
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

export default function Choose() {
  return (
    <Stack
      spacing={22}
      direction="column"
      style={{
        /*alignItems: "center", justifyItems: "center",*/ marginTop: "25vh",
        marginLeft: "25vw",
        marginRight: "25vw",
      }}
    >
      {/*<Link to='/rents1'>
                <Button 
                variant='outlined' 
                style={{ fontSize: '63px', width: '50vw'}}>
                    Grundlagen
                </Button>
    </Link>*/}

      <Link to="/complex1">
        <div
          className="absolute hover:cursor-pointer bg-blue-600 rounded-3xl shadow-2xl bg-blue-600 opacity-80 text-white align-middle"
          style={{
            fontSize: "50pt",
            width: "50vw",
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
      </Link>
      <Link to="/interpret1">
        <div
          className="absolute hover:cursor-pointer bg-blue-600 rounded-3xl shadow-2xl bg-blue-600 opacity-80 text-white align-middle"
          style={{
            fontSize: "50pt",
            width: "50vw",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <FontAwesomeIcon icon={faLightbulb} style={{ marginRight: "50px" }} />
          Nachvollziehbarkeit
        </div>
      </Link>
      <Link to="/appl1">
        <div
          className="absolute hover:cursor-pointer bg-blue-600 rounded-3xl shadow-2xl bg-blue-600 opacity-80 text-white align-middle"
          style={{
            fontSize: "50pt",
            width: "50vw",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faUniversalAccess}
            style={{ marginRight: "50px" }}
          />
          Anwendungen
        </div>
      </Link>
      <Link to="/final">
        <div
          className="absolute hover:bg-green-700 bg-green-700 rounded-3xl bottom-40 pt-2 pb-3 left-8 pl-8 pr-7 shadow-2xl shadow-green-700 opacity-80 text-white"
          style={{ fontSize: "40pt" }}
        >
          Menü
        </div>
      </Link>
      <Link to="/explanation">
        <div
          className="absolute hover:bg-green-700 bg-green-700 rounded-3xl bottom-8 left-8 pl-16 pr-16 shadow-2xl shadow-green-700 opacity-80 text-white"
          style={{ fontSize: "50pt" }}
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </div>
      </Link>
      <Link to="/">
        <div
          className="absolute hover:bg-red-700 bg-red-700 rounded-3xl /*top-10 right-10 pl-8 pr-8*/ top-8 right-8 pr-20 pl-20 pt-2 shadow-2xl shadow-red-700 opacity-90 text-white btn btn-lg h-25 z-10"
          style={{ fontSize: "67px", height: "100px", width: "200px" }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </Link>

      {/*<Link to='/choose'>
            <Button variant='outlined'
            style={{ fontSize: '63px', width: '50vw' }}>
                Fortgeschritten
            </Button>
</Link>*/}
    </Stack>
  );
}
