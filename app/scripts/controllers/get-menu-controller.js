'use strict';
angular.module('restaurantApp').controller('getMenuQrCtrl', ['$scope', '$window', '$localStorage', 'ENV', 'Data', '$stateParams', function ($scope, $window, $localStorage, ENV, Data, $stateParams) {

    $('li').click(function () {
        $('li.li-item.active').removeClass('active');
        $(this).addClass('active');
    });

    $scope.foodTypes = [
        { id: 1, name: 'Veg' },
        { id: 2, name: 'Non-Veg' },
        { id: 3, name: 'Eggitarian' }
    ];

    $scope.foodType = null;

    $scope.init = function () {
        $scope.popupShow = false;
        $scope.menu_key = $stateParams.menu_key;
        $scope.getRestaurantMenu();
        $scope.images = true;
        $scope.recipeImages = [];
        $scope.selected = 0;
        $scope.foodItemObj = [];
    };

    $scope.getRestaurantMenu = function () {
        Data.getRestaurantMenu({ menu_key: $scope.menu_key }, function (result) {
            $scope.user = result.contents.user;
            $scope.categories = result.contents.categories;
            angular.forEach(result.contents.categories, function (item) {
                $scope.foodItemObj.push({ id: item.id, recipes: item.recipes });
            });
            $scope.recipes = (($scope.foodItemObj[0] && $scope.foodItemObj[0].recipes) ? $scope.foodItemObj[0].recipes : []);
        }, function (error) {
            console.log(error);
        });
    };

    $scope.populateRecipes = function (cat, index) {
        var result = _.findWhere($scope.foodItemObj, { id: cat.id });
        if (result.recipes.length == 0) {
            Data.getRecipesByCategories({ category_id: result.id, menu_key: $scope.menu_key }, function (result) {
                $scope.recipes = result.contents.recipes;
                var index = _.findIndex($scope.foodItemObj, { id: cat.id });
                $scope.foodItemObj[index].recipes = result.contents.recipes;
            }, function (error) {
                console.log(error);
            });
        } else if (result.recipes.length > 0) {
            $scope.recipes = result.recipes;
        }
        $scope.selected = index;
    }

    $scope.showRecipeInfo = function (images, allergies, mealTypes) {
        $scope.popupShow = true;
        $scope.recipeImages = images;
        $scope.allergies = allergies;
        $scope.mealTypes = mealTypes;
    }

    $scope.closePopup = function () {
        $scope.popupShow = false;
    };

    $scope.popContentToggle = function (val) {
        if (val == 'images') {
            $scope.images = true;
        }
        else {
            $scope.images = false;
        }
    }

    $scope.init();
}]).directive('contentSlider', function () {

    return function (scope, element) {
        if (scope.$last) {
            element.addClass('active');
        }
    };

});