const mongoose = require('mongoose');
const rateSchema = require('./rateSchema');
const Rate = mongoose.model('Rate', rateSchema.rateSchema);
// это чтука нужна для того что бы связь с mongoose не падала
let count = 0;

const get = (callBack) => {
  Rate.find({}, callBack)
  .skip(0).limit(40);
}
exports.getAll = () => {
  get((err, result) => {
    if (err) {
      console.log('err', err);
    }
    count++;
    console.log('Успешный запрос №:', count);
    console.log('Дата запроса', Date());
    setTimeout(exports.getAll, 1000 * 60 * 60)
  })
};
