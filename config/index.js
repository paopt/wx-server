const process = require('process')
const devConfig = require('./config.dev');
const prodConfig = require('./config.prod');

const config= {
};

if (process.env.NODE_ENV === 'production') {
  Object.assign(config, prodConfig);
} else {
  Object.assign(config, devConfig);
}

console.log('配置文件:', config)

module.exports = config;