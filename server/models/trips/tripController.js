function newTrip(data, req, res, client) {

  client.connect(function(err) {
    if(err) {
      console.error('Post failed!');
      return res.status(500).json({ success: false, data: err});
    }

    var query = client.query("INSERT INTO trips(description, pickup_point, dropoff_point, depart_date, depart_time, arrival_date, arrival_time, seats, user_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)", Object.keys(data));

    query.on('end', function() {
      client.end();
      return res.status(201).send("Created new trip!");
    });

  }); // end client.connect
}

module.exports = {
  newTrip: newTrip
};
