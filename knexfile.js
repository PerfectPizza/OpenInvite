// Update with your config settings.

module.exports = {
  //the production route information works for sure ... unsure of dev
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'db',
      charset: 'utf8'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host:'ec2-54-247-76-24.eu-west-1.compute.amazonaws.com',
      database:'da2e4sh7knvhts',
      user:'piemlflqgregxw',
      password:'j26DtKPrrSNIlRyC_1C3i3gdVR',
      ssl:true
    },
    searchPath: 'knex,public'
  }
};

// Steps to setting up a MySql server at a work station for db testing:

// (if mysql is not installed brew install it, but it is on work stations) ... if you don't have homebrew google it and install it

// 1) mysql.server start

// 2) mysql --host=localhost --user=root

// 3) create database db
// 3a) in another tab, knex migrate:latest to populate the db with tables

// 4) use db to get in there and see what you've done
