// Import utils
const Logger = require(path.join(process.cwd(), 'src/utils/auth.js'));

const sendHelpMessage = msg => {
  try {
    let embed = {
      color: 16777215,
      fields: [
        {
          name: `j.start`,
          value: `Start up Mizore with \`cd MIZORE_PATH && ./start.sh docker encoder\``
        },
        {
          name: `j.stop`,
          value: `Stop Mizore with \`docker stop CONTAINER_ID\``
        },
        {
          name: `j.status`,
          value: `Display the status of Mizore's container`
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
