import React from 'react';
import BasicScreen from './BasicScreen';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

interface propState {
    initialTimer: string;
    typeTracking: number;
} 

const Tracking: React.FC = () => {
    const [timer, setTimer] = React.useState(0);
    const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(null);
    //const [distance, setDistance] = React.useState(0);
    const location = useLocation();
    const state = location.state as propState;
    const initialTimer = dayjs(state.initialTimer);
    //const typeTracking = state.typeTracking;

    React.useEffect(() => {
        if (!initialTimer)
            throw new Error('Not implemented');
        startTimer();
    }, []);

    React.useEffect(() => {
        return () => {
          if (intervalId) {
            clearInterval(intervalId);
          }
        };
      }, [intervalId]);

    const stopTimer = () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
    };

    const startTimer = () => {
        const minutes = initialTimer.minute();
        const seconds = initialTimer.second();
        const totalSeconds = minutes * 60 + seconds;
        setTimer(totalSeconds);
        
        //It starts the timer using setInterval and updates the timer state every second.
        const id = setInterval(() => {
            setTimer((prevTimer) => {
            //It stops the timer when it reaches zero and clears the interval.
            if (prevTimer <= 1) {
                clearInterval(id);
                return 0;
            }
            return prevTimer - 1;
            }
        );
        }, 1000);
        setIntervalId(id);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <BasicScreen name="Go to the Chopper">
            <Box sx={{ flexGrow: 1 }} >
                <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                    <Grid item xs={12} >
                        <Typography variant="h2" style={{ marginTop: '20px' }}>
                            ZOMBIE STATUS
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4" style={{ marginTop: '20px' }}>
                            {"Timer: "+formatTime(timer)}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={0} direction="row" sx={{textAlign:"center"}}>
                    <Grid item xs={6}>
                        <Typography variant="h4" style={{ marginTop: '20px' }}>
                            {"Distance: "+formatTime(timer)}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4" style={{ marginTop: '20px' }}>
                            {"Your pace: "+formatTime(timer)}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} direction="row" sx={{textAlign:"center", marginTop: "30px"}}>
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" onClick={stopTimer}>
                            Pause
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" onClick={stopTimer}>
                            Stop
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </BasicScreen>
    );
};

export default Tracking;