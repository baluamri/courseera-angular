(
  function(){
    'use strict'
    angular.module('DIApp', [])
    // .controller( 'DIAppController', ['$scope', '$filter',  DIAppController])
    .controller( 'DIAppController', DIAppController);

    DIAppController.$inject = ['$scope','$filter'];

    function DIAppController($scope,$filter) {
      $scope.name = "Balaji";
      $scope.upper = function(){
        var upCase = $filter('uppercase');
        $scope.name = upCase( $scope.name );
      }
    }
  }
)()


// !function(){"use strict";function e(e,n){e.name="Balaji",e.upper=function(){var r=n("uppercase");e.name=r(e.name)}}angular.module("DIApp",[]).controller("DIAppController",e),e.$inject=["$scope","$filter"]}();
