const mongoose = require('mongoose');
const rateSchema = require('./rateSchema');
const Rate = mongoose.model('Rate', rateSchema.rateSchema);
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();
// это чтука нужна для того что бы связь с mongoose не падала
let count = 0;

const get = (callBack) => {
  Rate.find({}, callBack)
  .skip(0).limit(40);
}
exports.getAll = () => {
  get((err, result) => {
    if (err) {
      writeToLog.write(err, 'request_db_for_check.err');
    }
    count++;
    writeToLog.write(err, 'request_db_for_check.success');
    setTimeout(exports.getAll, 1000 * 60 * 60)
  })
};
