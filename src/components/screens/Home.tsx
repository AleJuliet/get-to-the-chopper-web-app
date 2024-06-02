import React from 'react';
import BasicScreen from './BasicScreen';
import Modal from '@mui/material/Modal';
import BasicModal from '../modals/BasicModal';
import {  Radio, RadioGroup, FormControlLabel, Box, Button, Typography } from '@mui/material';

const Home: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [typeTracking, setTypeTracking] = React.useState(0);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleTypeTrackingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypeTracking(Number(event.target.value));
    };

    return (
        <BasicScreen name="Go to the Chopper">
            <Box sx={{ height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Start a race
                </Button>
            </Box>
            <Box sx={{ height: '80%', overflowY: 'auto' }}>
                <ul style={{ marginTop: '50px' }}>
                    {/* Render your list items here */}
                </ul>
            </Box>
            <BasicModal
            status={open}
            handleClose={handleClose}>
                <Box>
                    <Typography variant="h5">Select the type of tracking</Typography>
                    <RadioGroup name="trackingType" value={typeTracking} onChange={handleTypeTrackingChange}>
                        <FormControlLabel value={0} control={<Radio />} label="GPS" />
                        <FormControlLabel value={1} control={<Radio />} label="Step counting" />
                    </RadioGroup>
                    {/*Missing time minute picker*/}

                </Box>
            </BasicModal>
        </BasicScreen>
    );
};

export default Home;