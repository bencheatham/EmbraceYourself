// Sets up main angular module and dependency injections
angular.module('ridehook', [
  //'ridehook.trips',
  'ridehook.messages',
  //'ridehook.auth',
  'ngRoute', 
  'ngMaterial'
 ]) 
// Angular's within-the-page routing system (uses 'angular-route')
.config(function($routeProvider, $httpProvider) {
  $routeProvider
  //Each route binds a view (.html) and a controller to an endpoint (/signin)
    .when('/signin', {
     templateUrl: 'app/auth/signin.html',
     controller: 'AuthController'
    })
    .when('/signup', {
     templateUrl: 'app/auth/signup.html',
     controller: 'AuthController'
    })
    .when('/trips', {
     templateUrl: 'app/trips/trips.html',
     controller: 'TripsController',
     authenticate: true
    })
    .when('/messages', {
     templateUrl: 'app/messages/messages.html',
     controller: 'MessagesController',
     authenticate: true
    })
    // .otherwise({
    //  redirectTo: '/'
    // });

 })
// .run(function ($rootScope, $location) {

// })
// .controller('main', function ($scope) {


// });

.controller('AppCtrl', function($scope, $mdDialog, ) {

  $scope.showTabDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'tabDialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
        .then(function(answer) {
          // $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          // $scope.status = 'You cancelled the dialog.';
        });
  };
});

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}


