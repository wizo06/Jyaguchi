// Import node modules
const { spawn } = require('child_process');
const path = require('path');
require('toml-require').install({toml: require('toml')});

// Import config
const CONFIG = require(path.join(process.cwd(), 'conf/config.toml

// Import utils
const ChildProcess = require(path.join(process.cwd(), 'src/utils/child_process.js'));
const Logger = require(path.join(process.cwd(), 'src/utils/logger.js'));

/**
 * Check if subprocess is already running.
 * If it is, send SIGINT to kill the subprocess
 * If not, send error message to Discord
 */
const stop = async msg => {
  try {
    if (await ChildProcess.isSubprocessRunning(CONFIG.mizore.command)) {
      // Send SIGINT to the subprocess
      let response = await stopSubprocess();
      msg.channel.send(response);
    }
    else {
      msg.channel.send('Error: Mizore is not running.');
    }
  }
  catch (e) {
    Logger.error(e);
  }
}

const stopSubprocess = () => {
  return new Promise(async (resolve, reject) => {
    if (CONFIG.mizore.path === '') reject('Error: Path to Mizore is empty. Please fix this first.');
    else {
      let subProcessPID = await ChildProcess.getSubprocessPID(CONFIG.mizore.command);
      // Send SIGINT (-2) to the subprocess
      let command = `kill -2 ${subProcessPID}`;
      await Promisefied.exec(command);

      // Check if ./start.sh i e was killed successfully
      if () resolve('Success: Mizore has been stopped.');
      else reject('Error: Failed to stop Mizore.');
    }
  });
}

module.exports = {
  stop
}
