const rateModels = require('../../models/rate');
const WriteToLog = require('../../utils/writeToLog');
const { sortByDate, getAuthorIdOrAuthorIds } = require('../../utils');
const subscriptionModels = require('../../models/subscriptions');

const writeToLog = new WriteToLog();

const handlier = (result, res) => {
  if (!result) {
    res.status = 404
    return res.send('Ставока не найден!');
  }
  res.status = 200;
  res.send(result);
}

exports.getRate = async (params, res) => {
  try {
    if (params.id) {
      rateModels.findOne({ _id: params.id})
      .then(result => handlier(result, res));
    } else if (params.userId) {
      rateModels.getByProps({ authorId: params.userId })
      .then(result => handlier(sortByDate(result), res));
    } else if (params.page) {
      const query = await getAuthorIdOrAuthorIds({
        authorId: params.authorId,
        subscriptionsId: params.subscriptionsId
      });

      const options = {
        sort: { createTime: -1 },
        limit: params.limit,
        page: params.page,
      }
      rateModels.paginate(query, options)
      .then(result => handlier(result, res));
    } else {
      rateModels.getByProps({})
      .then(result => handlier(sortByDate(result), res));
    }
  } catch(err) {
      writeToLog.write(err, 'request.err');
      return res.sendStatus(500);
  }
}
