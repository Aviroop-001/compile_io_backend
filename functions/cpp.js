
const { exec } = require("child_process");
const path = require("path");

function compileAndRunCpp(filePath, tempDir, input, callback) {

  const compileCommand = `g++ ${filePath} -o ${path.join(
    tempDir,
    "compiled_output"
  )}`;

  exec(compileCommand, (compileError, compileStdout, compileStderr) => {
    if (compileError) {
      console.error(`Compilation error: ${compileError}`);
      callback({ error: "Compilation failed", stderr: compileStderr });
    } else {
      console.log("Compilation successful");
      const runCommand = path.join(tempDir, "compiled_output");
      const childProcess = exec(
        runCommand,
        (runError, runStdout, runStderr) => {
          if (runError) {
            console.error(`Execution error: ${runError}`);
            callback({ error: "Execution failed", stderr: runStderr });
          } else {
            console.log("Execution successful");
            callback(null, runStdout);
          }
        }
      );

      if (input) {
        childProcess.stdin.write(input);
        childProcess.stdin.end();
      }
    }
  });
}
module.exports = {compileAndRunCpp}