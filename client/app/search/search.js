// need to add to app.js -- routing and module

angular.module('ridehook.search', [])

.controller('SearchController', function ($scope, $location, searchResults, tripIDFactory){

  $scope.results = searchResults.results;

  if ($scope.results.length > 0) {
    $scope.from = $scope.results[0].pickup_point;
    $scope.to = $scope.results[0].dropoff_point;
    initMap($scope.from, $scope.to);
  }

  $scope.sendTrip = function(id, result) {
    // stores the id in the tripID factory for ben's /viewtrip
    tripIDFactory.tripID = id;
    tripIDFactory.tripResult = result;
    // console.log("tripResult: ", tripIDFactory.tripResult);
    $location.url('/viewtrip');
  }
});
