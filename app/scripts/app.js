'use strict';

/**
 * @ngdoc overview
 * @name feedreaderApp
 * @description
 * # feedreaderApp
 *
 * Main module of the application.
 */
angular
  .module('feedreaderApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
