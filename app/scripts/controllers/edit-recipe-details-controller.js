'use strict';
angular.module('restaurantApp').controller('editRecipeDetailsCtrl', ['$filter', '$stateParams', '$scope', '$timeout', 'Data', 'Notification', '$localStorage', 'ENV', function ($filter, $stateParams, $scope, $timeout, Data, Notification, $localStorage, ENV) {

    $('.fix-header').scroll(function () {
        $('.fix-header table').width($('.fix-header').width() + $('.fix-header').scrollLeft());
    });

    $scope.recipeDetail = {};
    $scope.pageLoader = true;
    $scope.recipeId = ($stateParams.id) ? $stateParams.id : null;
    $scope.isCopy = ($stateParams.isCopy) ? $stateParams.isCopy : false;
    $scope.recipe = {
        food_item_prices: [],
        food_item_aliases: []
    };
    $scope.masterIngredients = {};
    $scope.masterSubRecipes = {};
    $scope.masterNutrients = [];
    $scope.recipeCategories = [];
    $scope.addIngredientForm = {};
    $scope.addIngredientsForm = {};
    $scope.cookingInstruction = '';
    $scope.images = [];
    $scope.recipeImage = [];
    $scope.loader = false;
    $scope.updateRecipeLoader = false;
    $scope.allergies = ENV.ALLERGIES;
    $scope.mealTypes = ENV.MEALTYPES

    $scope.foodTypes = [
        { id: 1, name: 'Veg' },
        { id: 2, name: 'Non-Veg' },
        { id: 3, name: 'Eggitarian' }
    ];

    $scope.foodStatus = [
        { id: 1, name: 'Published' },
        { id: 2, name: 'Draft' }
    ];

    $scope.jain = [
        { id: true, name: 'Yes' },
        { id: false, name: 'No' }
    ];

    $scope.liquid = [
        { id: true, name: 'Yes' },
        { id: false, name: 'No' }
    ];

    $scope.init = function () {
        $scope.recipe.food_type_id = 0;

        $scope.getRecipeById();
        $scope.accountId = $localStorage.account_Id;
    };

    $scope.dietInfo = {};
    $scope.diet = {};

    $scope.uploadImages = function () {

        if ($scope.recipeImage.length == 0) {
            Notification({ type: 'warning', message: 'Please select an image to be uploaded' });
            return;
        }

        if ($scope.recipeImage.size > 10485760) {
            Notification({ type: 'warning', message: 'Image file size exceeding 10 MB' });
            return;
        }

        $scope.loader = true;

        var fd = new FormData();
        fd.append('file', $scope.recipeImage);
        fd.append('entity_type', 1);
        fd.append('entity_type_id', $scope.recipeId);

        Data.uploadImages(fd, function (result) {
            $scope.images.push(result);
            $scope.loader = false;
        }, function (error) {
            $scope.loader = false;
            console.log(error);
        });
    };

    $scope.removeImage = function (index, imageId) {
        Data.removeImage({ id: imageId }, function (result) {
            $scope.images.splice(index, 1);
        }, function (error) {
            console.log(error);
        });
    };

    $scope.getFiles = function (file) {
        $scope.recipeImage = file;
    };

    $scope.getRecipeById = function () {
        Data.getRecipeById({ id: $scope.recipeId }, function (result) {
            $scope.recipe.id = result.contents.id;
            $scope.recipeDetail.name = result.contents.name;
            $scope.recipeDetail.statusId = result.contents.status_id;
            $scope.recipeDetail.expiryDate = new Date(result.contents.expiry_date);

            $scope.dietInfo.price = result.contents.per_serving_selling_price;
            $scope.dietInfo.costPrice = result.contents.per_serving_cost_price;
            $scope.cookingInstruction = result.contents.cooking_info;
            $scope.dietInfo.allergiesInfo = result.contents.allergies_info;
            $scope.dietInfo.ingredientsInfo = result.contents.ingredients_info;
            $scope.dietInfo.mealTypesInfo = result.contents.meal_types_Info;

            $scope.diet.allergies = result.contents.allergy_ids ? result.contents.allergy_ids.split('@') : [];
            $scope.diet.mealTypes = result.contents.meal_type_ids ? result.contents.meal_type_ids.split('@') : [];

            $scope.recipeDetail.foodType = [1, 2, 3].includes(result.contents.recipe_type) ? result.contents.recipe_type : '';
            $scope.recipeDetail.cookedWeight = result.contents.total_cooked_weight;
            $scope.recipeDetail.servingDescription = result.contents.serving_description;
            $scope.recipeDetail.servingWeight = result.contents.per_serving_weight;
            $scope.recipeDetail.is_liquid = result.contents.is_liquid;
            $scope.recipeDetail.is_jain = result.contents.is_jain;

            $scope.recipeCategories = result.contents.categories;

            $scope.recipe.category_id = result.contents.category_id;
            $scope.recipe.food_item_prices = result.contents.food_item_prices;

            $scope.recipe.food_items_aliases = result.contents.food_item_aliases;
            $scope.images = result.contents.recipe_images;

            $scope.generateTotal();
            $scope.pageLoader = false;

        }, function (error) {
            console.log(error);
        });
    };

    $scope.uploadFile = function (file) {
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child(Date.now().toString() + '-' + file.name).put(file);
        uploadTask.on('state_changed', function (snapshot) {
        }, function (error) {
            console.log(error);
        }, function () {

            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                var params = {
                    entity_type: 1,
                    entity_type_id: $scope.recipeId,
                    url: downloadURL
                };
                Data.uploadImage(params, function (result) {
                    $scope.images.push(result.contents);
                }, function (error) {
                    alert(error);
                });
            });
        });
    };

    $scope.updateRecipe = function () {

        $scope.updateRecipeLoader = true;
        var params = {
            id: $scope.recipe.id,
            name: $scope.recipeDetail.name,
            category_id: $scope.recipe.category_id,
            recipe_type: $scope.recipeDetail.foodType,
            serving_description: $scope.recipeDetail.servingDescription,
            per_serving_weight: $scope.recipeDetail.servingWeight,
            status_id: $scope.recipeDetail.statusId,
            total_cooked_weight: $scope.recipeDetail.cookedWeight,
            cooking_instruction: $scope.cookingInstruction,
            ingredients_info: $scope.dietInfo.ingredientsInfo,
            cooking_info: $scope.cookingInstruction,
            allergies_info: $scope.dietInfo.allergiesInfo,
            per_serving_cost_price: $scope.dietInfo.costPrice,
            per_serving_selling_price: $scope.dietInfo.price,
            allergy_ids: $scope.diet.allergies.join('@'),
            meal_type_ids: $scope.diet.mealTypes.join('@'),
            expiry_date: $scope.recipeDetail.expiryDate,
            meal_types_Info: $scope.dietInfo.mealTypesInfo,
            is_jain: $scope.recipeDetail.is_jain,
            is_liquid: $scope.recipeDetail.is_liquid

        };

        Data.updateRecipe(params, function (result) {
            $scope.updateRecipeLoader = false;
            $scope.addUpdateRecipeSuccess = true;
            Notification.success('Recipe is updated');
            $timeout(function () {
                $scope.addUpdateRecipeSuccess = false;
            }, 3000);
        }, function (error) {
            $scope.updateRecipeLoader = false;

        });
    };

    $scope.updatePrice = function () {
        $scope.updatePriceLoader = true;
        var params = {
            food_item_id: $scope.recipeId,
            entity_prices: $scope.recipe.food_item_prices
        };

        Data.updateFoodItemPrices(params, function () {
            Notification.success('Prices updated');
            $scope.updatePriceLoader = false;
        }, function (error) {
            console.log(error);
            $scope.updatePriceLoader = false;
        });
    };

    $scope.updateAliases = function () {
        $scope.updateNameLoader = true;
        var params = {
            food_item_id: $scope.recipeId,
            food_item_aliases: $scope.recipe.food_items_aliases
        };

        Data.updateFoodItemAliases(params, function () {
            Notification.success('Names updated');
            $scope.updateNameLoader = false;
        }, function (error) {
            console.log(error);
            $scope.updateNameLoader = false;
        });
    };

    $scope.init();

}]);