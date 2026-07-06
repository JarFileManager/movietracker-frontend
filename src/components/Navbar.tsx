import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();

    navigate("/login");
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          🎬 MovieTracker
        </Typography>

        <Button color="inherit" component={Link} to="/home">
          Home
        </Button>

        <Button color="inherit" component={Link} to="/search">
          Search
        </Button>

        <Button color="inherit" component={Link} to="/watched">
          Watched
        </Button>

        <Button color="inherit" component={Link} to="/reviews">
          Reviews
        </Button>

        <Button color = "inherit" component={Link} to="/preferences">
          Preferences
        </Button>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
