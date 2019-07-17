const environment = require('../environment');

const knex = require('knex')({
  client: environment.DB_CLIENT,
  connection: {
    host: environment.DB_HOST,
    user: environment.DB_USER,
    password: environment.DB_PASSWORD,
    database: environment.DB_NAME,
    port: environment.DB_PORT
  }
});

module.exports = knex;
