// Import node modules
const path = require('path');
require('toml-require').install({toml: require('toml')});

// Import utils
const Docker = require(path.join(process.cwd(), 'src/utils/docker.js'));
const Logger = require(path.join(process.cwd(), 'src/utils/logger.js'));
const Promisefied = require(path.join(process.cwd(), 'src/utils/promisefied.js'));

/**
 * Check if container is already running.
 * If it is, run docker stop
 * If not, send error message to Discord
 */
const stop = async msg => {
  try {
    if (await Docker.isContainerRunning()) {
      let response = await runStopCommand();
      msg.channel.send(response);
    }
    else msg.channel.send('Error: Mizore is not running.');
  }
  catch (e) {
    Logger.error(e);
  }
}

const runStopCommand = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let containerID = await Docker.getContainerID();

      let command = `docker stop ${containerID}`;
      await Promisefied.exec(command);

      // Check if container stopped successfully
      if (await Docker.isContainerRunning()) resolve('Error: Failed to stop Mizore.');
      else resolve('Success: Mizore has been stopped.');
    }
    catch (e) {
      Logger.error(e);
    }
  });
}

module.exports = {
  stop
}
