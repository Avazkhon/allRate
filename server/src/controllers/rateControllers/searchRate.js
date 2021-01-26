const getRate = require('./getRate').getRate;
const rateModels = require('../../models/rate');
const WriteToLog = require('../../utils/writeToLog');
const purseControllers = require('../purse');
const { getAuthorIdOrAuthorIds } = require('../../utils');

const writeToLog = new WriteToLog();

class SearchRate {
  constructor() {

  }

  search = async (req, res) => {
    const {
      query: queryGlobal,
      query: {
        postId,
        limit,
        page,
        authorId,
        subscriptionsId,
        query,
        text
      },
      params
    } = req;
    const options = {
      sort: { createDate: -1 },
      limit: queryGlobal.limit || 24,
      page: queryGlobal.page || 1,
    }
    let findProps = await getAuthorIdOrAuthorIds({ authorId, subscriptionsId });

    if(query) {
      findProps['categories.query'] = query
    }
    if(params.search) {
      findProps['categories.search'] = params.search
    }
    if(text) {
      findProps.$text = { $search: text }
    }

    console.log(findProps);

    rateModels.paginate(findProps, options)
      .then((bets) => {
        res.status(200).json(bets)
      })
  }
}

module.exports =  SearchRate
