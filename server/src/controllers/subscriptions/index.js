const subscribersModels = require('../../models/subscriptions');
const userModels = require('../../models/user');
const WriteToLog = require('../../utils/writeToLog');

const writeToLog = new WriteToLog();

exports.addSubscription = async (req, res) => {
  try {
    // на кого подписывается / кто подписывается
    // subscribersModels создаеться для подписывающегося
    const { subscription, subscriber } = req.query;
    if (subscription === subscriber) {
      return res.status(400).json({message: 'Нельзя подписаться на себя!'});
    }
    const userSubscriber = await userModels.findOne({ _id: subscriber });
    let fuinSubscriber = await subscribersModels.get({ _id: userSubscriber.subscriptionsId })
    if (!fuinSubscriber) { // NOTE: это нужно на первое время пока не созданы эти поля у users
      fuinSubscriber = await subscribersModels.create({
        userId: subscriber,
        subscriptions: [{
          userId: subscription,
        }],
      })

      await userModels.findByIdAndUpdate(
        { _id: subscriber },
        { subscriptionsId: fuinSubscriber._id },
        { new: true }
      );
    } else {
      if (fuinSubscriber.subscriptions.find(({ userId }) => userId == subscription)) {
        return res.status(400).json({message: `${subscriber} уже подписан на ${subscription}`});
      };
      fuinSubscriber = await subscribersModels.findByIdAndUpdate(
        { _id: userSubscriber.subscriptionsId },
        {$push: {
          subscriptions: { userId: subscription }
        }},
      )
    };
    res.status(201).json(fuinSubscriber);
  } catch (error) {
    writeToLog.write(error, 'add_subscribers.error')
    res.status(500).json({message: 'error to server', error })
  }
}

exports.deleteSubscription = async (req, res) => {
  try {
    const { subscription, subscriber } = req.query;
    const user = await userModels.findOne({ _id: subscriber });
    await subscribersModels.findByIdAndUpdate(
      { _id: user.subscriptionsId },
      {$pull: {
        'subscriptions': { userId: subscription }
      }},
    );
    const allSubscribers = await subscribersModels.get({ userId: user._id });
    res.status(200).json(allSubscribers);
  } catch(error){
    writeToLog.write(error, 'delete_subscribers.error')
    res.status(500).json({message: 'error to server', error })
  }
}
