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
          <iframe
            width="100%"
            height="600"
            src="https://www.youtube.com/embed/iRdXzU33ZQM"
            title="Python Tutorial Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
        </Paper>
      </Box>
    </Container>
  );
}

export default VideoTutorial;
