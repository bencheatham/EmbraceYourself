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
			description: $scope.trip.description,
			pickup_point: $scope.trip.pickup,
			dropoff_point: $scope.trip.dropoff,
			depart_date: Date.parse($scope.trip.startDate),
			depart_time: $scope.trip.departHour + ':' + $scope.trip.departMinute + $scope.trip.departTimeperiod,
			arrive_date: Date.parse($scope.trip.endDate),
			arrive_time: $scope.trip.arriveHour + ':' + $scope.trip.arriveMinute + $scope.trip.arriveTimeperiod,
			seats: Number($scope.trip.seats),
			user_id: 1
		};

		// var tripObj = {
		// 	description: 'Yosemite camping trip!',
		// 	pickup_point: 'San Francisco',
		// 	dropoff_point: 'Yosemite Valley',
		// 	depart_date: '1460098800000',
		// 	depart_time: '4:30PM',
		// 	arrive_date: '1460098800000',
		// 	arrive_time: '9:30PM',
		// 	seats: 4,
		// 	user_id: 1
		// };

		console.log('seats', Number($scope.trip.seats), 'type: ', typeof Number($scope.trip.seats));

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

		console.log('tripObj to send to server: ', tripObj);

		//INSERT INTO trips(description, pickup_point, dropoff_point, depart_date, depart_time, arrival_date, arrival_time, seats, user_id)

		return $http({
			method: 'POST',
			url: '/data/trips/newtrip',
			data: tripObj

		})
		.then(function (resp) {
			console.log('Successful POST request: ', resp);
			return resp;
		});

	};
});

