// Import node modules
const path = require('path');
require('toml-require').install({toml: require('toml')});

// Import utils
const Docker = require(path.join(process.cwd(), 'src/utils/docker.js'));
const Logger = require(path.join(process.cwd(), 'src/utils/logger.js'));
const Promisefied = require(path.join(process.cwd(), 'src/utils/promisefied.js'));

/**
 * Check if container is already running.
 * If it is, send container's status
 * If not, send error message to Discord
 */
const status = async msg => {
  try {
    if (await Docker.isContainerRunning()) {
      let response = await runStatusCommand();
      msg.channel.send(response);
    }
    else msg.channel.send('Error: Mizore is not running.');
  }
  catch (e) {
    Logger.error(e);
  }
}

const runStatusCommand = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let containerStatus = await Docker.getContainerStatus();
      resolve(`Status: \`${containerStatus}\``);
    }
    catch (e) {
      Logger.error(e);
      reject();
    }
  });
}

module.exports = {
  status
}
