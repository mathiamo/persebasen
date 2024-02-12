import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from "next/link";
import React from "react";

const pages = [
  {key: 'bislettkalkulator', name: 'Bislettkalkulator'},
  {key: 'opprettloper', name: 'Opprett Løper'},
  {key: 'runners', name: 'Løpere'},
];

function Header() {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar src={'favicon.ico'} alt={'Fast Runner'} sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: {xs: 'none', md: 'flex'},
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Persebasen
          </Typography>

          <Avatar src={'favicon.ico'} alt={'Fast Runner'} sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: {xs: 'flex', md: 'none'},
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Persebasen
          </Typography>
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {pages.map((page) => (
              <Button
                key={page.key}
                sx={{my: 2, color: 'white', display: 'block'}}
              >
                <Link href={`/${page.key}`}>{page.name}</Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;