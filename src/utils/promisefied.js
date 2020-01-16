// Import node modules
const { exec } = require('child_process');

const Promisefied = {

  exec: (command, options) => {
    return new Promise((resolve, reject) => {
      let stdoutMessage = '';
      let errMessage = '';
      // Logger.debug(`Running command ${command}`);
      subprocess = exec(command, options);
      subprocess.stdout.on('data', data => stdoutMessage += data);
      subprocess.stderr.on('data', data => errMessage += data);
      subprocess.on('close', (code) => {
        if (code === 0) resolve(stdoutMessage);
        else reject(errMessage);
      })
    });
  },

}

module.exports = Promisefied
