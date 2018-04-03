const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const config = require('./config');

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(config.port, () => {
  console.log(`Server listening on PORT ${config.port}`);
});
