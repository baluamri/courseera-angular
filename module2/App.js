(
  function(){

    angular.module( 'nameCalculatorApp',[] )
      .controller( 'nameCalculatorAppController', function($scope){

        $scope.displayResult = function() {
           $scope.totalValue = calculateName( $scope.name );
        };

        function calculateName(nameStr) {
          var result = 0;
          for (var i = 0; i < nameStr.length; i++) {
            result += nameStr.charCodeAt(i);
          }
          return result;
        }
    })
  }
)()
