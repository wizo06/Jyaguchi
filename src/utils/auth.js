const path = require('path');
require('toml-require').install({toml: require('toml')});

// Import config
const CONFIG = require(path.join(process.cwd(), 'conf/config.toml'));

const userHasPerm = id => CONFIG.discord.adminID.includes(id);

module.exports = {
  userHasPerm
}
