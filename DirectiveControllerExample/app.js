(
  function () {
    'use strict';
    angular.module( 'ShoppingListApp', [])
    .controller( 'ShoppingListController1', ShoppingListController1 )
    .controller( 'ShoppingListDirectiveController', ShoppingListDirectiveController )
    .factory( 'ShoppingListFactory', ShoppingListFactory )
    .directive( 'shoppingList', ShoppingList )
    .directive( 'listItemDesc', ListItemDesc );

    function ShoppingList() {
      var ddo = {
        restrict: 'AE',
        templateUrl : 'ShoppingList.html',
        scope: {
          items: '=',
          title: '@',
          remove: '&'
        },
        controller: ShoppingListDirectiveController,
        controllerAs: 'list',
        // controller: 'ShoppingListDirectiveController as list',
        bindToController: true
      };
      return ddo;
    }

    function ShoppingListDirectiveController() {
      var list = this;
      list.cookiesInList = function () {
        for (var i = 0; i < list.items.length; i++) {
          if( list.items[i].name.toLowerCase().indexOf( "cookies" ) != -1 ) {
            return true;
          }
        }
        return false;
      }
    }

    function ListItemDesc() {
      var ddo = {
        template : '{{item.name}} of {{item.qty}}'
      }
      return ddo;
    }


    ShoppingListController1.$inject = [ 'ShoppingListFactory' ];
    function ShoppingListController1( ShoppingListFactory ){
      var list1 = this;
      var shoppingListService = ShoppingListFactory(5);
      var origTitle = "Shopping List#1";

      list1.name = "";
      list1.qty = "";
      list1.addItem = function () {
        try {
            shoppingListService.addItem( list1.name, list1.qty );
            list1.title = origTitle + " ("+ list1.items.length + " items)";
        } catch (error) {
          list1.errorMsg = error.message;
        }

      };
      list1.removeItem = function(index) {
        shoppingListService.removeItem( index );
      };
      list1.items = shoppingListService.getItems();
      list1.title = origTitle + " ( "+ list1.items.length + " items )";
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
      service.removeItem = function ( index ) {
        items.splice( index, 1 );
      };
      service.getItems = function () {
        return items;
      };
    }

  }
)()
