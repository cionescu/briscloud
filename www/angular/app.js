var app = angular.module('CloudDocker', ['ngRoute']);

app.config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    return $routeProvider.when("/", {
      templateUrl: "briscloud/www/angular/templates/_welcome.html",
      controller: 'clientController'
    }).otherwise({
      templateUrl: 'www/angular/templates/_welcome.html',
      controller: 'clientController'
    });
  }
]).config([
  '$httpProvider', function($httpProvider) {
    return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]).run();

app.filter('capitalize', function() {
  return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  }
});
