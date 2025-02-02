import React from "react";
import { Box, Typography, Paper, Container, Button } from "@mui/material";
import { Code } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom color="primary">
          Welcome to Python Tutor for Kids!
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
          }}
        >
          <Typography variant="body1" paragraph>
            Embark on an exciting journey into the world of programming with our
            interactive Python tutor! Designed specifically for young minds, our
            application makes learning Python fun and engaging through
            personalized AI-powered guidance and interactive exercises.
          </Typography>
          <Typography variant="body1" paragraph>
            Our intelligent tutor adapts to your learning style, provides
            instant feedback, and helps you master Python concepts through
            hands-on practice. With customizable characters and interactive
            challenges, learning to code has never been more enjoyable!
          </Typography>
          <Button
            sx={{
              fontSize: "1.2rem",
              py: 1.5,
              px: 4,
              background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #FF8E8E 0%, #FF6B6B 100%)",
              },
            }}
            component={RouterLink}
            to="/playground"
            variant="contained"
            size="large"
            startIcon={<Code />}
            // sx={{ mt: 2 }}
          >
            Start Coding Now
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default Home;
