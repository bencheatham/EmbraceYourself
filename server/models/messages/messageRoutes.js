var messageController = require('./messageController.js');

module.exports = function (app) {

 console.log('IN MESSAGE CONTROLLER');
 app.post('/add_message', messageController.addMessage);
 app.post('/get_trip_messages', messageController.getTripMessages);


}