(
  function () {
    angular.module( 'MenuCategoriesApp', [] )
    .controller( 'MenuCategoriesController', MenuCategoriesController )
    .service( 'MenuCategoriesService', MenuCategoriesService )
    .constant( 'BaseURLPath', "http://davids-restaurant.herokuapp.com" );

    MenuCategoriesController.$inject = [ 'MenuCategoriesService' ];
    function MenuCategoriesController(MenuCategoriesService){
      var list = this;

      var promise = MenuCategoriesService.getMenuCategories();
      promise
      .then(function (response) {
        list.menuCategories = response.data;
      })
      .catch(function (errorResponse) {
        console.log( "Some error happened : ", errorResponse );
      })

      list.logMenuItems = function (short_name) {
        var promise = MenuCategoriesService.getMenuForCategory(short_name);
        promise
        .then( function (response) {
            console.log( response.data );
        })
        .catch(function (errorResponse) {
          console.log( "Some error happened : ", errorResponse );
        })
      }
    }

    MenuCategoriesService.$inject=['$http', 'BaseURLPath'];
    function MenuCategoriesService($http, BaseURLPath) {
      var service = this;

      service.getMenuCategories = function () {
        var response = $http({
          method: "GET",
          url: BaseURLPath + "/categories.json"
        });
        return response;
      }

      service.getMenuForCategory = function (short_name) {
        var response = $http({
          method: "GET",
          url: BaseURLPath + "/menu_items.json",
          params: {
            category : short_name
          }
        });
        return response;
      }
    }

  }
)()
