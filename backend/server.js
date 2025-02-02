require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { PythonShell } = require("python-shell");
const path = require("path");
const fs = require("fs");
const os = require("os");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

var api_key = process.env.GEMINI_API_KEY;

// Execute Python code
async function executePythonCode(code, inputs = []) {
  return new Promise((resolve, reject) => {
    // Create a temporary file
    const tempDir = os.tmpdir();
    const tempFilename = path.join(tempDir, `temp-${Date.now()}.py`);
    fs.writeFileSync(tempFilename, code);

    const options = {
      mode: "text",
      pythonPath: "python3",
      pythonOptions: ["-u"],
    };

    const pyshell = new PythonShell(tempFilename, options);
    let output = "";
    let error = "";

    // Send all inputs upfront
    inputs.forEach((input) => {
      pyshell.send(input);
    });

    pyshell.on("message", (message) => {
      output += message + "\n";
    });

    pyshell.on("stderr", (stderr) => {
      error += stderr + "\n";
    });

    pyshell.end((err) => {
      // Cleanup the temporary file
      fs.unlink(tempFilename, (unlinkErr) => {
        if (unlinkErr) console.error("Error deleting temp file:", unlinkErr);
      });

      if (err) {
        reject(error.trim() || err.message);
      } else {
        resolve({
          output: output.trim(),
        });
      }
    });
  });
}

// API Routes
app.post("/api/execute", async (req, res) => {
  try {
    const { code, inputs } = req.body;
    console.log("Code: ", code);
    console.log("Inputs: ", inputs);
    const output = await executePythonCode(code, inputs);
    console.log("Output: ", output);
    res.json({ success: true, output });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString() });
  }
});

app.post("/api/key", async (req, res) => {
  try {
    const { key } = req.body;
    console.log("Key: ", key);
    // console.log(process.env.GEMINI_API_KEY)
    if (key === "")
      res.status(200).json({ success: true, message: "No key provided, Using default key" });
    else if (key === process.env.GEMINI_API_KEY) {
      res.json({ success: true, message: "Same key is being used" });
    } else {
      api_key = key;
      res
        .status(200)
        .json({ success: true, message: "Using custom key : " + key });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString() });
  }
});
app.get("/api/reset", async (req, res) => {
  api_key = process.env.GEMINI_API_KEY;
  res.json({ success: true, message: "Reset Successful, Using default key" });
});

app.post("/api/analyze", async (req, res) => {
  try {
    const { code, tutorPersonality } = req.body;

    if (!api_key) {
      return res
        .status(401)
        .json({ success: false, error: "API key is required" });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(api_key);

    console.log(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `${tutorPersonality}\n\nHere's the Python code to analyze:\n${code}\n\nCan you help me understand what it does and if there are any issues?`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({
      success: true,
      analysis: response.text(),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.toString() });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
