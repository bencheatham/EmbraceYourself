var Review = require('./reviewModel.js');

var helper = require('../../config/helpers.js');

module.exports = {

  addReview: function(req, res, next) {

    var client = helper.createClient();

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
  },

  getReviews: function(req, res, next) {

    var client = helper.createClient();

    client.connect(function(err) {
     if(err) {
       console.error('Did not query');
       return res.status(500).json({success: false, data: err});
     }

     var query = client.query("SELECT * FROM reviews WHERE reviewed_userID = $1", 
       [data.reviewed_userID],
       function(err, result) {
         if(err) throw err;
         if(!result) {
           client.end();
           res.status(202).send('Could not find user reviews');
         } else {
          client.end();
          return res.status(201).send(result);
         }

      })

    })



  }











}