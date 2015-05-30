'use strict';

/**
 * @ngdoc function
 * @name feedreaderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the feedreaderApp
 */
angular.module('feedreaderApp')
  .controller('MainCtrl', function ($scope, $cookies, Feed) {

    // get stored feeds (if any exist)
    var urls = $cookies.get('feeds');
    $scope.feeds = urls ? JSON.parse(urls) : [];
    $scope.activeUrl = $scope.feeds.length ? $scope.feeds[0] : '';
    $scope.articles = [];

    // add a feed url
    $scope.addFeed = function() {
      var feed = $scope.feedUrl,
          feeds;

      if ($scope.feeds.length) {
        feeds = $scope.feeds;

        // check if url already existes
        for (var i = 0; i < feeds.length; i++) {
          if (feed === feeds[i]) {
            console.log('feed url already exists');
            return;
          }
        }
      }

      $scope.feeds.push($scope.feedUrl);
      $cookies.put('feeds', JSON.stringify($scope.feeds));
      $scope.feedUrl = '';
      $scope.setActive($scope.feeds.length - 1);
    };

    $scope.setFeed = function(i) {
      $scope.setActiveUrl(i);
      $scope.getFeed(i);
    };

    // set active url
    $scope.setActiveUrl = function(i) {
      console.log('setting active url for', $scope.feeds[i]);
      $scope.activeUrl = $scope.feeds[i];
    };

    // get active url
    $scope.getActiveUrl = function() {
      console.log('active url',$scope.activeUrl);
      return $scope.activeUrl;
    };

    // get feeds as array
    $scope.getFeed = function(i) {
      var url = $scope.feeds[i];
      Feed.getFeed(url, function(articles) {
        $scope.articles = articles;
      });
    };
  });
