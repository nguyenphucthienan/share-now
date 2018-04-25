const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
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

app.listen(config.port, () => {
  console.log(`Server listening on PORT ${config.port}`);
});
