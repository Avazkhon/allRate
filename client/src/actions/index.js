export {
  authRegistration,
  authoLogin,
  createNewUser,
  getUserById,
  authoLogAut,
  changeRatingUser,
} from './auth';

export {
  creteNewRate,
  getRates,
  getRateByID,
  putRateByID,
  putRateLiveByID,
  putRateSelectVictory,
  changeRatingRate,
  addCountViewsRate,
} from './rate';

export {
  getCommonRates,
} from './commonRate';

export {
  getPurse,
} from './purse';

export {
  postInvoice,
} from './invoice';

export {
  changeLang,
  getLang,
} from './language';

export {
  getUsers,
  getUsersByIds,
} from './user';

export {
  addSubscription,
  getSubscriptions,
  deleteSubscriptions,
} from './subscriptions';

export {
  createPost,
  changeRatingPost,
  addCountViewsPost,
  getPosts,
} from './post';

export {
  getMyList,
  getMyNews,
  getAllNews,
} from './myList';
