import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

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
    return(
        <Stack spacing={20} direction="column" style={{ /*alignItems: "center", justifyItems: "center",*/ marginTop: "35vh", marginLeft: "25vw", marginRight: "25vw" }}>
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
            style={{ fontSize: "50pt", width: "50vw", padding: "20px", textAlign: "center"}}
            >
                Komplexe Daten
            </div>
        </Link>
        <Link to="/explanation">
            <div
            className="absolute hover:cursor-pointer bg-blue-600 rounded-3xl shadow-2xl bg-blue-600 opacity-80 text-white align-middle"
            style={{ fontSize: "50pt", width: "50vw", padding: "20px", textAlign: "center"}}
            >
                Nachvollziehbarkeit
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