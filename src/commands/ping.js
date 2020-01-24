const path = require('path');

// Import utils
const Logger = require(path.join(process.cwd(), 'src/utils/logger.js'));

const ping = msg => {
  try {
    msg.channel.send('pong!');
  }
  catch (e) {
    Logger.error(e)
  }
}

module.exports = {
  ping
}
