const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const environment = require('./environment');
const apiRoutes = require('./routes/api');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', apiRoutes);

const port = environment.APP_PORT;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('NODE JS app is running on port.', port);
});
