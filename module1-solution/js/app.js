(
function (){
  'use strict'
  angular.module( 'LunchCheck',[])
  .controller( 'LunchCheckController', lunchCheckController);

  lunchCheckController.$inject = [ '$scope' ];

  function lunchCheckController($scope){

    $scope.checkIfTooMuch = function(){
      var input = $scope.lunchMenu;

      if( isEmpty(input) ) {
        $scope.message = "Please enter data first.";
        $scope.msgClass = "message-color-red";
        return;
      }

      var menuItems = input.split(",");
      var menuItemsLength = removeEmptyItems(menuItems).length;

      if( menuItemsLength == 0 ) {
        $scope.message = "Please enter data first.";
        $scope.msgClass = "message-color-red";
      } else if( menuItemsLength <= 3 ) {
        $scope.message = "Enjoy!";
        $scope.msgClass = "message-color-green";
      } else {
        $scope.message = "Too much!"
        $scope.msgClass = "message-color-green";
      }
    }

    function removeEmptyItems(menuItems){
      var itemsWithoutEmptyVals = [];
      for (var i = 0; i < menuItems.length; i++) {
        if( !isEmpty( menuItems[i].trim() ) ) {
            itemsWithoutEmptyVals.push( menuItems[i] );
        }
      }
      return itemsWithoutEmptyVals;
    }

    function isEmpty( input ){
      return input == null || input == "";
    }
  }
}
)()
