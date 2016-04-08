
angular.module('ridehook.profile', [])

.controller('ProfileController', function ($scope, $window, $location, $http) {
	if ($window.sessionStorage.id){
	$scope.firstname = $window.sessionStorage.fn;
	$scope.biography = null;
}

	// $scope.showEditableProfile = function(){
	// 	if ($window.sessionStorage.id){
	// $scope.firstname = $window.sessionStorage.fn;
	// $scope.biography = null;
	// 	} else{

	// 	}
	// };

	$scope.getUserDisplay = function(data, req, res, client){
		
		information = {
			biography: $scope.biography,
			id : $window.sessionStorage.id
		}
		return $http({
			method: 'POST',
			url: '/data/users/profile'	
		})
		.then(function(res){
			console.log("cat")
			console.log(resp.body)
		});
	};

	if ($window.sessionStorage){
		$scope.getUserDisplay();
	}
});
