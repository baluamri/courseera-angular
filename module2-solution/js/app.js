(
  function () {
    'use strict';
    angular.module( 'ShoppingListCheckOff', [] )
    .controller( 'ToBuyController', ToBuyController )
    .controller( 'AlreadyBoughtController', AlreadyBoughtController )
    .service( 'checkOffService', ShoppingListCheckOffService );

    ToBuyController.$inject = ['checkOffService'];
    function ToBuyController(checkOffService) {
      var toBuyCtrl = this;
      toBuyCtrl.toBuyItems = checkOffService.getToBuyItems();

      toBuyCtrl.buyItem = function (index) {
        checkOffService.buyItem(index);
      }
    }

    AlreadyBoughtController.$inject = ['checkOffService'];
    function AlreadyBoughtController(checkOffService) {
      var boughtCtrl = this;
      boughtCtrl.boughtItems = checkOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
      var service = this;
      var toBuyItems = [ {name: "Cookies", qty: 10},
                        {name: "Ice Creams", qty: 3},
                        {name: "Banana", qty: 6},
                        {name: "Chips", qty: 5},
                        {name: "Juice", qty: 7}];
      var boughtItems = [];

      service.getToBuyItems = function () {
        return toBuyItems;
      }

      service.getBoughtItems = function () {
        return boughtItems;
      }

      service.buyItem = function (index) {
        var itemRemoved = toBuyItems.splice( index, 1 );
        boughtItems.push( itemRemoved[0] );
      }

      // service.isToBuyItemsEmpty = function () {
      //   return toBuyItems.length == 0
      // }
      //
      // service.isBoughtItemsEmpty = function () {
      //   return boughtItems.length == 0
      // }
    }

  }
)()
