import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
          Recycling Service
        </Typography>
        <Button color="inherit" component={Link} to="/">Angebote</Button>
        <Button color="inherit" component={Link} to="/about">Über uns</Button>
        <Button color="inherit" component={Link} to="/contact">Kontakt</Button>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/register">Registrieren</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;