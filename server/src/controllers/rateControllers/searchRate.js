const getRate = require('./getRate').getRate;
const rateModels = require('../../models/rate');
const WriteToLog = require('../../utils/writeToLog');
const purseControllers = require('../purse');
const { getAuthorIdOrAuthorIds, getParamsForSearchDB } = require('../../utils');

const writeToLog = new WriteToLog();

class SearchRate {
  constructor() {

  }

  search = async (req, res) => {
    const {
      query: params,
      query: {
        postId,
        limit,
        page,
        authorId,
        subscriptionsId,
      },
    } = req;
    const options = {
      sort: { createDate: -1 },
      limit: params.limit || 24,
      page: params.page || 1,
    }
    let query = await getAuthorIdOrAuthorIds({ authorId, subscriptionsId });
    query = { ...getParamsForSearchDB(params, ['page', 'limit' ]), ...query };

    rateModels.paginate(query, options)
      .then((bets) => {
        res.status(200).json(bets)
      })
  }
}

module.exports =  SearchRate
