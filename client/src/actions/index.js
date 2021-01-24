export {
  authRegistration,
  authoLogin,
  createNewUser,
  getUserById,
  authoLogAut,
  changeRatingUser,
  postUpdateUsersById,
  updateUserAuth,
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
  getRatesPage,
} from './rate';

export {
  getCommonRates,
} from './commonRate';

export {
  getPurse,
  getPurseHistory,
} from './purse';

export {
  postInvoice,
} from './invoice';

export {
  changeLang,
  getLang,
} from './language';

export {
  getUsersByIds,
  userPaginate,
  getUserForPageById,
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
  getPostsPage,
  getPostById,
  putPostById,
} from './post';

export {
  changeImg,
} from './image';

export {
  getWithdrawalRequest,
  postWithdrawalRequest,
  patchWithdrawalRequest,
} from './withdrawalRequest';

export {
  passwordRecoveryStart,
  passwordRecoveryFinish,
} from './passwordRecovery';

export {
  postBlock,
  getBlockById,
  putBlockById,
  postMakeBet,
  putPaymentRateByBlock,
  patchPartAddBlock,

  postAddBetInBlock,
  deleteBlock,
  deleteBet,
} from './block';

export {
  getCategories,
} from './categories';
