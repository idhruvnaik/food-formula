'use strict';
angular.module('restaurantApp').controller('editRecipeDetailsCtrl', ['$filter', '$stateParams', '$scope', '$timeout', 'Data', 'Notification', '$localStorage', 'ENV', function ($filter, $stateParams, $scope, $timeout, Data, Notification, $localStorage, ENV) {

    $('.fix-header').scroll(function () {
        $('.fix-header table').width($('.fix-header').width() + $('.fix-header').scrollLeft());
    });

    $scope.recipeDetail = {};
    $scope.pageLoader = true;
    $scope.recipeId = ($stateParams.id) ? $stateParams.id : null;
    $scope.isCopy = ($stateParams.isCopy) ? $stateParams.isCopy : false;
    $scope.recipe = {};
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
        { id: 2, name: 'Non-Veg' }
    ];

    $scope.foodStatus = [
        { id: 1, name: 'Published' },
        { id: 2, name: 'Draft' }
    ];

    $scope.usedAsIngredients = [
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

            $scope.recipeDetail.foodType = [1, 2].includes(result.contents.recipe_type) ? result.contents.recipe_type : '';
            $scope.recipeDetail.cookedWeight = result.contents.total_cooked_weight;
            $scope.recipeDetail.servingDescription = result.contents.serving_description;
            $scope.recipeDetail.servingWeight = result.contents.per_serving_weight;

            $scope.recipeCategories = result.contents.categories;

            $scope.recipe.category_id = result.contents.category_id;
            
            $scope.images = result.contents.recipe_images;

            $scope.generateTotal();
            $scope.pageLoader = false;

        }, function (error) {
            console.log(error);
        });
    };

    $scope.uploadFile = function(file){
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child(Date.now().toString() + '-' + file.name).put(file);
        uploadTask.on('state_changed', function(snapshot) {
        }, function(error) {
            console.log(error);
        }, function() {
        
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
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
            meal_types_Info: $scope.dietInfo.mealTypesInfo

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

    $scope.getIngredientNutrientValue = function (n, ing_nutrients) {
        var return_val = 0;

        if (ing_nutrients[n.id]) {
            return_val = ing_nutrients[n.id];
        }

        return return_val
    };

    $scope.generateTotal = function () {
        $scope.totalIngredientWeight = 0;
        $scope.total_ingredient_cost = 0;
        for (var i in $scope.masterNutrients) {
            var n = $scope.masterNutrients[i];
            n.total = 0;
        }

        for (var i in $scope.recipe.ingredients) {
            var ing = $scope.recipe.ingredients[i];
            for (var s in $scope.masterNutrients) {
                var n = $scope.masterNutrients[s];
                if (ing.nutrient_values_without_absorption[n.id]) {
                    n.total = (parseFloat(n.total) + parseFloat(ing.nutrient_values_without_absorption[n.id]));
                }
            }

            $scope.totalIngredientWeight = (parseFloat($scope.totalIngredientWeight) + (parseFloat(ing.unit_quantity) * parseFloat(ing.quantity)));
            $scope.total_ingredient_cost = (parseFloat($scope.total_ingredient_cost) + parseFloat(ing.total_cost));
        }
    };

    $scope.getGetRoundOfNum = function (num) {
        if (num) {
            return num.toFixed(2);
        }
        {
            return 0;
        }
    };

    $scope.ingredientFormId = function (id) {
        console.log(id);
    };

    $scope.showAutocomplete = false;
    $scope.showAutocompletes = false;
    $scope.showloader = false;

    $scope.searchIngredients = function () {
        $scope.addIngredientForm.loader = true;
        if ($scope.addIngredientForm.ingredient_name.length > 2) {
            $scope.showloader = true;
            Data.searchIngredients({ name: $scope.addIngredientForm.ingredient_name }, function (result) {
                $scope.showloader = false;
                $scope.masterIngredients = result.contents;
                $scope.showAutocomplete = true;
                $scope.addIngredientForm.loader = false;

            }, function (error) {
                console.log(error);
            });
        } else {
            $scope.masterIngredients = [];
            $scope.addIngredientForm.loader = false;
        }
    };

    $scope.searchSubRecipe = function () {
        $scope.addIngredientsForm.loader = true;
        if ($scope.addIngredientsForm.ingredient_name.length > 2) {
            Data.searchSubRecipe({ id: $scope.recipeId, name: $scope.addIngredientsForm.ingredient_name }, function (result) {
                $scope.masterSubRecipes = result.contents;
                $scope.showAutocompletes = true;
                $scope.addIngredientsForm.loader = false;

            }, function (error) {
                console.log(error);
            });
        } else {
            $scope.masterSubRecipes = [];
            $scope.addIngredientsForm.loader = false;
        }
    };

    $scope.setIngredient = function (ing) {
        $scope.addIngredientForm.ingredient_id = ing.id;
        $scope.addIngredientForm.ingredient_name = ing.name;
        $scope.addIngredientForm.serving_units = ing.serving_units;
        $scope.showAutocomplete = false;
    };
    $scope.setIngredients = function (ing) {
        $scope.addIngredientsForm.add = true;
        $scope.addIngredientsForm.sub_recipe_id = ing.id;
        $scope.addIngredientsForm.ingredient_name = ing.name;
        $scope.addIngredientsForm.serving_units = ing.serving_units;
        $scope.showAutocompletes = false;
    };

    $scope.addIngredient = function () {
        $scope.addIngredientForm.loader = true;

        Data.addIngredient($scope.addIngredientForm, function (result) {
            var ing = result.contents;
            var obj = {};
            obj.id = ing.id;
            obj.name = ing.name;
            obj.nutrient_values_without_absorption = ing.nutrient_values_without_absorption;
            obj.quantity = ing.quantity;
            obj.total_quantity = ing.total_quantity;
            obj.unit_name = ing.unit_name;
            obj.unit_quantity = ing.unit_quantity;
            obj.total_cost = ing.total_cost
            obj.per_gram_cost = ing.per_gram_cost
            $scope.recipe.ingredients.push(obj);

            $scope.addIngredientForm.loader = false;
            $scope.addIngredientForm.ingredient_id = '';
            $scope.addIngredientForm.ingredient_name = '';
            $scope.addIngredientForm.serving_units = '';
            $scope.addIngredientForm.serving_unit_id = '';
            $scope.addIngredientForm.quantity = '';
            $scope.generateTotal();

        }, function (error) {
            console.log(error);
            $scope.addIngredientForm.loader = false;
        });
    };

    $scope.addIngredients = function () {
        $scope.addIngredientsForm.loader = true;
        $scope.addIngredientsForm.recipe_id = $stateParams.id;

        Data.addIngredients($scope.addIngredientsForm, function (result) {
            var ing = result.contents;
            Array.from(ing).forEach(function (i) {
                var obj = {};
                obj.id = i.id;
                obj.name = i.name;
                obj.nutrient_values_without_absorption = i.nutrient_values_without_absorption
                obj.quantity = i.quantity;
                obj.total_quantity = i.total_quantity
                obj.unit_name = i.unit_name;
                obj.unit_quantity = i.unit_quantity;
                obj.parent_recipe = i.parent_recipe;
                obj.total_cost = i.total_cost;
                obj.per_gram_cost = i.per_gram_cost;
                $scope.recipe.ingredients.push(obj);
            });
            $scope.addIngredientsForm.loader = false;
            $scope.addIngredientsForm.sub_recipe_id = '';
            $scope.addIngredientsForm.ingredient_name = '';
            $scope.addIngredientsForm.serving_units = '';
            $scope.addIngredientsForm.serving_unit_id = '';
            $scope.addIngredientsForm.quantity = '';
            $scope.generateTotal();
            $scope.addIngredientsForm.add = false;

        }, function (error) {
            console.log(error);
            $scope.addIngredientsForm.loader = false;
        });
    };

    $scope.updateIngredient = function (ing) {
        var ing = ing;
        ing.isEditableLoader = true;
        Data.updateIngredient({ id: ing.id, quantity: ing.quantity }, function (result) {
            ing.isEditableLoader = false;
            ing.isEditable = false;
            var new_ing = result.contents;
            ing.nutrient_values_without_absorption = new_ing.nutrient_values_without_absorption;
            ing.total_quantity = new_ing.total_quantity
            ing.total_cost = (ing.per_gram_cost * new_ing.total_quantity);
            $scope.generateTotal();

        }, function (error) {
            console.log(error);
        });
    };

    $scope.removeIngredient = function (ing) {
        var index = $scope.recipe.ingredients.indexOf(ing);
        if (index >= 0) {
            Data.removeIngredient({ id: ing.id }, function (result) {
                $scope.recipe.ingredients.splice(index, 1);
                $scope.generateTotal();
            }, function (error) {
                console.log(error);
            });
        }
    };

    $scope.setIngredientEditable = function (ing) {
        ing.isEditable = true;
    };

    $scope.init();

}]);