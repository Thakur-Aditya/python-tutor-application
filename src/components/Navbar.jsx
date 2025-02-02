import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { School, Code, Settings, PlayCircle } from "@mui/icons-material";

function Navbar() {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "#7A1CAC",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <School sx={{ mr: 1 }} />
          Python Tutor for Kids
        </Typography>
        <Box>
          <Button
            color="primary"
            component={RouterLink}
            to="/playground"
            startIcon={<Code />}
          >
            Playground
          </Button>
          <Button
            color="primary"
            component={RouterLink}
            to="/tutorial"
            startIcon={<PlayCircle />}
          >
            Tutorial
          </Button>
          <Button
            color="primary"
            component={RouterLink}
            to="/settings"
            startIcon={<Settings />}
          >
            Settings
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
