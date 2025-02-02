import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import axios from "axios";
import { RestartAlt } from "@mui/icons-material";

function Settings() {
  const [key, setKey] = useState("");
  const [modal, setModal] = useState("");
  const [character, setCharacter] = useState("friendly");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem("aiApiKey");
    const savedCharacter = localStorage.getItem("tutorCharacter");
    const savedModal = localStorage.getItem("aiModal");
    // if (savedApiKey) setApiKey(savedApiKey);
    if (savedCharacter) setCharacter(savedCharacter);
    if (savedModal) setModal(savedModal);
  }, []);

  const handleSave = async () => {
    const response = await axios.post("http://localhost:3001/api/key", {
      key,
    });

    console.log(response);
    alert(response.data.message);
    if (key) localStorage.setItem("aiApiKey", key);
    localStorage.setItem("tutorCharacter", character);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
  const handleReset = async () => {
    const response = await axios.get("http://localhost:3001/api/reset");

    console.log(response);
    alert(response.data.message);
    // if (apiKey) localStorage.setItem("aiApiKey", apiKey);
    // localStorage.setItem("tutorCharacter", character);
    // // localStorage.setItem("aiModal", modal);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Settings
      </Typography>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            AI Configuration
          </Typography>
          <TextField
            fullWidth
            label="AI API Key (Optional)"
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            margin="normal"
            helperText="Enter your AI API key for enhanced features (optional)"
            className="bg-white shadow-sm"
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Tutor Character
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Tutor Character</InputLabel>
            <Select
              value={character}
              label="Select Tutor Character"
              onChange={(e) => setCharacter(e.target.value)}
            >
              <MenuItem value="friendly">Friendly Professor</MenuItem>
              <MenuItem value="robot">Robot Buddy</MenuItem>
              <MenuItem value="wizard">Code Wizard</MenuItem>
              <MenuItem value="astronaut">Space Explorer</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            size="large"
          >
            Save Settings
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<RestartAlt />}
            onClick={handleReset}
            size="large"
          >
            Reset
          </Button>
        </Box>

        {saved && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Settings saved successfully!
          </Alert>
        )}
      </Paper>
    </Container>
  );
}

export default Settings;
