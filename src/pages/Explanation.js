import { Link } from "react-router-dom";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";


function Explanation() {
    return(
        <Stack spacing={20} direction="column" style={{ /*alignItems: "center", justifyItems: "center",*/ marginTop: "35vh", marginLeft: "25vw", marginRight: "25vw" }}>
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
                Grundlagen
            </div>
        </Link>
        <Link to="/choose">
            <div
            className="absolute hover:cursor-pointer bg-blue-600 rounded-3xl shadow-2xl bg-blue-600 opacity-80 text-white align-middle"
            style={{ fontSize: "50pt", width: "50vw", padding: "20px", textAlign: "center"}}
            >
                Fortgeschritten
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

