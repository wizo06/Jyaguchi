// Import node modules
const { spawn } = require('child_process');
const path = require('path');
require('toml-require').install({toml: require('toml')});

// Import config
const CONFIG = require(path.join(process.cwd(), 'conf/config.toml'));

const runScript = () => {
  return new Promise(async (resolve, reject) => {
    if (CONFIG.path.mizore === '') reject('Path to Mizore is empty. Please fix this first.');
    else {
      let command = `./start.sh`;
      let args = ['i', 'e'];
      let options = {
        cwd: CONFIG.path.mizore,
        stdio: '',
        detached: true,
        shell: '/bin/bash'
      };

      let encoder = spawn(command, args, options);
      encoder.stdout.on('data', data => process.stdout.write(data));
      encoder.stderr.on('data', data => process.stdout.write(data));
      encoder.on('close', code => console.log(code));
    }
  });
}

const start = async msg => {
  // Check if ./start.sh is already running
  // If it is, send error message to discord
  // If not, run ./start.sh i e
  if () return msg.channel.send('Encoder is already running');
  else {
    try {
      let response = await runScript();
      msg.channel.send(response);
    }
    catch (e) {
      msg.channel.send(e);
    }
  }
}

module.exports = {
  start
}
