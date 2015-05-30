'use strict';

angular.module('feedreaderApp')
.factory('Feed', function FeedFactory($http) {
  return {
    getFeed: function(url, callback) {

      // using yql as proxy for getting xml feed as json string
      var root = 'https://query.yahooapis.com/v1/public/yql?q=',
          yql = 'select * from xml where url="' + url + '"',
          proxyUrl = root + encodeURIComponent(yql) + '&format=json&diagnostics=false&callback=JSON_CALLBACK';

      // request
      $http.jsonp(proxyUrl)
        .success(function(data) {
          console.log(data.query.results.rss.channel.item);

          // send feed items array to callback function
          if (callback) {
            callback(data.query.results.rss.channel.item);
          }

      }).catch(function() {
          window.alert('Error');
      });
    }
  };
});
