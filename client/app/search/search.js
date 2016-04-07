// need to add to app.js -- routing and module

angular.module('ridehook.search', [])

.controller('SearchController', function ($scope, $http, searchResults){

  $scope.results = searchResults.results;

  if ($scope.results.length > 0) {
    $scope.from = $scope.results[0].pickup_point;
    $scope.to = $scope.results[0].dropoff_point;
    initMap($scope.from, $scope.to)
  }

});
