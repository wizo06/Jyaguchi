// Import node modules
const { spawn } = require('child_process');
const path = require('path');
require('toml-require').install({toml: require('toml')});

// Import config
const CONFIG = require(path.join(process.cwd(), 'conf/config.toml'));

// Import utils
const ChildProcess = require(path.join(process.cwd(), 'src/utils/child_process.js'));
const Logger = require(path.join(process.cwd(), 'src/utils/logger.js'));

/**
 * Check if subprocess is already running.
 * If it is, send error message to Discord
 * If not, run the subprocess command
 */
const start = async msg => {
  try {
    if (await ChildProcess.isSubprocessRunning(CONFIG.mizore.command)) return msg.channel.send('Error: Mizore is already running.');
    else {
        let response = await runSubprocess();
        msg.channel.send(response);
    }
  }
  catch (e) {
    Logger.error(e)
  }
}

const runSubprocess = () => {
  return new Promise(async (resolve, reject) => {
    if (CONFIG.mizore.path === '') reject('Error: Path to Mizore is empty. Please fix this first.');
    if (CONFIG.mizore.command === '') reject('Error: Command for Mizore is empty. Please fix this first.');
    else {
      let command = CONFIG.mizore.command.split(' ')[0]; // ./start.sh
      let args = CONFIG.mizore.command.split(' ').slice(1); // i e
      let options = {
        cwd: CONFIG.mizore.path,
        stdio: '',
        detached: true,
        shell: '/bin/bash'
      };

      let encoder = spawn(command, args, options);
      encoder.stdout.on('data', data => process.stdout.write(data));
      encoder.stderr.on('data', data => process.stdout.write(data));
      encoder.on('close', code => console.log(code));

      // Check if subprocess started successfully
      if () resolve('Success: Mizore has been started up.');
      else reject('Error: Mizore failed to start.');
    }
  });
}

module.exports = {
  start
}
