import { Link } from "react-router-dom";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'

function Explanation() {
    return(
        <Stack spacing={4} direction="column" style={{ alignItems: "center", justifyContent: "center", marginTop: "40vh"}}>
            <Link to='/rents1'>
                <Button 
                variant='outlined' 
                style={{ fontSize: '63px', width: '35vw'}}>
                    Grundlagen
                </Button>
            </Link>
            <Link to='/choose'>
                <Button variant='outlined'
                style={{ fontSize: '63px', width: '35vw' }}>
                    Fortgeschritten
                </Button>
            </Link>            
        </Stack>    
    );
}

export default Explanation;

