const mongoose = require('mongoose');
const Subscription = mongoose.model('Subscription');
const webpush = require('web-push');

exports.saveSubscription = async (req, res) => {
  if (!req.body || !req.body.endpoint) {
    return res.status(400).send({ message: 'Subscription must have an endpoint.' });
  }

  try {
    const newSubscription = new Subscription({ ...req.body });
    const subscription = await newSubscription.save();

    return res.status(200).send(subscription);
  } catch (err) {
    return res.status(422).send(err);
  }
};

exports.pushNotification = async (req, res) => {
  try {
    const subscriptions = await Subscription
      .find({})
      .lean()
      .exec();

    subscriptions.forEach((subscription) => {
      const pushConfig = {
        endpoint: subscription.endpoint,
        keys: {
          auth: subscription.keys.auth,
          p256dh: subscription.keys.p256dh
        }
      };

      webpush.sendNotification(pushConfig, JSON.stringify({
        title: 'New Post',
        content: 'New post added',
        openUrl: '/dashboard'
      }))
        .catch(err => console.log(err));
    });

    return res.status(201).send({ message: 'OK' });
  } catch (err) {
    return res.status(422).send(err);
  }
};
