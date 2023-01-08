import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Choose() {
    return(
        <Stack spacing={2} direction="column">
            <Button variant='outlined'>Komplexe Daten</Button>
            <Button variant='outlined'>Nachvollziehbarkeit</Button>
        </Stack>       
    );
}

export default Choose;