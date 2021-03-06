// Sets up main angular module and dependency injections
angular.module('ridehook', [
    'ridehook.trips',
    'ridehook.messages',
    'ridehook.home',
    'ridehook.reviews',
    'ridehook.tripview',
    //'ridehook.auth',
    'ridehook.search',
    'ridehook.profile',
    'ngRoute',
    'ngMaterial'

])
// Angular's within-the-page routing system (uses 'angular-route')
.config(function($routeProvider, $httpProvider) {
  $routeProvider
  //Each route binds a view (.html) and a controller to an endpoint (/signin)
      .when('/signin', {
          templateUrl: 'app/auth/signin.html',
          controller: 'AuthController',
          authenticate: true
      })
      .when('/signup', {
          templateUrl: 'app/auth/signup.html',
          controller: 'AuthController',
          authenticate: true
      })
      .when('/trips', {
          templateUrl: 'app/trips/trips.html',
          controller: 'TripsController',
          authenticate: true
      })
      .when('/viewtrip', {
          templateUrl: 'app/trips/viewtrip.html',
          controller: 'ViewTripController',
          authenticate: true
      })
      .when('/addreview', {
          templateUrl: 'app/reviews/addreview.html',
          controller: 'ReviewController',
          authenticate: true
      })
      .when('/userreviews', {
          templateUrl: 'app/reviews/userreviews.html',
          controller: 'ReviewController',
          authenticate: true
      })
      .when('/search', {
          templateUrl: 'app/search/search.html',
          controller: 'SearchController',
          authenticate: true
      })
      .when('/messages', {
          templateUrl: 'app/messages/messages.html',
          controller: 'MessagesController',
          authenticate: true
      })
      .when('/home', {
          templateUrl: 'app/home/home.html',
          controller: 'HomeController',
          authenticate: true
      })
      .when('/search', {
          templateUrl: 'app/search/search.html',
          controller: 'SearchController',
          authenticate: true
      })
      .when('/profile',{
          templateUrl: 'app/profile/profile.html',
          controller: 'ProfileController',
          authenticate: true
      })
      .otherwise({
          redirectTo: '/home'
      });

  $httpProvider.interceptors.push('authInterceptor');

})
// .run(function ($rootScope, $location) {

// })
.factory('authInterceptor', function($rootScope, $q, $window) {
  return {
      request: function(config) {
          config.headers = config.headers || {};
          if ($window.sessionStorage.token) {
              config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
          }
          return config;
      },
      response: function(response) {
          if (response.status === 401) {
              // handle the case where the user is not authenticated
          }
          return response || $q.when(response);
      }
  };
})
.factory('authenticate', function ($window) {
    var loggedIn = false;

    var loginCheck = function () {
      if($window.sessionStorage.id){
        loggedIn = true;
      }

      return loggedIn;
    };

    return {
      loginCheck: loginCheck
    };
})
.factory('searchResults', function () {
    var sObj = {
        results: []
    }
    return sObj;
})
.factory('tripIDFactory', function () {
    var tObj = {
        tripID: null,
        tripResult: null // trip result that is in the form of JSON
    }
    return tObj;
})
.controller('AppCtrl', function ($scope, $mdDialog, $window, $location) {

  $scope.loggedIn = $window.sessionStorage.un;
  $scope.needs_review_username = $window.sessionStorage.needs_review_username;
  $scope.needs_user_review_trip_id = $window.sessionStorage.needs_user_review_trip_id;

  $scope.logOut = function () {
    // delete $window.sessionStorage.token;
    // delete $window.sessionStorage.id;
    // delete $window.sessionStorage.un;
    // delete $window.sessionStorage.fn;
    // delete $window.sessionStorage.ln;
    // delete $window.sessionStorage.pp;
    $window.sessionStorage.clear();
    $window.location.reload();
  };

  $scope.showSignUp = function(ev) {
      $mdDialog.show({
          controller: DialogController,
          templateUrl: 'tabDialog.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
      })
  };

  $scope.showSignIn = function(ev) {
      $mdDialog.show({
          controller: DialogController,
          templateUrl: 'tabDialog1.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
      })
  };

  function DialogController($scope, $mdDialog, $http, $window, $location) {

      $scope.hide = function() {
          $mdDialog.hide();
      };

      $scope.cancel = function() {
          $mdDialog.cancel();
      };

      $scope.newUser = function(information) {

          information = {
              username: information.username,
              password: information.password,
              first_name: information.first_name,
              last_name: information.last_name,
              email: information.email,
              birth_date: information.birth_date,
              profile_pic: information.profile_pic,
              city: information.city,
              state: information.state,
              zip_code: Number(information.zip)
          };

          if (!information.username || !information.password) {
              console.log('Error: a required field is empty.');
              return;
          }

          console.log('info obj to POST to server: ', information);

          return $http({
              method: 'POST',
              url: '/data/users/signup',
              data: information
          }).then(function(response) {
              console.log(response.data);
              $mdDialog.hide(information);
              $scope.loginUser(information);
          }, function(error) {
              console.log(error);
          });
      };

      $scope.loginUser = function(information) {

        information = {
            username: information.username,
            password: information.password,
        };

        return $http({
            method: 'POST',
            url: '/data/users/login',
            data: information
        }).then(function(response) {

            $window.sessionStorage.token = response.data.token;
            $window.sessionStorage.id = response.data.user_id;
            $window.sessionStorage.un = response.data.username;
            $window.sessionStorage.fn = response.data.first_name;
            $window.sessionStorage.ln = response.data.last_name;
            $window.sessionStorage.pp = response.data.profile_pic;

            console.log('Success: ', response);
            $mdDialog.hide(information);
            $window.location.reload();

        }, function(error) {
            // delete $window.sessionStorage.token;
            // delete $window.sessionStorage.id;
            // delete $window.sessionStorage.un;
            // delete $window.sessionStorage.fn;
            // delete $window.sessionStorage.ln;
            // delete $window.sessionStorage.pp;
            $window.sessionStorage.clear();
            console.log('Error: ', error);
        });

      };

      $scope.checkReviewStatus = function(information) {

        information = {
            username: information.username,
            password: information.password
        };

        console.log("cat: ", information);
        return $http({
            method: 'POST',
            url: 'data/reviews/status',
            data: information
        }).then(function(response){
            console.log("review response:", response.data);
            $window.sessionStorage.needs_review_username = response.data.needs_review_username;
            $window.sessionStorage.needs_user_review_trip_id = response.data.needs_user_review_trip_id;

            $window.sessionStorage.needs_user_review_driver_id = response.data.needs_user_review_driver_id;
            $window.sessionStorage.needs_review_user_id = response.data.needs_review_user_id;

            if (response.data !== "User reviews are up-to-date."){
                $location.url('/addreview');
                $window.location.reload();
            }

        })


      }

  }

});
