"use client";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import React from "react";
import Box from "@mui/material/Box";

function Header() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
                        <Avatar src={'favicon.ico'} alt={'Fast Runner'} sx={{mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                                display: {xs: 'none', md: 'flex'},
                            }}
                        >
                            Persebasen
                        </Typography>

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                flexGrow: 1,
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                                display: {xs: 'flex', md: 'none'},
                            }}
                        >
                            Persebasen
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>


        </AppBar>

    );
}

export default Header;
