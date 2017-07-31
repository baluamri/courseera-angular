(
  function () {
    angular.module( 'PromiseExApp', [])
    .controller( 'ShoppingListCtrl', ShoppingListCtrl )
    .service( 'ShoppingList', ShoppingListService )
    .service( 'WeightLossFilter', WeightLossFilterService );

    ShoppingListCtrl.$inject = ['ShoppingList'];
    function ShoppingListCtrl(ShoppingList) {
      var list = this;
      list.addItem = function () {
        ShoppingList.addItem( list.name, list.qty )
      }
      list.items = ShoppingList.getItems();
    }

    // Implementation 1
    // ShoppingListService.$inject = ['WeightLossFilter', '$q'];
    // function ShoppingListService(WeightLossFilter) {
    //   var service = this;
    //   var items = [];
    //
    //   service.addItem = function( name, qty ) {
    //     var promise = WeightLossFilter.checkName( name );
    //     promise.then( function (response) {
    //
    //       var nextPromise = WeightLossFilter.checkQty( qty );
    //       nextPromise.then( function (response) {
    //         var item = { name : name, qty: qty };
    //         items.push( item );
    //       }, function (error) {
    //         console.log( error.message );
    //       });
    //
    //     }, function (error) {
    //       console.log( error.message );
    //     });
    //   }
    //   service.getItems = function () {
    //     return items;
    //   }
    // }

    // Implementation 2
    // ShoppingListService.$inject = ['WeightLossFilter', '$q'];
    // function ShoppingListService(WeightLossFilter) {
    //   var service = this;
    //   var items = [];
    //
    //   service.addItem = function( name, qty ) {
    //     var promise = WeightLossFilter.checkName( name )
    //     .then( function (response) {
    //       return WeightLossFilter.checkQty( qty );
    //     })
    //     .then( function (response) {
    //       var item = { name : name, qty: qty };
    //       items.push( item );
    //     })
    //     .catch( function (error) {
    //       console.log( error.message );
    //     });
    //   };
    //
    //   service.getItems = function () {
    //     return items;
    //   }
    // }

    // Implementation: 3
    ShoppingListService.$inject = ['WeightLossFilter', '$q'];
    function ShoppingListService(WeightLossFilter, $q) {
      var service = this;
      var items = [];

      service.addItem = function( name, qty ) {
        var promise = WeightLossFilter.checkName( name );
        var nextPromise = WeightLossFilter.checkQty( qty );

        $q.all([ promise, nextPromise ])
        .then( function (response) {
          var item = { name : name, qty: qty };
          items.push( item );
        })
        .catch( function (error) {
          console.log( error.message );
        });
      };

      service.getItems = function () {
        return items;
      }
    }

    WeightLossFilterService.$inject = ['$q', '$timeout'];
    function WeightLossFilterService($q, $timeout) {
      var service = this;

      var result = {
        message : ""
      };

      service.checkName = function (name) {
        var deferred = $q.defer();
        $timeout( function () {
          if( name.toLowerCase().indexOf( "cookies" ) == -1 ) {
            deferred.resolve(result);
          } else {
            result.message = "Cookies is not allowed !";
            deferred.reject( result )
          }
        }, 3000 );
        return deferred.promise;
      };

      service.checkQty = function (qty) {
        var deferred = $q.defer();
        $timeout( function () {
          if( qty < 5 ) {
            deferred.resolve( result );
          } else {
            result.message = "Too much quantity !";
            deferred.reject( result )
          }
        }, 1000 )
        return deferred.promise;
      };
    }

  }
)()
