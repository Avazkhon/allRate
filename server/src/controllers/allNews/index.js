const postModels = require('../../models/post');
const rateModels = require('../../models/rate');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();

exports.get = async (req, res) => {
  try {
    const rates = await rateModels.getByProps({});
    const posts = await postModels.getByProps({});

    const response = [...rates, ...posts].sort((a, b) => {
      if (a.createTime < b.createTime) {
        return -1;
      } else if (a.createTime > b.createTime) {
        return 1;
      } else {
        return 0;
      }
    });
    res.status(200).json(response);
  } catch (error) {
    writeToLog.write(error, 'get_all_news.error');
    res.status(500).json({ massages: 'error to server', error });
  }
}
