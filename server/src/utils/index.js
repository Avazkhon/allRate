const subscriptionModels = require('../models/subscriptions');
exports.getAuthorIdOrAuthorIds = async function ({ authorId, subscriptionsId }) {
  const query = {};
  if (authorId) {
    query.authorId = authorId;
  }
  if (subscriptionsId) {
    let subscription = await subscriptionModels.findOne({ userId: subscriptionsId})
    subscription = subscription.subscriptions.map((elem) => elem.userId )
    query.authorId = subscription;
  }
  return query;
}

exports.sortByDate = (array) => {
  return array.sort((a, b) => {
    const aTime = a.createDate || a.serverTime || a.localTime;
    const bTime = b.createDate || b.serverTime || b.localTime;
    if (aTime < bTime) {
      return 1;
    } else if (aTime > bTime) {
      return -1;
    } else {
      return 0;
    }
  });
}

exports.getParamsForSearchDB = (params, deleteParams) => {
  const _params = Object.assign({}, params);
  deleteParams.forEach((currentValue) => {
    delete _params[currentValue];
  })

  return _params;
}

exports.yndexAmountDue = (amount) => {
  // вычесляет какой будет процент изходя из суммы снятия
  return Number(amount) + Number(amount) * 0.03 + 45;
}
