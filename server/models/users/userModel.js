// PostgresQL database Setup
// Official Documentation: https://github.com/brianc/node-postgres/wiki/pg
// Guide: http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/

var pg = require('pg');
// var conString = "postgres://username:password@localhost/database";
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test';

var userTableSure = function () {

  var client = new pg.Client(connectionString);

  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    var query1 = client.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, first_name VARCHAR(255), last_name VARCHAR(255), age INTEGER, profile_pic VARCHAR(255), password VARCHAR(255), city VARCHAR(255), state VARCHAR(255), zip_code INTEGER, user_id INTEGER REFERENCES users (id))');

    query1.on('end', function() { client.end(); });
  });

}

module.exports = {
  userTableSure: userTableSure
};

// var query2 = client.query('CREATE TABLE IF NOT EXISTS cars(id SERIAL PRIMARY KEY, text VARCHAR(255))');
// query2.on('end', function() { client.end(); });
