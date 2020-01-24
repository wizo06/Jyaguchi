// Import node modules
const discord = require('discord.js');
const path = require('path');
require('toml-require').install({toml: require('toml')});

// Import utils
const Auth = require(path.join(process.cwd(), 'src/utils/auth.js'));
const Logger = require(path.join(process.cwd(), 'src/utils/logger.js'));

// Import commands
const { sendHelpMessage } = require(path.join(process.cwd(), 'src/commands/help.js'));
const { start } = require(path.join(process.cwd(), 'src/commands/start.js'));
const { stop } = require(path.join(process.cwd(), 'src/commands/stop.js'));
const { status } = require(path.join(process.cwd(), 'src/commands/status.js'));
const { ping } = require(path.join(process.cwd(), 'src/commands/ping.js'));

// Import config
const CONFIG = require(path.join(process.cwd(), 'conf/config.toml'));

const BOT = new discord.Client();

BOT.on('message', msg => {
  if (Auth.userHasPerm(msg.author.id)) {
    if (msg.content.startsWith('j.')) {
      switch(msg.channel.type) {
        // Guild Messages
        case 'text':
            Logger.info(`${msg.author.tag} [${msg.guild.name}#${msg.channel.name}] > ${msg.content}`);

            switch(msg.content.split(' ')[0].slice(2)) {
              case 'help':
                sendHelpMessage(msg);
                break;
              case 'start':
                start(msg);
                break;
              case 'stop':
                stop(msg);
                break;
              case 'status':
                status(msg);
                break;
              case 'ping':
                ping(msg);
                break;
              default:
                msg.channel.send('Invalid command. For more info, try `h.help`.')
                .catch(e => Logger.error(e));
                break;
            }
          break;
        // Direct Messages
        case 'dm':
          // Do nothing
          break;
      }
    }
  };
});

// Simply log websocket connection error
BOT.on('error', err => {
  Logger.error(err.message)
});

BOT.login(CONFIG.discord.token)
.then(() => {
  Logger.info(`Logged in as ${BOT.user.tag}`);
  Logger.info(`**********************************************`, Logger.Colors.FgMagenta);
  BOT.user.setActivity('wizo.xyz', { type: 'PLAYING' });
})
.catch(e => Logger.error(e));
