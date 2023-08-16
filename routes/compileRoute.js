const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

router.post("/compile", (req, res) => {
  const { language, code } = req.body;

  const tempDir = path.join(__dirname, "temp"); // Construct the full path to the temp directory
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const fileName = "user_code.cpp";
  const filePath = path.join(tempDir, fileName);
  fs.writeFileSync(filePath, code);

  const compileCommand = `g++ ${filePath} -o ${path.join(__dirname, "temp","compiled_output")}`;

  // Execution
  exec(compileCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Compilation error: ${error}`);
      res.status(500).json({ error: "Compilation failed", stderr });
    } else {
      console.log("Compilation successful");
      const runCommand = path.join(__dirname, "temp", "compiled_output");
      // Execute the compiled program
      exec(runCommand, (runError, runStdout, runStderr) => {
        if (runError) {
          console.error(`Execution error: ${runError}`);
          res
            .status(500)
            .json({ error: "Execution failed", stderr: runStderr });
        } else {
          console.log("Execution successful");
          res.json({ output: runStdout });
        }
      });
    }
  });
});



module.exports = router;
