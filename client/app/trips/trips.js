// title
// blurb
// pickup point - city (contact driver for details)
// date, time (calendar input widget?)
// car seats available
angular.module('ridehook.trips', [])

.controller('TripsController', function ($scope, $http) {
 $scope.trip = {};

 $scope.createTrip = function () {

  var tripObj = {
   user_id: 12345,
   description: $scope.trip.dscription,
   pickup_point: $scope.trip.pickup,
   dropoff_point: $scope.trip.dropoff,
   departDate: $scope.trip.startDate,
   departTime: $scope.trip.departHour + ':' + $scope.trip.departMinute + $scope.trip.departTimeperiod,
   arriveDate: $scope.trip.endDate,
   arriveTime: $scope.trip.arriveHour + ':' + $scope.trip.arriveMinute + $scope.trip.arriveTimeperiod,
   seats: $scope.trip.seats
  };

  // console.log('pickup location is: ', $scope.trip);
  // //Date.UTC(year, month[, day[, hour[, minute[, second[, millisecond]]]]])
  // console.log('startTime type: ', typeof $scope.trip.startDate);

  // console.log("startDate: ", $scope.trip.startDate);
  // console.log("startDate.toString(): '" + $scope.trip.startDate.toString().slice(0, 15) + "'");
  // //14char  
  // //Date.UTC(), .toUTCString()
  // console.log('Date.parse(startDate): ', Date.parse($scope.trip.startDate));
  // console.log('Date.parse(startDate).toString(): ', Date.parse($scope.trip.startDate.toString()));
  // console.log('pickup location is: ', $scope.trip.pickup);
  // console.log('depart time: ', $scope.trip.departHour + ':' + $scope.trip.departMinute + $scope.trip.departTimeperiod);
  // console.log('arrive time: ', $scope.trip.arriveHour + ':' + $scope.trip.arriveMinute + $scope.trip.arriveTimeperiod);

  // console.log('tripObj to send to server: ', tripObj);

  return $http({
   method: 'POST',
   url: '/data/trips',
   data: tripObj

  })
  .then(function (resp) {
   console.log('Successful POST request: ', resp);
   return resp;
  });

 };
});

