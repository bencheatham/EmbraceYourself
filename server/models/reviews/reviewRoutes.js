var reviewController = require('./reviewController.js');

module.exports = function (app) {

 console.log('IN REVIEW CONTROLLER');
 app.post('/', reviewController.addReview);
 app.get('/', reviewController.getReviews);


}