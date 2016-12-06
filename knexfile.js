// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'db',
      charset: 'utf8'
    }
  },
};

// Steps to setting up a MySql server at a work station for db testing:

// (if mysql is not installed brew install it, but it is on work stations) ... if you don't have homebrew google it and install it

// 1) mysql.server start

// 2) mysql --host=localhost --user=root

// 3) create database db
// 3a) in another tab, knex migrate:latest to populate the db with tables

// 4) use db to get in there and see what you've done
