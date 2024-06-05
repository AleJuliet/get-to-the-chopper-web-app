import React from 'react';
import BasicScreen from './BasicScreen';
import BasicModal from '../modals/BasicModal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useNavigate } from "react-router-dom";
import {  Radio, RadioGroup, FormControlLabel, Box, Button, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';

const Home: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [time, setTime] = React.useState<string>("");
    const [typeTracking, setTypeTracking] = React.useState(0);
    const handleOpen = () => setOpen(true);
    const navigate = useNavigate();

    const handleTypeTrackingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypeTracking(Number(event.target.value));
    };

    const handleTimeChange = (newValue: Dayjs | null) => {
        setTime(newValue ? newValue.toString() : "");
    };

    const handleClose = () => {
        setOpen(false);
        navigate('/tracking', 
        { state: { initialTimer: time, typeTracking: typeTracking } });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* LocalizationProvider sets up the localization context for date and time pickers.
            . It is used to set up the localization context for date and time pickers
            . AdapterDayjs is an adapter that bridges the @mui/x-date-pickers library with the dayjs library.  */}
        <BasicScreen name="Go to the Chopper / Tracking">
            <Box sx={{ height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Create a race
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
                    <Typography variant="h6">Select the type of tracking</Typography>
                    <RadioGroup name="trackingType" value={typeTracking} onChange={handleTypeTrackingChange}>
                        <FormControlLabel value={0} control={<Radio />} label="GPS" />
                        <FormControlLabel value={1} control={<Radio />} label="Step counting" />
                    </RadioGroup>
                    <div style={{ marginTop: '20px' }}></div>
                    <Typography variant="h6">Select the length of training</Typography>
                    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                        <TimePicker views={['minutes', 'seconds']} format="mm:ss" onChange={handleTimeChange} />
                    </div>
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" color="primary" onClick={handleClose}>
                            Start
                        </Button>
                    </div>
                </Box>
            </BasicModal>
        </BasicScreen>
        </LocalizationProvider>
    );
};

export default Home;