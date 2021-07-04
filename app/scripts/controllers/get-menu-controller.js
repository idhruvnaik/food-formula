'use strict';
angular.module('restaurantApp').controller('getMenuQrCtrl', ['$scope', 'Data', '$stateParams', '$localStorage', '$state', 'Notification', 'ENV', function ($scope, Data, $stateParams, $localStorage, $state, Notification, ENV) {

    $scope.category = null;
    $scope.orderItems = [];
    $scope.menu_key = $stateParams.menu_key;
    $scope.statuses = ENV.statuses;

    $scope.init = function () {
        if (!$localStorage.user) {
            $state.go('app.menuinit', { menu_key: $scope.menu_key });
        }
        $scope.customer = $localStorage.user;
        $scope.popupShow = false;
        $scope.foodItemListPopUpShow = false;
        $scope.orderListPopUpShow = false;
        $scope.menu_key = $stateParams.menu_key;
        $scope.entity = $stateParams.entity;
        $scope.lang = $stateParams.lang;
        $scope.getRestaurantMenu();
        $scope.images = true;
        $scope.recipeImages = [];
        $scope.selected = 0;
        $scope.foodItemObj = [];
    };

    $scope.getRestaurantMenu = function () {
        $scope.loader = true;
        Data.getRestaurantMenu({ menu_key: $scope.menu_key, entity: $scope.entity, lang: $scope.lang }, function (result) {
            $scope.user = result.contents.user;
            $scope.hrLogo = result.contents.hr_logo;
            $scope.categories = result.contents.categories;
            $scope.sliderImages = result.contents.slider_images;
            $scope.currency = result.contents.currency;
            $scope.take_away = result.contents.take_away;
            angular.forEach(result.contents.categories, function (item) {
                $scope.foodItemObj.push({ id: item.id, recipes: item.recipes });
            });
            $scope.recipes = (($scope.foodItemObj[0] && $scope.foodItemObj[0].recipes) ? $scope.foodItemObj[0].recipes : []);
            $scope.loader = false;
        }, function (error) {
            console.log(error);
        });
    };

    $scope.currentIndex = 0;

    $scope.setCurrentSlideIndex = function (index) {
        $scope.currentIndex = index;
    };

    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };

    $scope.prevSlide = function () {
        $scope.currentIndex = ($scope.currentIndex < $scope.sliderImages.length - 1) ? ++$scope.currentIndex : 0;
    };

    $scope.nextSlide = function () {
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.sliderImages.length - 1;
    };

    $scope.populateRecipes = function (cat, index) {
        if (cat == '') {
            $scope.recipes = $scope.foodItemObj[0].recipes;
        } else {
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
        }
        $scope.selected = index;
    }

    $scope.showRecipeInfo = function (images, allergies, mealTypes, ingredients_info) {
        $scope.popupShow = true;
        $scope.recipeImages = images;
        $scope.allergies = allergies;
        $scope.mealTypes = mealTypes;
        $scope.ingredients_info = ingredients_info;
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

    $scope.addRecipe = function (recipe) {
        $scope.orderItems.push(recipe);
        recipe.quantity = _.filter($scope.orderItems, item => item.id == recipe.id).length;
    };

    $scope.removeRecipe = function (recipe) {
        var index = _.findIndex($scope.orderItems, function (item) { return item.id == recipe.id });
        if (index != -1) {
            $scope.orderItems.splice(index, 1);
        }
        recipe.quantity = _.filter($scope.orderItems, item => item.id == recipe.id).length;
    };

    $scope.showItem = function () {
        $scope.foodItemListPopUpShow = true;
    }

    $scope.closFoodItemListPopUpShow = function () {
        $scope.foodItemListPopUpShow = false;
    }

    $scope.getFoodItemCount = function (id) {
        return _.filter($scope.orderItems, item => item.id == id).length;
    }

    $scope.generateOrder = function () {
        if (!$localStorage.user) {
            $state.go('app.menuinit', { menu_key: $scope.menu_key });
        }
        var params = {};
        var order_details = [];
        $scope.orderItems = _.uniq($scope.orderItems, function (item, key, a) {
            return item.id;
        });
        angular.forEach($scope.orderItems, function (value) {
            order_details.push({ recipe_id: value.id, quantity: value.quantity, total_current_price: (value.quantity * value.price) });
        });
        params = {
            name: $scope.customer.name,
            mobile_no: $scope.customer.mobile_no,
            address: $scope.customer.address,
            email: $scope.customer.email,
            menu_key: $scope.menu_key,
            order_details: order_details
        };
        Data.generateOrder(params, function (result) {
            Notification.success('Order placed successfully');
            $scope.orderItems = [];
        });
    }

    $scope.getAllOrders = function () {
        $scope.orders = [];
        Data.getAllOrders({ mobile_no: $scope.customer.mobile_no, email: $scope.customer.eamil }, function (result) {
            $scope.orderListPopUpShow = true;
            $scope.orders = result.contents;
        });
    }

    $scope.closeOrderListPopUpShow = function () {
        $scope.orderListPopUpShow = false;
    }

    $scope.init();
}]).filter('unique', function () {

    return function (arr, field) {
        var o = {}, i, l = arr.length, r = [];
        for (i = 0; i < l; i += 1) {
            o[arr[i][field]] = arr[i];
        }
        for (i in o) {
            r.push(o[i]);
        }
        return r;
    };
})