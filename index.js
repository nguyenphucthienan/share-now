const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI);

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(config.port, () => {
  console.log(`Server listening on PORT ${config.port}`);
});
