exports.get = (req, res) => {
  res.status(200).json(req.session.lang);
};

exports.post = (req, res) => {
  console.log(req.body.lang);
  req.session.lang = req.body.lang;
  res.status(200).json(req.session.lang);
}
