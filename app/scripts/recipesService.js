angular.module('recipes').factory('recipeService', ['$http', '$q', function ($http, $q) {

    var _getIngredients = function () {
        var defer = $q.defer();

        $http.get("data/ingredients.json").then(function (response) {
            defer.resolve(response.data);
        });
        return defer.promise;
    };
    /**
     * As I don't have API support, Temporarly trying to get the data from json and return.
     * @param recipeIdList
     * @returns {promise.promise}
     * @private
     */
    var _getRecipes = function (recipeIdList) {
        var defer = $q.defer(),
            url,
            rLen = recipeIdList.length;
        /**
         * As I need to mock the data based on selection I have written this conditions
         * We can handle mock API without API call, by keeping things in some service.
         * But For demo I believe this will be sufficient
         */
        if (rLen) {
            if (recipeIdList.indexOf(1) != -1 && recipeIdList.indexOf(2) != -1) {
                url = "data/recipes_all.json";
            } else if (recipeIdList.indexOf(1) != -1) {
                url = "data/recipes_2.json";
            } else if (recipeIdList.indexOf(2) != -1) {
                url = "data/recipes_2.json";
            }
        } else {
            url = "data/recipes_favourite.json";
        }

        if (url) {
            $http.get(url).then(function (response) {
                defer.resolve(response.data.data);
            });
        } else {
            defer.resolve(false);
        }
        return defer.promise;
    };

    var _getFavouriteRecipes = function () {
        var defer = $q.defer();
        $http.get("data/recipes_favourite.json").then(function (response) {
            defer.resolve(response.data.data);
        });
        return defer.promise;
    };

    return {
        getIngredients: _getIngredients,
        getRecipes: _getRecipes,
        getFavouriteRecipes: _getFavouriteRecipes
    }
}]);