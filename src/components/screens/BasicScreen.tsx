import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const BasicScreen: React.FC<{ name: string, children: React.ReactNode }> = ({ name, children }) => {
    return (
        <>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {name}
                </Typography>
            </Toolbar>
        </AppBar>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
            {children}
        </Box>
        </>
    );
};

export default BasicScreen;