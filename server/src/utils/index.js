const subscriptionModels = require('../models/subscriptions');
const commentsModels = require('../models/comments');

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

exports.getParamsBestPostByDate = (query, sort, createDateStart, createDateEnd) => {
  if (createDateStart || createDateEnd) {
    query.createDate = {};
    sort = { positivelyCount: -1 }
    if (createDateStart) {
      query.createDate.$gte = createDateStart;
    }
    if (createDateStart) {
      query.createDate.$lt = createDateEnd;
    }
  }
  return { sort, query }
}

exports.yndexAmountDue = (amount) => {
  // вычесляет какой будет процент изходя из суммы снятия
  return Number(amount) + Number(amount) * 0.03 + 45;
}

exports.addCommentsCount = async (documents) => {
  documents = JSON.stringify(documents);
  documents = JSON.parse(documents);
  const comments = await commentsModels.getByProps({ _id: documents.docs.map((item) => item.commentsId) });
  documents.docs = documents.docs.map((doc) => {
    const comment = comments.find((comment) => `${comment._id}` == `${doc.commentsId}`);
    return { ...doc, commentsCount: comment.commentsCount }
  });
  return documents;
}
