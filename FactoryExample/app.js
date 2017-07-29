(
  function () {
    'use strict';
    angular.module( 'ShoppingListApp', [])
    .controller( 'ShoppingListController1', ShoppingListController1 )
    .factory( 'ShoppingListFactory', ShoppingListFactory );

    ShoppingListController1.$inject = [ 'ShoppingListFactory' ];

    function ShoppingListController1( ShoppingListFactory ){
      var list1 = this;
      var shoppingListService = ShoppingListFactory(3);
      list1.name = "";
      list1.qty = "";
      list1.addItem = function () {
        try {
            shoppingListService.addItem( list1.name, list1.qty );
        } catch (error) {
          list1.errorMsg = error.message;
        }

      }
      list1.items = shoppingListService.getItems();
    }

    function ShoppingListFactory() {
      var factory = function (maxItems) {
        return new ShoppingListService(maxItems);
      }
      return factory;
    }

    function ShoppingListService(maxItems) {
      var service = this;
      var items = [];
      service.addItem = function ( name, qty ) {
        console.log( " items size :", items.length );
        if( maxItems == undefined || items.length < maxItems ) {
          var item = {
            name : name,
            qty : qty
          }
          items.push( item );
        } else {
          throw new Error("Already max size"+ maxItems +" is reached!");
        }
      };
      service.getItems = function () {
        return items;
      };
    }

  }
)()
