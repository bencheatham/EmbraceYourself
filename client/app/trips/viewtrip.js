angular.module('ridehook.tripview', [])

.controller('ViewTripController', function($scope, /*$tripID, $userID,*/ ViewTrip) {

  //$tripID;
  //var userID = $userID;


  $scope.pubTrip = function() {

    $scope.startpoint = 'San Fran';
    $scope.destination = 'Seattle';

  }

  $scope.getThisTrip = function(tripID) {
    
    var tripID = 1;

    ViewTrip.getTrip(tripID)
     .then(function(resp) {
      //["command", "rowCount", "oid", "rows", "fields", "_parsers", "rowAsArray"]
      console.log(resp.data);
       $scope.trip = resp.data;
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