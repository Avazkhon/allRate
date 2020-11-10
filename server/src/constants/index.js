exports.basisForPayment = {
  accountReplenishment: 'accountReplenishment', // Пополнение счета
  withdrawal: 'withdrawal', // вывод
  makeRate: 'makeRate', // makeRate
  win: 'win', // выиграть
  percentage: 'percentage', // процент
  stalemateSituation: 'stalemateSituation', // патовая ситуация
  returnMoney: 'returnMoney', // вернуть деньги
  leftovers: 'leftovers', // вернуть деньги
};

exports.rateStatusLive = {
  new: 'new',
  active: 'active',
  in_progress: 'in_progress',
  finish: 'finish',
  archive: 'archive',
};

exports.superAdmin = {
  userId: process.env.SUPER_ADMIN_USER_ID,
  purseId: process.env.SUPER_ADMIN_PURSE_ID,
};

exports.checkCardReg = {
  visaRegEx: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/,
  mastercardRegEx: /^(?:5[1-5][0-9]{14})$/,
  amexpRegEx: /^(?:3[47][0-9]{13})$/,
  discovRegEx: /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/,
}
