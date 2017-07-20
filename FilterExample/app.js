(
  function () {
    'use strict'
    angular.module( 'FilterExample', [])
    .controller( 'FilterController', filterController )
    .filter( 'loves', lovesFilter )
    .filter( 'truth', truthFilter );

    filterController.$inject = ['$scope', '$filter', 'lovesFilter'];

    function filterController( $scope, $filter, lovesFilter ){
      $scope.name = "Balaji";
      $scope.tanuview = "front";
      var msg = $scope.name + " likes to eat healthy snacks at night!!";
      $scope.message = msg;

      var upCase = $filter('uppercase');
      $scope.messageUpCase = upCase( msg );

      $scope.loveMessage = lovesFilter( msg );

      $scope.snackCost = $filter( 'currency' ) ( .47, "$USD ", 4 );

      $scope.changeImgView = function(){
        if ($scope.tanuview == "front") {
            $scope.tanuview = "side";
        } else {
            $scope.tanuview = "front";
        }

      }
    }

    function lovesFilter() {
      return function(input) {
        input = input || "";
        return input.replace( "likes", "loves" );
      }
    }

    function truthFilter() {
      return function(input, source, target) {
        input = input || "";
        return input.replace( source, target );
      }
    }
  }
)()
