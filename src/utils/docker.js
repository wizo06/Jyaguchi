const path = require('path');

// Import utils
const Promisefied = require(path.join(process.cwd(), 'src/utils/promisefied.js'));
const Logger = require(path.join(process.cwd(), 'src/utils/logger.js'));

// Import config
const CONFIG = require(path.join(process.cwd(), 'conf/config.toml'));

const Docker = {
  isContainerRunning: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let command = `docker ps --format '{ "{{.Names}}": "{{.ID}}" }'`;
        let response = await Promisefied.exec(command);
        let arrOfContainers = response.split('\n').slice(0,-1);
        arrOfContainers = arrOfContainers.map(string => JSON.parse(string));
        let filtered = arrOfContainers.filter(container => {
          if (container[CONFIG.mizore.container_name]) return true;
        });
        if (filtered.length !== 0) {
          // container is running
          resolve(true);
        }
        else {
          // container is not running
          resolve(false);
        }
      }
      catch (e) {
        Logger.error(e);
        reject();
      }
    });
  },

  getContainerID: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let command = `docker ps --format '{ "{{.Names}}": "{{.ID}}" }'`;
        let response = await Promisefied.exec(command);
        let arrOfContainers = response.split('\n').slice(0,-1);
        arrOfContainers = arrOfContainers.map(string => JSON.parse(string));
        let filtered = arrOfContainers.filter(container => {
          if (container[CONFIG.mizore.container_name]) return true;
        });
        if (filtered.length !== 0) {
          // container is running
          resolve(filtered[0][CONFIG.mizore.container_name]);
        }
        else {
          // container is not running
          Logger.error(`Could not get ID of container "${CONFIG.mizore.container_name}"`);
          reject();
        }
      }
      catch (e) {
        Logger.error(e);
        reject();
      }
    });
  },

  getContainerStatus: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let command = `docker ps --format '{ "{{.Names}}": "{{.Status}}" }'`;
        let response = await Promisefied.exec(command);
        let arrOfContainers = response.split('\n').slice(0,-1);
        arrOfContainers = arrOfContainers.map(string => JSON.parse(string));
        let filtered = arrOfContainers.filter(container => {
          if (container[CONFIG.mizore.container_name]) return true;
        });
        if (filtered.length !== 0) {
          // container is running
          resolve(filtered[0][CONFIG.mizore.container_name]);
        }
        else {
          // container is not running
          Logger.error(`Could not get Status of container "${CONFIG.mizore.container_name}"`);
          reject();
        }
      }
      catch (e) {
        Logger.error(e);
        reject();
      }
    });
  }

}

module.exports = Docker
