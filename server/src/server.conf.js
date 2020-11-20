const fs = require('fs');
const dotenv = require('dotenv');
const moment = require('moment-timezone');

function addTime() {
  process.env.TZ = moment().utc().format();
}

function addEnv() {
  const NODE_ENV = process.env.NODE_ENV || 'development';
  let newEnv = '';
  if (NODE_ENV === 'production') {
    newEnv = '.env.production';
  } else if(NODE_ENV === 'development'){
    newEnv = '.env.development';
  } else {
    return;
  }
  const envConfig = dotenv.parse(fs.readFileSync(newEnv));
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }

}

function addConf() {
  addEnv();
  addTime();
}
module.exports = {
  addConf,
}
