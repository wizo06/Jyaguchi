// Import utils
const Logger = require(path.join(process.cwd(), 'src/utils/auth.js'));

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
