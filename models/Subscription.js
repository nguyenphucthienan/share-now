const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { strict: false });

mongoose.model('Subscription', subscriptionSchema);
