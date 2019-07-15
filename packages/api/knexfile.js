const environment = require('./src/environment');
// Update with your config settings.

module.exports = {
  local: {
    client: environment.DB_CLIENT,
    connection: {
      host: environment.DB_HOST,
      user: environment.DB_USER,
      password: environment.DB_PASSWORD,
      database: environment.DB_NAME,
      port: environment.DB_PORT
    }
  },

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
