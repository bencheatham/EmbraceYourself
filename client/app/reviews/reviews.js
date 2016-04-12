angular.module('ridehook.reviews', [])

.controller('ReviewController', function($scope, $window, Reviews) {

  $scope.review = {};

  //var trip = $window.sessionStorage.currentTrip; //tripIDFactory.tripResult;

  //Make some dummy content for test / dev purposes.
  //this should actually get assigned @ user sign-in/prompt
  // $window.sessionStorage.needs_review_username = 'hey';
  // $window.sessionStorage.needs_user_review_trip_id = 3;
  // $window.sessionStorage.needs_review_user_id = 1;

  var reviewing_user_id = $window.sessionStorage.id;
  var needs_reviewed_username = $window.sessionStorage.needs_review_username;
  var tripID = $window.sessionStorage.needs_user_review_trip_id; //tripIDFactory.tripID;
  // var reviewed_user_id = $window.sessionStorage.needs_review_user_id;
  var reviewed_user_id = $window.sessionStorage.needs_user_review_driver_id;

  $scope.message = 'Leave a Review for ' + needs_reviewed_username + '!';

  $scope.addReview = function() {

    var review = {
     reviewed_user_id: reviewed_user_id, //$scope.review.reviewed_userID,
     reviewing_user_id: reviewing_user_id, //$scope.review.reviewing_userID,
     review: $scope.review.review,
     review_stars: $scope.review.stars,
     review_trip_id: tripID,
     created_on: Date.now()
    }

    $scope.loading = true;
    Reviews.addReview(review)
      .then(function() {
        $scope.loading = false;
      })
      .catch(function(error) {
        console.log(error);
      });


  };


  var userObj = {};
  $scope.results = [];

  $scope.getMissingReviews = function() {

    Reviews.getUserTrips(reviewing_user_id)
    .then(function(resp) {
      console.log(resp.data)

      resp.data.forEach(function(seat_taken) {
        console.log(seat_taken.trip_id)
        Reviews.getMissingTripReviews(seat_taken.trip_id, reviewing_user_id)
        .then(function(resp) {
          resp.data.forEach(function(user) {
            Reviews.getUserInfo(user.user_id).then(function(resp) {

                  userObj.first_name = resp.data[0].first_name;
                  userObj.last_name = resp.data[0].last_name;
                  userObj.user_id = resp.data[0].id;
                  userObj.profile_pic = resp.data[0].profile_pic;

              //console.log(resp.data)


              Reviews.getTripInfo(user.trip_id).then(function(resp) {

                userObj.start_point = resp.data[0].pickup_point;
                userObj.destination = resp.data[0].dropoff_point;
                userObj.arrival_date = resp.data[0].arrival_date;
                userObj.arrival_time = resp.data[0].arrival_time;
                userObj.trip_id = resp.data[0].id;

                //console.log(resp.data)

                console.log(userObj)

                $scope.results.push(userObj);

              }).then(function() {

              })
            })
          })

          //console.log(resp.data)

        })
      })




    })
  }
          console.log($scope.results)

  $scope.getMissingReviews();
//function to check to see if needs_review_user_id exists.
//if it exists, redirect to addreview.html


})

.factory('Reviews', function($http) {
  var counter = 0;

  var getCount = function() {
   counter++;
   return counter;
  }

  var getUserReviews = function(userID) {

   return $http({
     method: 'GET',
     url: 'api/reviews/getUserReviews',
     data: userID
   })
  }

  var addReview = function(review) {
    console.log('add review: ' + review);
    return $http({
      method: 'POST',
      url: 'api/reviews/addReview',
      data: review
    })
  }

  var getMissingTripReviews = function(tripID, userID) {
    var data = {};
    data.trip_id = tripID;
    data.user_id = userID;

    console.log('here ins getMissingReviews')
    return $http({
      method: 'POST',
      url: 'api/rider/get_missing_trip_reviews',
      data: data
    })
  }

  var getUserTrips = function(userID) {
    var data = {};
    data.user_id = userID;

    console.log('here ins getUserTrips')
    return $http({
      method: 'POST',
      url: 'api/rider/get_user_trips',
      data: data
    })
  }

  var getUserInfo = function(userID) {
    var data = {};
    data.userID = userID;

    return $http({
      method: 'POST',
      url: '/data/users/getProfileInfo',
      data: data
    })
  }

  var getTripInfo = function(tripID) {
    var data = {};
    data.tripID = tripID;

    return $http({
      method: 'POST',
      url: 'api/trips/view_trip',
      data: data
    })
  }


  return {
    getCount: getCount,
    getUserReviews: getUserReviews,
    addReview: addReview,
    getMissingTripReviews: getMissingTripReviews,
    getTripInfo: getTripInfo,
    getUserInfo: getUserInfo,
    getUserTrips: getUserTrips
  }



})
