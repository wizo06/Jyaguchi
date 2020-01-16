const Promisefied = require(path.join(process.cwd(), 'src/utils/promisefied.js'));
const Logger = require(path.join(process.cwd(), 'src/utils/logger.js'));

const ChildProcess = {
  isSubprocessRunning: (subprocess) => {
    return new Promise(async (resolve, reject) => {
      try {
        let command = `ps aux | grep "${subprocess}" | sed -e "s/ \+/ /g" | cut -d " " -f 11,12`;
        let response = await Promisefied.exec(command);
        let arrOfProcesses = response.split('\n').slice(0,-1);
        if (arrOfProcesses.includes(subprocess)) {
          resolve(true);
        }
        else {
          resolve(false);
        }
      }
      catch (e) {
        Logger.error(e);
        reject();
      }
    });
  },

  getSubprocessPID: (subprocess) => {
    return new Promise(async (resolve, reject) => {
      try {
        let command = `ps aux | grep "${subprocess}" | sed -e "s/ \+/ /g" | cut -d " " -f 2,11,12`;
        let response = await Promisefied.exec(command);
        let arrOfProcesses = response.split('\n').slice(0,-1);
        let filtered = arrOfProcesses.filter(process => process.includes(subprocess))[0];
        if (filtered) {
          let pid = filtered[0].split(' ')[0];
          resolve(pid);
        }
        else {
          reject();
      }
      catch (e) {
        Logger.error(e);
        reject();
      }
    });
  }

}

module.exports = ChildProcess
