angular.module('ridehook.tripview', [])

.controller('ViewTripController', function($scope, /*$tripID, $userID,*/ ViewTrip) {

  //$tripID;
  //var userID = $userID;

   $scope.trip = {};
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
   // $scope.trip.arrival_date = "";
   // $scope.trip.arrival_time = "";
   // $scope.trip.departure_date = "";
   // $scope.trip.departure_time = "";
   // $scope.trip.description = "";
   // $scope.trip.dropoff_point = "";
   // $scope.trip.pickup_point = "";
   // $scope.trip.seats = "";
   // $scope.trip.user_id = "";
   // $scope.trip.id = "";




  $scope.pubTrip = function() {

    $scope.startpoint = 'San Fran';
    $scope.destination = 'Seattle';

  }

  $scope.getThisTrip = function(tripID) {
    
    var tripID = 1;

    ViewTrip.getTrip(tripID)
     .then(function(resp) {
      //["command", "rowCount", "oid", "rows", "fields", "_parsers", "rowAsArray"]
      console.log(resp.data[0]);
       $scope.trip = resp.data[0];


       $scope.trip.arrival_date = resp.data[0].arrival_date;
       $scope.trip.arrival_time = resp.data[0].arrival_time;
       $scope.trip.depart_date = resp.data[0].depart_date;
       $scope.trip.depart_time = resp.data[0].depart_time;
       $scope.trip.description = resp.data[0].description;
       $scope.trip.dropoff_point = resp.data[0].dropoff_point;
       $scope.trip.pickup_point = resp.data[0].pickup_point;
       $scope.trip.seats = resp.data[0].seats;
       $scope.trip.user_id = resp.data[0].user_id;
       $scope.trip.id = resp.data[0].id;



       userID = $scope.trip.userID
     })
     // .catch(function(error) {
     //  console.log(error + tripID + ' this trip did not load.');
     // })
     // .then(function(userID) {
     //   ViewTrip.getUser(userID)
     //    .then(function() {
     //      $scope.user = data;
     //    })
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
  };


  $scope.makeProposal = function() {
   //add stuf in here about proposal when clicking 'buy button'
  }


   




})
.factory('ViewTrip', function($http) { 


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
    return $http({
      method: 'GET',
      url: '/api/user/view_trip',
      data: userID
    })
    .then(function(resp) {
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



  return {
   getTrip: getTrip,
   getUser: getUser,
   getReviews: getReviews,
   getMessages: getMessages
  }
})