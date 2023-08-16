const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");


router.post("/compile", (req, res) => {
  const {language, input, code} = req.body
  
  const tempDir = path.join(__dirname, "temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const fileName = "user_code.cpp";
  const filePath = path.join(tempDir, fileName);
  fs.writeFileSync(filePath, code);

  const compileCommand = `g++ ${filePath} -o ${path.join(tempDir,"compiled_output")}`;

  // Compile
  exec(compileCommand, (compileError, compileStdout, compileStderr) => {
    if (compileError) {
      console.error(`Compilation error: ${compileError}`);
      res
        .status(500)
        .json({ error: "Compilation failed", stderr: compileStderr });
    } else {
      console.log("Compilation successful");

      //Execute
      const runCommand = path.join(tempDir, "compiled_output");
      const childProcess = exec(
        runCommand,
        (runError, runStdout, runStderr) => {
          if (runError) {
            console.error(`Execution error: ${runError}`);
            res
              .status(500)
              .json({ error: "Execution failed", stderr: runStderr });
          } else {
            console.log("Execution successful");
            res.json({ output: runStdout });
          }
        }
      );

      //user input
      childProcess.stdin.write(input);
      childProcess.stdin.end();
    }
  });
});

module.exports = router;
