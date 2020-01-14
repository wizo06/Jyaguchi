// Import utils
const Logger = require(path.join(process.cwd(), 'src/utils/auth.js'));

const sendHelpMessage = msg => {
  try {
    let embed = {
      color: 16777215,
      fields: [
        {
          name: `j.start`,
          value: `Start up worker with \`./start i e\``
        },
        {
          name: `j.stop`,
          value: `Stop worker by sending SIGINT`
        },
        {
          name: `j.ping`,
          value: `Ping the bot for a simple \`pong!\` response`
        }
      ]
    };

    msg.channel.send(``, { embed });
  }
  catch (e) {
    Logger.error(e)
  }
};

module.exports = {
  sendHelpMessage
}
