import { Link } from "react-router-dom";
import * as React from "react";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<<<<<<< HEAD
import {
  faArrowRightLong,
  faArrowLeftLong,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
=======
import { faArrowRightLong, faArrowLeftLong, faXmark, faLaptopCode, faAward } from "@fortawesome/free-solid-svg-icons";

>>>>>>> explanation

function Explanation() {
  const [inactivityTime, setInactivityTime] = useState(0);

  const exitApp = () => {
    window.location.replace("/");
  };

  const resetTime = 150; // seconds
  useEffect(() => {
    const inactivityInterval = setInterval(() => {
      setInactivityTime((inactivityTime) => inactivityTime + 1);
    }, 1000);

    const resetTimer = () => {
      setInactivityTime(0);
    };

    document.addEventListener("click", resetTimer);

    return () => {
      clearInterval(inactivityInterval);
      document.removeEventListener("click", resetTimer);
    };
  }, []);

  useEffect(() => {
    if (inactivityTime > resetTime) {
      exitApp();
    }
  }, [inactivityTime]);

  console.log(inactivityTime);

  return (
    <Stack
      spacing={33}
      direction="column"
      style={{
        /*alignItems: "center", justifyItems: "center",*/ marginTop: "35vh",
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

            <Link to="/rents1">
                <div
                className="absolute hover:cursor-pointer bg-blue-600 rounded-3xl shadow-2xl bg-blue-600 opacity-80 text-white align-middle"
                style={{ fontSize: "50pt", width: "50vw", padding: "20px", textAlign: "center"}}
                >
                    <FontAwesomeIcon icon={faLaptopCode} style={{ marginRight: "50px"}}/>
                    Algorithmus
                </div>
            </Link>
            <Link to="/choose">
                <div
                className="absolute hover:cursor-pointer bg-blue-600 rounded-3xl shadow-2xl bg-blue-600 opacity-80 text-white align-middle"
                style={{ fontSize: "50pt", width: "50vw", padding: "20px", textAlign: "center"}}
                >
                    <FontAwesomeIcon icon={faAward} style={{ marginRight: "50px"}} /> 
                    Fortgeschritten
                </div>
            </Link>
            <Link to="/final">
                <div
                className="absolute hover:cursor-pointer bg-green-700 rounded-3xl bottom-8 pt-2 pb-3 left-8 pl-7 pr-7 shadow-2xl shadow-green-700 opacity-80 text-white"
                style={{ fontSize: "40pt" }}
                >
                    Menü
                </div>
            </Link>
            <Link to="/">
            <div 
                className="absolute hover:cursor-pointer bg-red-700 rounded-3xl /*top-10 right-10 pl-8 pr-8*/ top-8 right-8 pr-20 pl-20 pt-2 shadow-2xl shadow-red-700 opacity-90 text-white btn btn-lg h-25 z-10" 
                style={{ fontSize: "67px", height: "100px", width: "200px"}}            >
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

export default Explanation;
