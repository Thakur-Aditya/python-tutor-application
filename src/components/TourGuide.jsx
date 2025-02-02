import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  LinearProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const tourSteps = [
  {
    path: "/",
    title: "Hi there! 👋",
    content: "Ready to learn Python? Let's make coding super fun!",
    position: { top: "70%", left: "25%" },
  },
  {
    path: "/",
    title: "Let's Code! 🚀",
    content: "Click 'Start Coding Now' to begin your adventure!",
    position: { top: "70%", left: "25%" },
  },
  {
    path: "/playground",
    title: "Pick Your Level 🎯",
    content: "Start as a Beginner and level up as you learn!",
    position: { top: "18%", left: "23%" },
  },
  {
    path: "/playground",
    title: "Code Here 💻",
    content: "Type your Python code and watch the magic happen!",
    position: { top: "70%", left: "40%" },
  },
  {
    path: "/playground",
    title: "Run It! 🏃",
    content: "Press Run to see your code in action. Need help? Hit Analyze!",
    position: { top: "85%", left: "40%" },
  },
  {
    path: "/tutorial",
    title: "Watch & Learn 📺",
    content: "Check out our cool videos to learn more tricks!",
    position: { top: "50%", left: "50%" },
  },
  {
    path: "/settings",
    title: "Make It Yours ⚙️",
    content: "Pick your favorite teacher and customize your experience!",
    position: { top: "50%", left: "50%" },
  },
];

function TourGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (hasSeenTour) {
      setIsOpen(false);
    }
  }, []);

  const handleNext = () => {
    const nextStep = currentStep + 1;
    if (nextStep < tourSteps.length) {
      if (tourSteps[nextStep].path !== location.pathname) {
        navigate(tourSteps[nextStep].path);
      }
      setCurrentStep(nextStep);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    const prevStep = currentStep - 1;
    if (prevStep >= 0) {
      if (tourSteps[prevStep].path !== location.pathname) {
        navigate(tourSteps[prevStep].path);
      }
      setCurrentStep(prevStep);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenTour", "true");
  };

  if (!isOpen) return null;

  const currentTourStep = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  return (
    <Dialog
      open={isOpen}
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "250px",
          maxHeight: "150px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #E3FFFB 0%, #D1F7F7 100%)",
          border: "2px solid #7BDBD4",
          position: "fixed",
          ...currentTourStep.position,
          transform: "translate(-50%, -50%)",
          "& .MuiDialogTitle-root": {
            padding: "6px 12px",
            "& .MuiTypography-root": {
              fontSize: "0.9rem",
            },
          },
          "& .MuiDialogContent-root": {
            padding: "6px 12px",
            fontSize: "0.8rem",
            "& .MuiBox-root": {
              marginTop: "6px",
              "& .MuiLinearProgress-root": {
                height: "4px",
              },
              "& .MuiBox-root": {
                marginTop: "2px",
                fontSize: "0.7rem",
              },
            },
          },
          "& .MuiDialogActions-root": {
            padding: "4px",
            "& .MuiButton-root": {
              padding: "2px 6px",
              fontSize: "0.8rem",
              minWidth: "60px",
            },
          },
        },
      }}
    >
      <DialogTitle
        sx={{ textAlign: "center", color: "#7A1CAC", fontWeight: "bold" }}
      >
        {currentTourStep.title}
      </DialogTitle>
      <DialogContent>
        {currentTourStep.content}
        <Box sx={{ mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "#E0E0E0",
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%)",
              },
            }}
          />
          <Box sx={{ mt: 1, textAlign: "center", color: "#666" }}>
            Step {currentStep + 1} of {tourSteps.length}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", p: 2 }}>
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          sx={{
            color: "#7A1CAC",
            "&:disabled": { opacity: 0.5 },
          }}
        >
          Previous
        </Button>
        <Button
          onClick={handleSkip}
          sx={{
            color: "#666",
          }}
        >
          Skip Tour
        </Button>
        <Button
          onClick={handleNext}
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #FF8E8E 0%, #FF6B6B 100%)",
            },
          }}
        >
          {currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TourGuide;
