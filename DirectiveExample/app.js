(
  function () {
    'use strict';
    angular.module( 'ShoppingListApp', [])
    .controller( 'ShoppingListController1', ShoppingListController1 )
    .controller( 'ShoppingListController2', ShoppingListController2 )
    .factory( 'ShoppingListFactory', ShoppingListFactory )
    .directive( 'listItem', ListItem )
    .directive( 'listItemDesc', ListItemDesc );

    function ListItem() {
      var ddo = {
        restrict: 'AE',
        templateUrl : 'ListItem.html',
        scope: {
          list: '=myList',
          title: '@title'
        }
      }
      return ddo;
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
      var shoppingListService = ShoppingListFactory(3);
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

      }
      list1.items = shoppingListService.getItems();
      list1.title = origTitle + " ( "+ list1.items.length + " items )";
    }

    ShoppingListController2.$inject = [ 'ShoppingListFactory' ];

    function ShoppingListController2( ShoppingListFactory ){
      var list2 = this;
      var shoppingListService = ShoppingListFactory(5);
      var originalTitle = "Shopping List#2";
      list2.name = "";
      list2.qty = "";
      list2.addItem = function () {
        try {
            shoppingListService.addItem( list2.name, list2.qty );
            list2.title = originalTitle + " ( "+ list2.items.length + " items)";
        } catch (error) {
          list2.errorMsg = error.message;
        }

      }
      list2.items = shoppingListService.getItems();
      list2.title = originalTitle + " ( "+ list2.items.length + " items)";
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
      service.getItems = function () {
        return items;
      };
    }

  }
)()
