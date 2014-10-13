var app = angular.module('baseballApp',['ngRoute']);

   app.factory('teams', ['$http', function($http) {
     var method = "GET";
     var url = "http://localhost:4242/distinctTeams";

     var value = {teams:null};

     value.fetch = function() {
       $http({
          method: method,
          url: url
       })
       .success(function(data, status){
         value.status = status;
	 value.teams = data.json;
       })
       .error(function(data, status){
         value.data = data || "Request failed";
	 value.status = status;
       });
     };

     value.fetch();

     return value;
       
   }]);

   app.controller('salaryController',['$scope','$http','$route','$routeParams',
   function($scope, $http, $route, $routeParams){
     $scope.$routeParams = $routeParams;
     $scope.method = "GET";
     $scope.url = "http://localhost:4242/Salaries";

     $scope.fetch = function() {
       $http({
          method: $scope.method,
          url: $scope.url
       })
       .success(function(data, status){
         $scope.status = status;
	 $scope.data = data;
       })
       .error(function(data, status){
         $scope.data = data || "Request failed";
	 $scope.status = status;
       });

     };
     $scope.fetch();
   }]);

   app.controller('teamsController',['$scope', 'teams',
   function($scope, teams){
     $scope.teamFilter = function(str) {
       return function(team){
         return (
	   team[0].name.search(str) != -1 ||
	   team[0].teamID.search(str) != -1 
	 );
       };
     };
     $scope.teamsFactory = teams;
     $scope.teams = $scope.teamsFactory.teams;

     $scope.$watch('teamsFactory.teams',function() {
       $scope.teams = $scope.teamsFactory.teams;
     });

     //console.log(teams);
     /*$scope.method = "GET";
     $scope.url = "http://localhost:4242/distinctTeams";

     $scope.teamFilter = function(str) {
       return function(team){
         console.log(team);
         return (
	   team[0].name.search(str) != -1 ||
	   team[0].teamID.search(str) != -1 
	 );
       };
     };

     $scope.fetch = function() {
       $http({
          method: $scope.method,
          url: $scope.url
       })
       .success(function(data, status){
         $scope.status = status;
	 $scope.teams = data.json;
       })
       .error(function(data, status){
         $scope.data = data || "Request failed";
	 $scope.status = status;
       });
     };
     $scope.fetch();*/
   }]);

   app.config(['$routeProvider','$locationProvider',
     function($routeProvider,$locationProvider){
        $routeProvider.when('/team/:teamName', {
          controller:'salaryController',
	  templateUrl: '/assets/pages/team.html'
        });
      }
   ]);
