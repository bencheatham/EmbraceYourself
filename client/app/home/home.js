angular.module('ridehook.home', [])

.controller('HomeController', function ($scope, $http){


	$scope.searchTrip = function(information){

		var date = information.depart_date;
		var day = date.getDate();
		var monthIndex = date.getMonth() + 1;
		var year = date.getFullYear();
		var newDepartDate = "" + monthIndex + "/" + day + "/" + year;
		information.depart_date = newDepartDate;
		console.log(information)

		return $http({
			method: 'POST', 
			url: 'data/trips/findtrip',
			data: information
		})
		.then(function(resp){
		console.log(resp);
		return resp.results;
		})
	}

});