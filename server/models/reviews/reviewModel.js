var pg = require('pg');
// var conString = "postgres://username:password@localhost/database";
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/bencheatham';

var tripTableSure = function () {

  var client = new pg.Client(connectionString);

  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    // date and time are still VARCHAR as well as separate... for now
    var query = client.query('CREATE TABLE IF NOT EXISTS reviews(id SERIAL PRIMARY KEY, \
      reviewed_userID INT, \
      reviewing_userID INT, \
      review_stars INT, \
      review VARCHAR(255), \
      created_on VARCHAR(255), \
      modified_on VARCHAR(255) \
     ');

    query.on('end', function() { client.end(); });
  });

}

module.exports = {
  reviewTable: reviewTable
};