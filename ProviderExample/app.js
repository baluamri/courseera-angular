(
  function () {
    'use strict';
    angular.module( 'ShoppingListApp', [])
    .controller( 'ShoppingListController1', ShoppingListController1 )
    .provider( 'ShoppingListService', ShoppingListProvider )
    .config(Config);

    Config.$inject = ['ShoppingListServiceProvider'];
    function Config(ShoppingListServiceProvider) {
      ShoppingListServiceProvider.defaults.maxItems = 4;
    }

    ShoppingListController1.$inject = [ 'ShoppingListService' ];
    function ShoppingListController1( ShoppingListService ){
      var list1 = this;
      list1.name = "";
      list1.qty = "";
      list1.addItem = function () {
        try {
            ShoppingListService.addItem( list1.name, list1.qty );
        } catch (error) {
          list1.errorMsg = error.message;
        }
      }
      list1.items = ShoppingListService.getItems();
    }

    function ShoppingListProvider() {
      var provider = this;
      provider.defaults = {
        maxItems : 3
      }
      provider.$get = function () {
        return new ShoppingListService(provider.defaults.maxItems);
      }
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
