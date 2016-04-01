// Sets up main angular module and dependency injections
angular.module('ridehook', [
  //'ridehook.trips',
  'ridehook.messages',
  //'ridehook.auth',
  'ngRoute'
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
.controller('main', function ($scope) {


});