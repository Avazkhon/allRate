const fs = require('fs');
const path = require('path');
function WriteToLog () {
  const PATH = process.cwd() + '/var/log/';
  let count = 0;

  this.write = (data , fileName, folder = PATH)  => {
    if (!data || !fileName) {
      return false;
    };
    if (count > 1) {
      return
    }
    count++;

    fs.appendFile(folder + fileName, `\n${new Date}: ${data}`, (err) => {
      if (err) {
        this.write(err, 'error_write.err');
      };
    });
  };
};

module.exports = WriteToLog;
