exports.get = (req, res) => {
  res.status(200).json(req.session.lang);
};

exports.post = (req, res) => {
  req.session.lang = req.body.lang;
  res.status(200).json(req.session.lang);
}
