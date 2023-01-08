import { Link } from "react-router-dom";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Explanation() {
    return(
        <Stack spacing={2} direction="column">
            <Link to="/rents1">
                <Button variant='outlined'>Grundlagen</Button>
            </Link>
            <Link to="/choose">
                <Button variant='outlined'>Fortgeschritten</Button>
            </Link>            
        </Stack>       
    );
}

export default Explanation;