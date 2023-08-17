const { exec } = require("child_process");

function runJavaScript(filePath, input, callback) {
  
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

  if (input) {
    process.stdin.write(input);
    process.stdin.end();
  }
}

module.exports = { runJavaScript };
