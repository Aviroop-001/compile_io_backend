const { exec } = require("child_process");

function runJavaScript(filePath, callback) {
  console.log(filePath);
  
  const runCommand = `node ${filePath}`;
  exec(runCommand, (runError, runStdout, runStderr) => {
    if (runError) {
      console.error(`Execution error: ${runError}`);
      callback({ error: 'Execution failed', stderr: runStderr });
    } else {
      console.log('Execution successful');
      callback(null, runStdout);
    }
  });
}

module.exports = { runJavaScript };
