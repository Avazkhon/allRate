const supportModels = require('../../models/support');
const WriteToLog = require('../../utils/writeToLog');

exports.crateSupport = (req, res) => {
  const {
    body,
    session: { user }
  } = req;
  const data = body;
  if(user.userId) {
    data.userId = user.userId
  }
  supportModels.create(data)
    .then((result) => {
      res.status(201).json(result)
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
}
