import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  CircularProgress,
  Alert,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  PlayArrow,
  RestartAlt,
  School,
  Lightbulb as LightbulbIcon,
} from "@mui/icons-material";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { dracula } from "@uiw/codemirror-theme-dracula";
import curriculum from "../data/curriculum.js";

function Playground() {
  // Core state
  const [code, setCode] = useState("# Write your Python code here\n");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const loadingg = false;

  // Input handling state
  const [currentInput, setCurrentInput] = useState("");
  const [inputHistory, setInputHistory] = useState([]);
  const [inputRequired, setInputRequired] = useState(false);

  // Curriculum state
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("basics");
  const [conversation, setConversation] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Constants
  const [tutorCharacter, setTutorCharacter] = useState(
    localStorage.getItem("tutorCharacter") || "friendly"
  );
  const apiKey = localStorage.getItem("aiApiKey");

  useEffect(() => {
    const handleStorageChange = () => {
      const newCharacter = localStorage.getItem("tutorCharacter");
      if (newCharacter) {
        setTutorCharacter(newCharacter);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  //   const totalChapters = curriculum[selectedDifficulty]?.chapters?.length || 0;

  const difficultyLevels = [
    { value: "basics", label: "Beginner", color: "primary", icon: "🌟" },
    {
      value: "intermediate",
      label: "Intermediate",
      color: "secondary",
      icon: "🚀",
    },
    { value: "advanced", label: "Advanced", color: "error", icon: "🏆" },
  ];

  const getTutorPersonality = () => {
    switch (tutorCharacter) {
      case "friendly":
        return "I am Professor Py, your friendly Python teacher! I love helping young minds discover the joy of coding. Let's learn together and make programming fun! Remember, every mistake is a chance to learn something new. 🎓";
      case "robot":
        return "GREETINGS YOUNG PROGRAMMER! *beep* I am RoboCode-3000, your robotic Python instructor. *boop* My primary directive is to help you master programming with maximum efficiency. *whir* Initiating learning protocols... Ready to compute! 🤖";
      case "wizard":
        return "Greetings, young apprentice! I am Merlin.py, the Code Wizard of the Digital Realm. Together we shall unravel the mystical arts of Python programming. Remember, every spell (code) must be cast with precision and purpose! 🧙‍♂️";
      case "astronaut":
        return "Houston, we are ready for launch! This is Captain Cosmos of the SS Python, your space explorer coding companion. Let's venture into the vast universe of programming together! Remember, in code as in space, the sky is not the limit! 🚀";
      default:
        return "I am your Python tutor! Let's embark on this coding journey together!";
    }
  };

  const handleCodeRun = async () => {
    // setLoading(true);
    setError("");

    // Process input string into array of inputs
    const inputs = currentInput.trim() ? currentInput.split("\n") : [];
    setInputHistory(inputs);
    setOutput("");

    try {
      const response = await axios.post("http://localhost:3001/api/execute", {
        code,
        inputs,
        tutorPersonality: getTutorPersonality(),
      });

      setOutput(response.data.output.output || "");
      setConversation((prev) => [...prev, { role: "user", content: code }]);
      setInputRequired(false);
      setInputHistory([]);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        "An error occurred while executing the code.";
      setError(errorMessage);
      console.error("Code execution error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeAnalysis = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/api/analyze", {
        code,
        messages: [
          { role: "system", content: getTutorPersonality() },
          {
            role: "user",
            content: `Here's my Python code:\n${code}\nCan you help me understand what it does and if there are any issues?`,
          },
        ],
        apiKey,
      });
      console.log(response);

      const aiResponse = response.data.analysis;
      console.log(aiResponse);
      setConversation((prev) => [
        ...prev,
        { role: "user", content: code },
        { role: "assistant", content: aiResponse },
      ]);
      // Remove AI analysis from program output
      console.log(output);
      setLoading(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        "Oops! Something went wrong. Please try again.";
      if (
        errorMessage.includes("API key") ||
        errorMessage.includes("quota exceeded")
      ) {
        setError(
          "You've reached the free usage limit. Please add your API key in Settings to continue using enhanced features."
        );
      } else {
        setError(errorMessage);
      }
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCode("# Write your Python code here\n");
    setOutput("");
    setError("");
    setConversation([]);
    setInputHistory([]);
    setInputRequired(false);
    setCurrentInput("");
  };

  const totalChapters = curriculum[selectedDifficulty]?.chapters?.length || 0;

  useEffect(() => {
    if (
      curriculum[selectedDifficulty]?.chapters &&
      curriculum[selectedDifficulty].chapters.length > 0
    ) {
      const chapter =
        curriculum[selectedDifficulty].chapters[currentChapterIndex];
      setCurrentChapter(chapter);
      setCurrentExercise(chapter.exercise);
      setCode(chapter.exercise.startingCode);
      setOutput(chapter.exercise.description);
    }
  }, [selectedDifficulty, currentChapterIndex]);

  useEffect(() => {
    // Reset chapter index when difficulty changes
    setCurrentChapterIndex(0);
  }, [selectedDifficulty]);

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < totalChapters - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="primary"
          sx={{ alignSelf: "center", mb: 3 }}
        >
          Python Playground
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
          <FormControl sx={{ mb: 3, width: 250, alignSelf: "center" }}>
            {" "}
            <InputLabel>Difficulty Level</InputLabel>
            <Select
              value={selectedDifficulty}
              label="Difficulty Level"
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              sx={{
                backgroundColor: "#FFFFFF",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  fontSize: "1.1rem",
                  padding: "12px 16px",
                  color: "#2D3748",
                  fontWeight: 600,
                },
                "&:hover": {
                  backgroundColor: "#F7FAFC",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4ECDC4",
                  borderWidth: 2,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiInputLabel-root": {
                  backgroundColor: "black",
                  padding: "0 8px",
                  "&.Mui-focused": {
                    color: "black",
                  },
                },
              }}
            >
              {difficultyLevels.map((level) => (
                <MenuItem
                  key={level.value}
                  value={level.value}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: "1.1rem",
                    padding: "12px 16px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background:
                        level.color === "primary"
                          ? "linear-gradient(135deg, #FFE5E5 0%, #FFD1D1 100%)"
                          : level.color === "secondary"
                          ? "linear-gradient(135deg, #E3FFFB 0%, #D1F7F7 100%)"
                          : "linear-gradient(135deg, #FFE1E1 0%, #FFB1B1 100%)",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <span style={{ fontSize: "1.2rem", marginRight: "8px" }}>
                    {level.icon}
                  </span>
                  {level.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              padding: "2rem 0",
            }}
          >
            <Box
              sx={{
                width: "80%",
                height: "12px",
                background: "#f1f1f1",
                borderRadius: "6px",
                position: "relative",
                overflow: "hidden",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${
                    ((currentChapterIndex + 1) / totalChapters) * 100
                  }%`,
                  background:
                    "linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%)",
                  transition: "width 0.3s ease-in-out",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <IconButton
                onClick={handlePrevChapter}
                disabled={currentChapterIndex === 0}
                sx={{
                  bgcolor: "background.paper",
                  "&:hover": { bgcolor: "background.paper" },
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">&lt;</Typography>
              </IconButton>
              {currentChapter && (
                <Button
                  variant={
                    currentExercise === currentChapter.exercise
                      ? "contained"
                      : "outlined"
                  }
                  color={
                    difficultyLevels.find((l) => l.value === selectedDifficulty)
                      ?.color || "primary"
                  }
                  onClick={() => {
                    setCurrentExercise(currentChapter.exercise);
                    setCode(currentChapter.exercise.startingCode);
                    setOutput(currentChapter.exercise.description);
                  }}
                  sx={{
                    minWidth: "200px",
                    position: "relative",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  {currentChapter.title}
                </Button>
              )}
              <IconButton
                onClick={handleNextChapter}
                disabled={currentChapterIndex === totalChapters - 1}
                sx={{
                  bgcolor: "background.paper",
                  "&:hover": { bgcolor: "background.paper" },
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">&gt;</Typography>
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Chapter {currentChapterIndex + 1} of {totalChapters}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              background: "linear-gradient(135deg, #FFE5E5 0%, #FFD1D1 100%)",
              border: "2px solid #FF8E8E",
              borderRadius: "16px",
              mb: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="h6">Code Editor</Typography>
              <IconButton
                onMouseDown={() => {
                  if (currentChapter?.exercise?.solution) {
                    setOutput(
                      `Solution Hint:\n${currentChapter.exercise.solution}`
                    );
                  }
                }}
                onMouseUp={() => {
                  setOutput(currentChapter?.exercise?.description || "");
                }}
                onMouseLeave={() => {
                  setOutput(currentChapter?.exercise?.description || "");
                }}
                sx={{
                  color: "#7A1CAC",
                  "&:hover": {
                    animation: "glow 1s ease-in-out infinite alternate",
                    "@keyframes glow": {
                      from: {
                        boxShadow:
                          "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #7A1CAC",
                      },
                      to: {
                        boxShadow:
                          "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #FFD700",
                      },
                    },
                  },
                }}
              >
                <LightbulbIcon />
              </IconButton>
            </Box>
            <CodeMirror
              value={code}
              height="300px"
              theme={dracula}
              extensions={[python()]}
              onChange={(value) => setCode(value)}
              style={{
                backgroundColor: "#2D3748",
                padding: "12px",
                fontSize: "14px",
                borderRadius: "4px",
                border: "1px solid rgba(0, 0, 0, 0.23)",
              }}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Program Input (one per line)
              </Typography>
              <TextField
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Enter your program inputs here (one per line)"
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCodeRun}
                  disabled={loadingg}
                  startIcon={
                    loadingg ? <CircularProgress size={20} /> : <PlayArrow />
                  }
                >
                  Run Code
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCodeAnalysis}
                  disabled={loading}
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <School />
                  }
                  sx={{
                    position: "relative",
                    transition: "all 0.3s ease",
                    "&:disabled": {
                      backgroundColor: "#7BDBD4",
                      opacity: 0.8,
                      transform: "scale(0.98)",
                    },
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {loading ? "Analyzing..." : "Analyse Code"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  startIcon={<RestartAlt />}
                >
                  Reset
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Box
          sx={{
            position: "fixed",
            cursor: "move",
            zIndex: 9999,
            userSelect: "none",
            transition: "transform 0.1s",
            "&:active": {
              transform: "scale(1.05)",
            },
            "&:hover": {
              filter: "brightness(1.1)",
            },
          }}
          onMouseDown={(e) => {
            const box = e.currentTarget;
            const startX = e.clientX - box.offsetLeft;
            const startY = e.clientY - box.offsetTop;

            const handleMouseMove = (e) => {
              box.style.left = `${e.clientX - startX}px`;
              box.style.top = `${e.clientY - startY}px`;
            };

            const handleMouseUp = () => {
              document.removeEventListener("mousemove", handleMouseMove);
              document.removeEventListener("mouseup", handleMouseUp);
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
          }}
        >
          <img
            src={`/${tutorCharacter}-Photoroom.jpg`}
            alt={`${tutorCharacter} character`}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "50%",
              border: "3px solid #4ECDC4",
              boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
            }}
          />
        </Box>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              minHeight: "315px",
              maxHeight: "315px",
              background: "linear-gradient(135deg, #E3FFFB 0%, #D1F7F7 100%)",
              border: "2px solid #7BDBD4",
              borderRadius: "16px",
              mb: 3,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Program Output
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box sx={{ whiteSpace: "pre-wrap" }}>
              {output || "Run your code to see the output!"}
            </Box>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              minHeight: "315px",
              maxHeight: "315px",
              background: "linear-gradient(135deg, #F3E7FF 0%, #E7D1FF 100%)",
              border: "2px solid #7A1CAC",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" gutterBottom>
              AI Tutor Analysis
            </Typography>
            <Box
              sx={{
                whiteSpace: "pre-wrap",
                overflowY: "auto",
                flex: 1,
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#7A1CAC",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#5A147F",
                },
              }}
            >
              {conversation.length > 0
                ? conversation[conversation.length - 1].role === "assistant"
                  ? conversation[conversation.length - 1].content
                  : "Click 'Analyse Code' to get AI tutor feedback!"
                : "Click 'Analyse Code' to get AI tutor feedback!"}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Playground;
