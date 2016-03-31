angular.module('ridehook', [
  'ridehook.trips',
  'ridehook.messages',
  'ridehook.auth',
  'ngRoute'
 ]) 
 .config(function($routeProvider, $httpProvider) {
   $routeProvider
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
       controller: 'TripsController'
       authenticate: true,
     })
     .when('/messages', {
       templateUrl: 'app/messages/messages.html',
       controller: 'MessagesController'
       authenticate: true,
     })
     .otherwise({
       redirectTo: '/'
     })

    // $httpProvider.interceptors.push('AttachTokens');
 })
 // .factory('AttachTokens', function($window) {

 // })