( function(){
  'use strict'
  angular.module('myFirstApp', [])
  .controller('myFirstAppController', function($scope){
    // $scope.name = "";
    $scope.sayHello = function(){
      return "Hello Coursera!"
    }
  });
})()
