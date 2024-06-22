import React from 'react';
import BasicScreen from './BasicScreen';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    InfoWindow,
  } from "@react-google-maps/api";

  const center = {
    lat: -3.745,
    lng: -38.523
  };

interface propState {
    initialTimer: string;
    typeTracking: number;
} 

const containerStyle = {
    width: '400px',
    height: '400px'
  };

const Tracking: React.FC = () => {
    const [timer, setTimer] = React.useState(0);
    const [map, setMap] = React.useState<google.maps.Map | null>(null);
    const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(null);
    //const [distance, setDistance] = React.useState(0);
    const [currentLocation, setCurrentLocation] = React.useState({ lat: 0, lng: 0 });
    const location = useLocation();
    const state = location.state as propState;
    const initialTimer = dayjs(state.initialTimer);
    const [watchId, setWatchId] = React.useState<number | null>(null);
    //const typeTracking = state.typeTracking;

    const updateLocation = () => {
        if (navigator.geolocation) {
            const id = navigator.geolocation.watchPosition((position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });

            setWatchId(id);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyDH2ESCQXqX83KtM8ftceamgB7APflzTFs",
    });

    React.useEffect(() => {
        if (!initialTimer)
            throw new Error('Not implemented');
        startTimer();
        if (navigator.geolocation) {
            const id = navigator.geolocation.watchPosition((position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });

            setWatchId(id);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
         // Cleanup function to stop watching the position when the component unmounts
         return () => {
            if (watchId !== null) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
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

    const onLoad = React.useCallback(function callback(map: google.maps.Map | null) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        if (map) {
            map.fitBounds(bounds);
        }
    
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map: google.maps.Map | null) {
        setMap(null)
      }, [])

    return (
        <BasicScreen name="Go to the Chopper">
            <Box sx={{ flexGrow: 1 }} >
                <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                    <Grid item xs={12} >
                        <div style={{marginTop: '20px'}}>
                        {isLoaded  && 
                                <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={currentLocation}
                                zoom={10}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                              >
                                <Marker position={currentLocation} />
                                <></>
                              </GoogleMap>
                        }
                        </div>
                    </Grid>
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