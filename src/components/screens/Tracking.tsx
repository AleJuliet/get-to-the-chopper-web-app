import React from 'react';
import BasicScreen from './BasicScreen';
import dayjs, { Dayjs } from 'dayjs';
import { useLocation } from 'react-router-dom';
import {  Radio, RadioGroup, FormControlLabel, Box, Button, Typography } from '@mui/material';

interface propState {
    initialTimer: string;
    typeTracking: number;
} 

const Tracking: React.FC = () => {
    const [timer, setTimer] = React.useState(0);
    const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(null);
    const location = useLocation();
    const state = location.state as propState;
    const initialTimer = dayjs(state.initialTimer);
    const typeTracking = state.typeTracking;

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
            <Typography variant="h4" style={{ marginTop: '20px' }}>
                {formatTime(timer)}
            </Typography>
        </BasicScreen>
    );
};

export default Tracking;