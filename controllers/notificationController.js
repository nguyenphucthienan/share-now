const mongoose = require('mongoose');
const Subscription = mongoose.model('Subscription');

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
