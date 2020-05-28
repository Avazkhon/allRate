const subscriptionModels = require('../../models/subscriptions');
const subscribersModels = require('../../models/subscribers');
const userModels = require('../../models/user');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();

exports.get = async (req, res) => {
  try {
    const { id } = req.query;
    const subscription = await subscriptionModels.findOne({ userId: id});
    res.status(200).json(subscription);
  } catch(error) {
    writeToLog.write(error, 'get_subscribers.error')
    res.status(500).json({message: 'error to server', error })
  }
}

exports.addSubscription = async (req, res) => {
  try {
    // subscription - на кого подписывается / subscriber - кто подписывается
    // subscriptionModels создаеться для подписывающегося
    const { subscription, subscriber } = req.query;
    if (subscription === subscriber) {
      return res.status(400).json({message: 'Нельзя подписаться на себя!'});
    }
    const userSubscriber = await userModels.findOne({ _id: subscriber });
    const userSubscription = await userModels.findOne({ _id: subscription });
    let fuinSubscriber = await subscriptionModels.findOne({ _id: userSubscriber.subscriptionsId })

    if (fuinSubscriber.subscriptions.find(({ userId }) => userId == subscription)) {
      return res.status(400).json({message: `${subscriber} уже подписан на ${subscription}`});
    };
    fuinSubscriber = await subscriptionModels.findByIdAndUpdate(
      { _id: userSubscriber.subscriptionsId },
      {$push: {
        subscriptions: { userId: subscription }
      }},
    );

    await subscribersModels.findByIdAndUpdate(
      { _id: userSubscription.subscribersId },
      {$push: {
        subscribers: { userId: subscriber }
      }},
    );
    await userModels.findByIdAndUpdate(
      { _id: subscription },
      { $set: { subscribersCount: ++userSubscription.subscribersCount } }
    );
    await userModels.findByIdAndUpdate(
      { _id: subscriber },
      { $set: { subscriptionsCount: ++userSubscriber.subscriptionsCount } }
    );

    res.status(201).json(fuinSubscriber);
  } catch (error) {
    writeToLog.write(error, 'add_subscribers.error')
    res.status(500).json({message: 'error to server', error })
  }
}

exports.deleteSubscription = async (req, res) => {
  try {
    const { subscription, subscriber } = req.query;
    const userSubscriber = await userModels.findOne({ _id: subscriber });
    const userSubscription = await userModels.findOne({ _id: subscription });
    const subscribersCount = --userSubscription.subscribersCount > 0 ? --userSubscription.subscribersCount : 0;
    const subscriptionsCount = --userSubscriber.subscriptionsCount > 0 ? --userSubscriber.subscriptionsCount : 0;
    await subscriptionModels.findByIdAndUpdate(
      { _id: userSubscriber.subscriptionsId },
      {$pull: {
        'subscriptions': { userId: subscription }
      }},
    );

    await subscribersModels.findByIdAndUpdate(
      { _id: userSubscription.subscribersId },
      {$pull: {
        'subscribers': { userId: subscriber }
      }},
    );

    await userModels.findByIdAndUpdate(
      { _id: subscription },
      { $set: { subscribersCount } }
    );
    await userModels.findByIdAndUpdate(
      { _id: subscriber },
      { $set: { subscriptionsCount } }
    );

    const allSubscribers = await subscriptionModels.findOne({ userId: userSubscriber._id });
    res.status(200).json(allSubscribers);
  } catch(error){
    console.log(error);
    writeToLog.write(error, 'delete_subscribers.error')
    res.status(500).json({message: 'error to server', error })
  }
}
