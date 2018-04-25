const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cloudinary = require('cloudinary');
const webpush = require('web-push');
const path = require('path');
require('./models/User');
require('./models/Post');
require('./models/Comment');
require('./models/Subscription');
require('./services/passportGoogleOAuth');
const routes = require('./routes');
const config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI);

app.use(express.static('publics'));
app.use(bodyParser.json());

app.use(session({
  secret: config.cookieKey,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret
});

webpush.setVapidDetails(
  'mailto:npta97@gmail.com',
  config.vapidPublicKey,
  config.vapidPrivateKey
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(config.port, () => {
  console.log(`Server listening on PORT ${config.port}`);
});
