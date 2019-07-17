const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hi! :D');
});

app.listen('8080');
