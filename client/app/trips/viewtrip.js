angular.module('ridehook.tripview', [])

.controller('ViewTripController', function($scope, $window, $route, ViewTrip, tripIDFactory, Riders) {


   $scope.trip = {};
   $scope.user = {};
/*
   arrival_date: "4/21/2016",
   arrival_time: "4:20PM",
   depart_date: "4/14/2016",
   depart_time: "3:30PM",
   description: "bblasdfasd asdfsdf asdfsafa sadf",
   dropoff_point: "san francisco",
   id: 1,
   pickup_point: "seattle",
   seats: 3,
   user_id: 1
*/

  //define global variables for trip view controller
  var userID = $window.sessionStorage.id;
  var tripID = tripIDFactory.tripID ? tripIDFactory.tripID : 1;
  var riders = []; //array to hold current trip riders
  var num_seats = 0;
  $scope.isRider = false;
  $scope.tripFull = false;
  $scope.button = "Confirm Seat";



  $scope.getTripRiders = function() {

    riders = Riders.getTripRiders(tripID);
    return riders;

  }

  $scope.isUserRider = function(riders) {

    $scope.isRider = false;
    console.log('riders is:  ')
    console.log(riders.data)

    riders.data.forEach(function(rider) {
      console.log('userID: ' + userID)
      console.log('rider.user_id: ' + rider.user_id)
      console.log(parseInt(rider.user_id) === parseInt(userID))
      if(parseInt(rider.user_id) === parseInt(userID)) {
        $scope.isRider = true;
        $scope.button = "  You're In!  ";
        console.log('YOU ARE A RIDER!')
      }
    });

    
  }

  $scope.changeRiderSeatStatus = function() {

    Riders.getTripRiders(tripID)
    .then(function(resp) {
      var num_riders = resp.data.length;
      ViewTrip.calcSeatsLeft(num_riders, num_seats);
      $scope.trip.seats = ViewTrip.getSeatsLeft();
            $scope.isUserRider(resp);


    })
  }

  $scope.updateSeatsAvailable = function() {


  }



  $scope.getThisTrip = function() {
    
    ViewTrip.getTrip(tripID)
     .then(function(resp) {

       $scope.trip = resp.data[0];
       $scope.trip.window = "Within 1 hour";
       $scope.trip.cargo = "1 suitcase";
       $scope.trip.seat_price = 35;
       $scope.user.profile_pic = "../../assets/profile_pics/126717412.jpg";

       num_seats = resp.data[0].seats

       $scope.changeRiderSeatStatus();

       // Riders.getTripRiders(tripID) //gets # of riders to calculate remaining seats

       // .then(function(resp) {

       //  var num_riders = resp.data.length;
       //  ViewTrip.calcSeatsLeft(num_riders, num_seats);
       //  $scope.trip.seats = ViewTrip.getSeatsLeft();







       // })
     })
     .catch(function(error) {
         console.log(error + tripID + ' this trip did not load.');
     }).then(function() {
      
       ViewTrip.getUser(userID).then(function(resp) {
         $scope.user = resp.data[0];
         console.log("user user user");
         console.log($scope.user)
     })
     //    .catch(function(error) {
     //     console.log(error);
     //    })
     //     .then(function() {
     //      ViewTrip.getReviews(userID)
     //       .then(function(data) {
     //        $scope.reviews = data;
     //       })
     //       .catch(function(error) {
     //        console.log(error);
     //       })
     //       .then(function() {
     //        ViewTrip.getMessages(tripID)
     //         .then(function(data) {
     //          $scope.messages = data;
     //         })
     //         .catch(function(error) {
     //           console.log(error);
     //         })
     //       })
     //     })
     // })
     });



  };





  $scope.takeSeat = function() {

    var data = {
      trip_id: tripID,
      user_id: userID,
      review_id: null,
      trip_end_date: $scope.trip.arrival_date,
      trip_end_time: $scope.trip.arrival_time,
      created_on: Date.now(),
      modified_on: null
    }


    Riders.addRider(data)
    .then(function() {
      $scope.changeRiderSeatStatus();  
    })
  }

  $scope.cancelSeat = function() {

    Riders.deleteRider(userID, tripID)
    .then(function() {
      $scope.changeRiderSeatStatus();
    })
  }







  $scope.getThisTrip();
  $scope.changeRiderSeatStatus();

   




})
.factory('ViewTrip', function($http) { 

  var seats_left = 0;


  var getTrip = function(tripID) {

    var data = {};
    data.tripID = tripID; 
    console.log(data)

    return $http({
      method: 'POST',
      url: '/api/trips/view_trip',
      data: data
    })
    .then(function(resp) {
      return resp;
    });
  };


  var getUser = function(userID) {
    var data = {};
    data.userID = userID; 
    console.log(data.userID)
    return $http({
      method: 'POST',
      url: '/api/user/get_user',
      data: data
    })
    .then(function(resp) {
    //  console.log(resp)
      return resp;
    });
  };

  var getReviews = function(userID) {
    return $http({
      method: 'GET',
      url: '/apil/user/user_reviews',
      data: userID
    })
    .then(function(resp) {
      return resp;
    })
  }

  var getMessages = function(tripID) {
    return $http({
      method: 'GET',
      url: '/api/trips/trip_messages',
      data: tripID 
    })
  }

  var calcSeatsLeft = function(riders, seats) {

    seats_left = seats + 1 - riders; //adding 1 to account for driver as rider

  }

  var getSeatsLeft = function() {

    return seats_left;

  }



  return {
   getTrip: getTrip,
   getUser: getUser,
   getReviews: getReviews,
   getMessages: getMessages,
   calcSeatsLeft: calcSeatsLeft,
   getSeatsLeft: getSeatsLeft
  }
})


.factory('Riders', function($http) {

  var addRider = function(data) {
    return $http({
      method: 'POST',
      url: '/api/rider/add_rider',
      data: data
    })
  }

  var getTripRiders = function(tripID) {

    var data = {};
    data.tripID = tripID; 

    return $http({
      method: 'POST',
      url: '/api/rider/get_trip_riders',
      data: data
    }).then(function(resp) {
      return resp;
    })
  }


  var deleteRider = function(userID, tripID) {

    var data = {};
    data.userID = userID;
    data.tripID = tripID;

    return $http({
      method: 'POST',
      url: '/api/rider/delete_rider',
      data: data
    })


  }




  return {
    addRider: addRider,
    getTripRiders: getTripRiders,
    deleteRider: deleteRider
  }

});



