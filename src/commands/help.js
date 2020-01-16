// Import utils
const Logger = require(path.join(process.cwd(), 'src/utils/auth.js'));

const sendHelpMessage = msg => {
  try {
    let embed = {
      color: 16777215,
      fields: [
        {
          name: `j.start`,
          value: `Start up Mizore with \`./start.sh i e\``
        },
        {
          name: `j.stop`,
          value: `Stop Mizore by sending SIGINT`
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
