// Import node modules
const path = require('path');
require('toml-require').install({toml: require('toml')});

// Import config
const CONFIG = require(path.join(process.cwd(), 'conf/config.toml'));

// Import utils
const Docker = require(path.join(process.cwd(), 'src/utils/docker.js'));
const Logger = require(path.join(process.cwd(), 'src/utils/logger.js'));
const Promisefied = require(path.join(process.cwd(), 'src/utils/promisefied.js'));

/**
 * Check if container is already running.
 * If it is, send error message to Discord
 * If not, run the start command
 */
const start = async msg => {
  try {
    if (await Docker.isContainerRunning()) return msg.channel.send('Error: Mizore is already running.');
    else {
        let response = await runStartCommand();
        msg.channel.send(response);
    }
  }
  catch (e) {
    Logger.error(e);
  }
}

const runStartCommand = () => {
  return new Promise(async (resolve, reject) => {
    try {
      if (CONFIG.mizore.absolute_path === '') reject('Error: Path to Mizore is empty. Please fix this first.');
      if (CONFIG.mizore.command === '') reject('Error: Command for Mizore is empty. Please fix this first.');
      else {
        let options = {
          cwd: CONFIG.mizore.absolute_path,
          shell: '/bin/bash'
        };
        await Promisefied.exec(CONFIG.mizore.command, options);

        // Check if container started successfully
        if (await Docker.isContainerRunning()) resolve('Success: Mizore has been started.');
        else resolve('Error: Failed to start Mizore.');
      }
    }
    catch (e) {
      Logger.error(e);
    }
  });
}

module.exports = {
  start
}
