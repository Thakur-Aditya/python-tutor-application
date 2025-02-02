import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import Settings from "./pages/Settings";
import TourGuide from "./components/TourGuide";
import VideoTutorial from "./pages/VideoTutorial";

function App() {
  return (
    <div className="App">
      <Navbar />
      <TourGuide />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/tutorial" element={<VideoTutorial />} />
      </Routes>
    </div>
  );
}

export default App;
