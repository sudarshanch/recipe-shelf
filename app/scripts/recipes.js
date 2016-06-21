var recipesApp = angular.module('recipes', []);

recipesApp.controller('recipesCtrl', ['$scope', 'recipeService', function ($scope, recipeService) {
    var selectedIngredients = [];
    $scope.noRecipesFound = false;
    $scope.ingredientsList = recipeService.getIngredients();
    $scope.displayRecipes = recipeService.getFavouriteRecipes();

    /**
     * On selection of ingredient, Calling service to return the data.
     * @param item
     */
    $scope.handleIngredientSelection = function (item) {
        var id = item.id,
            indx;

        indx = selectedIngredients.indexOf(id);

        if (indx == -1) {
            selectedIngredients.push(item.id)
            item.isChecked = true;
        } else {
            selectedIngredients.splice(indx, 1);
            item.isChecked = false;
        }


        recipeService.getRecipes(selectedIngredients).then(function (list) {
            if (list) {
                $scope.noRecipesFound = false;
                $scope.displayRecipes = list;
            } else {
                $scope.noRecipesFound = true;
                $scope.displayRecipes = {};
            }

        });
    }
}]);