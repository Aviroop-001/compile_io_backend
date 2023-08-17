const { exec } = require("child_process");

function runPython(filePath, input, callback) {

  const runCommand = `python ${filePath}`;
  const childProcess = exec(runCommand, (runError, runStdout, runStderr) => {
    if (runError) {
      console.error(`Execution error: ${runError}`);
      callback({ error: "Execution failed", stderr: runStderr });
    } else {
      console.log("Execution successful");
      callback(null, runStdout);
    }
  });

  if (input) {
    childProcess.stdin.write(input);
    childProcess.stdin.end();
  }
}

module.exports = { runPython };
