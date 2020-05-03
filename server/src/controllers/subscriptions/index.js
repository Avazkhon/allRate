const subscribersModels = require('../../models/subscriptions');
const userModels = require('../../models/user');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();

exports.addSubscribers = async (req, res) => {
  try {
    // на кого подписывается / кто подписывается
    // subscribersModels создаеться для подписывающегося
    const { subscription, subscriber } = req.query;
    if (subscription === subscriber) {
      return res.status(400).json({message: 'Нельзя подписаться на себя!'});
    }
    const userSubscription = await userModels.findOne({ _id: subscription });
    let fuinSubscription = await subscribersModels.get({ _id: userSubscription.subscriptionsId })
    if (!fuinSubscription) { // NOTE: это нужно на первое время пока не созданы эти поля у users
      fuinSubscription = await subscribersModels.create({
        userId: subscription,
        subscriptions: [{
          userId: subscriber,
        }],
      })

      await userModels.findByIdAndUpdate(
        { _id: subscription },
        { subscriptionsId: fuinSubscription._id },
        {new: true}
      );
    } else {
      if (fuinSubscription.subscriptions.find(({ userId }) => userId == subscriber)) {
        return res.status(400).json({message: `${subscriber} уже подписан на ${subscription}`});
      };
      fuinSubscription = await subscribersModels.findByIdAndUpdate(
        { _id: userSubscription.subscriptionsId },
        {$push: {
          subscriptions: { userId: subscriber }
        }},
      )
    };
    res.status(201).json(fuinSubscription);
  } catch (error) {
    writeToLog.write(error, 'add_subscribers.error')
    res.status(500).json({message: 'error to server', error })
  }
}
