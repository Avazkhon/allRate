exports.basisForPayment = {
  accountReplenishment: 'accountReplenishment',
  withdrawal: 'withdrawal',
  makeRate: 'makeRate',
  win: 'win',
  percentage: 'percentage',
  stalemateSituation: 'stalemateSituation',
  returnMoney: 'returnMoney',
};

exports.rateStatusLive = {
  new: 'new',
  active: 'active',
  finish: 'finish',
  archive: 'archive',
};

exports.superAdmin = {
  userId: process.env.SUPER_ADMIN_USER_ID,
  purseId: process.env.SUPER_ADMIN_PURSE_ID,
};
