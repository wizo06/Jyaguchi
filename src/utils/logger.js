// Import node modules
const moment = require('moment');
const path = require('path');

const Logger = {
  Colors: {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',

    FgBlack: '\x1b[30m',
    FgRed: '\x1b[31m',
    FgGreen: '\x1b[32m',
    FgYellow: '\x1b[33m',
    FgBlue: '\x1b[34m',
    FgMagenta: '\x1b[35m',
    FgCyan: '\x1b[36m',
    FgWhite: '\x1b[37m'
  },

  getCallingDetails: () => {
    let err = new Error();
    let frame = err.stack.split('\n')[3];
    // let filename = path.basename(frame).split(':')[0];
    let filename = path.basename(frame).replace(')', '');
    let functionName = frame.split(' ')[5];
    // return `${filename}:${functionName.startsWith('/') ? '' : functionName}`;
    return filename;
  },

  info: (data, color = '') => {
    console.log(`[${moment().format('ddd|MMMDD|HH:mm:ss|Z')}][INFO]: ${color}[${Logger.getCallingDetails()}]: ${data}${Logger.Colors.Reset}`);
  },

  debug: (data, color = Logger.Colors.FgYellow) => {
    console.log(`[${moment().format('ddd|MMMDD|HH:mm:ss|Z')}][DEBUG]: ${color}[${Logger.getCallingDetails()}]: ${data}${Logger.Colors.Reset}`);
  },

  warning: (data, color = Logger.Colors.Bright + Logger.Colors.FgYellow) => {
    console.log(`[${moment().format('ddd|MMMDD|HH:mm:ss|Z')}][WARNING]: ${color}[${Logger.getCallingDetails()}]: ${data}${Logger.Colors.Reset}`);
  },

  error: (data, color = Logger.Colors.FgRed) => {
    console.log(`[${moment().format('ddd|MMMDD|HH:mm:ss|Z')}][ERROR]: ${color}[${Logger.getCallingDetails()}]: ${data}${Logger.Colors.Reset}`);
  },

  critical: (data, color = Logger.Colors.Bright + Logger.Colors.FgRed) => {
    console.log(`[${moment().format('ddd|MMMDD|HH:mm:ss|Z')}][CRITICAL]: ${color}[${Logger.getCallingDetails()}]: ${data}${Logger.Colors.Reset}`);
  }

}

module.exports = Logger
