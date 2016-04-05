var Review = require('./reviewModel.js');

var helper = require('./helper.js');

module.exports = {

  addReview: function(req, res, next) {

    var client = new pg.Client(connectionString);

    client.connect(function(err) {
      if(err) {
        console.error('Post failed!');
        return res.status(500).json({ success: false, data: err});
      }

      var query = client.query("INSERT INTO reviews(\
       reviewed_userID, \
       reviewing_userID, \
       review_stars, \
       review, \
       created_on, \
       modified_on, \
       values ($1, $2, $3, $4, $5, $6)", Object.keys(data));

      query.on('end', function() {
        client.end();
        return res.status(201).send("Created new review!");
      });

    });
  }

  getReviews: function(req, res, next) {




  }











}