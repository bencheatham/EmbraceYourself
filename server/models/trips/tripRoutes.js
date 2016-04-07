var tripController = require('./tripController.js');

module.exports = function (app) {


  console.log('IN TRIP CONTROLLER......');
  app.post('/view_trip', tripController.getTrip);


}