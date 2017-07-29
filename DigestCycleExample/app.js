(
  function(){
    'use strict';
    angular.module( 'CounterApp', [] )
    .controller( 'CounterAppController', counterAppController );

    counterAppController.$inject = ['$scope'];

    function counterAppController($scope) {

      $scope.onceCounter = 0;
      $scope.counter = 0;

      $scope.showNoOfWatchers = function() {
          console.log( "Watchers count :", $scope.$$watchersCount );
      }

      $scope.countOnce = function() {
        $scope.onceCounter = 1;
      }

      $scope.count = function() {
        $scope.counter++;
      }

      $scope.$watch = function( newValue, oldValue ) {
        console.log( 'newValue : ', newValue  );
        console.log( 'oldValue : ', oldValue  );
      }

      // $scope.$watch('onceCounter', function (newValue, oldValue) {
      //   console.log( ' onceCounter > newValue :', newValue );
      //   console.log( ' onceCounter > oldValue :', oldValue );
      // });
      //
      // $scope.$watch('counter', function (newValue, oldValue) {
      //   console.log( ' onceCounter > newValue :', newValue );
      //   console.log( ' onceCounter > oldValue :', oldValue );
      // });

    }
  }
)()
