import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

function VideoTutorial() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Project Tutorial
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 4,
            mb: 4,
            background: "linear-gradient(135deg, #E3FFFB 0%, #D1F7F7 100%)",
            border: "2px solid #7BDBD4",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <video
            controls
            width="100%"
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <source src="/tourGuide2.mp4" />
            Your browser does not support the video tag.
          </video>
        </Paper>
      </Box>
    </Container>
  );
}

export default VideoTutorial;
