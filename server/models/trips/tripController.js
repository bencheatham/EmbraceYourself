function newTrip(data, req, res, client) {

  var dataInputs = [
    data.description,
    data.pickup_point,
    data.dropoff_point,
    data.depart_date,
    data.depart_time,
    data.arrival_date,
    data.arrival_time,
    data.seats,
    data.user_id
  ];

  client.connect(function(err) {
    if(err) {
      console.error('Post failed!');
      return res.status(500).json({ success: false, data: err});
    }

    var query = client.query("INSERT INTO trips(description, pickup_point, dropoff_point, depart_date, depart_time, arrival_date, arrival_time, seats, user_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)", dataInputs);

    query.on('end', function() {
      client.end();
      return res.status(201).send("Created new trip!");
    });

  }); // end client.connect
}

module.exports = {
  newTrip: newTrip
};
