'use strict';
angular.module('restaurantApp').controller('getMenuQrCtrl', ['$scope', 'Data', '$stateParams', function ($scope, Data, $stateParams) {

    $scope.foodTypes = [
        { id: 1, name: 'Veg' },
        { id: 2, name: 'Non-Veg' },
        { id: 3, name: 'Eggitarian' }
    ];

    $scope.foodType = null;
    $scope.imageIndex = 0;

    $scope.init = function () {
        $scope.popupShow = false;
        $scope.menu_key = $stateParams.menu_key;
        $scope.entity = $stateParams.entity;
        $scope.lang = $stateParams.lang;
        $scope.getRestaurantMenu();
        $scope.images = true;
        $scope.recipeImages = [];
        $scope.selected = 0;
        $scope.foodItemObj = [];

        $('li').click(function () {
            $('li.li-item.active').removeClass('active');
            $(this).addClass('active');
        });
    };

    $scope.getRestaurantMenu = function () {
        $scope.loader = true;
        Data.getRestaurantMenu({ menu_key: $scope.menu_key, entity: $scope.entity, lang: $scope.lang }, function (result) {
            $scope.user = result.contents.user;
            $scope.hrLogo = result.contents.hr_logo;
            $scope.categories = result.contents.categories;
            $scope.sliderImages = result.contents.slider_images;
            angular.forEach(result.contents.categories, function (item) {
                $scope.foodItemObj.push({ id: item.id, recipes: item.recipes });
            });
            $scope.recipes = (($scope.foodItemObj[0] && $scope.foodItemObj[0].recipes) ? $scope.foodItemObj[0].recipes : []);
            $scope.loader = false;
        }, function (error) {
            console.log(error);
        });
    };

    $scope.populateRecipes = function (cat, index) {
        var result = _.findWhere($scope.foodItemObj, { id: cat.id });
        if (result.recipes.length == 0) {
            Data.getRecipesByCategories({ category_id: result.id, menu_key: $scope.menu_key, entity: $scope.entity, lang: $scope.lang }, function (result) {
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

    $scope.changeImage = function (index) {
        if (($scope.sliderImages.length - 1) == $scope.imageIndex && index > 0) {
            $scope.imageIndex = 0;
        } else if ($scope.imageIndex == 0 && index < 0) {
            $scope.imageIndex = $scope.sliderImages.length - 1;
        } else {
            $scope.imageIndex += index;            
        }
    };

    $scope.init();
}]);