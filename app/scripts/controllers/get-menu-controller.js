'use strict';
angular.module('restaurantApp').controller('getMenuQrCtrl', ['$scope', '$window', '$localStorage', 'ENV', 'Data', '$stateParams', function ($scope, $window, $localStorage, ENV, Data, $stateParams) {

    $('li').click(function () {
        $('li.li-item.active').removeClass('active');
        $(this).addClass('active');
    });

    $scope.init = function () {
        $scope.popupShow = false;
        $scope.userId = $stateParams.id;
        $scope.getRestaurantMenu();
        $scope.images = true;
        $scope.recipeImages = [];
        $scope.selected = 0;
    };

    $scope.getRestaurantMenu = function () {
        Data.getRestaurantMenu({ id: $scope.userId }, function (result) {
            $scope.user = result.contents.user;
            $scope.categories = result.contents.categories;
            $scope.recipes = (($scope.categories[0] && $scope.categories[0].recipes) ? $scope.categories[0].recipes : []); 
        }, function (error) {
            console.log(error);
        });
    };

    $scope.populateRecipes = function (recipes, index) {
        $scope.recipes = recipes;
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