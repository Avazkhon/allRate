const postModels = require('../../models/post');
const rateModels = require('../../models/rate');
const WriteToLog = require('../../utils/writeToLog');
const { sortByDate } = require('../../utils');

const writeToLog = new WriteToLog();

exports.get = async (req, res) => {
  try {
    const rates = await rateModels.getByProps({});
    const posts = await postModels.getByProps({});

    const response = sortByDate([...rates, ...posts]);
    res.status(200).json(response);
  } catch (error) {
    writeToLog.write(error, 'get_all_news.error');
    res.status(500).json({ massages: 'error to server', error });
  }
}
