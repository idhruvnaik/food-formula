'use strict';
angular.module('restaurantApp').controller('editRecipeDetailsCtrl', ['$filter', '$stateParams', '$scope', '$timeout', 'Data', 'Notification', '$localStorage', function ($filter, $stateParams, $scope, $timeout, Data, Notification, $localStorage) {

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
    $scope.dietInfo = {
        suitableFor: [],
        contains: [],
        allergies: [],
        recipe_meal_types: [],
    };

    $scope.mealTypes = ['Vegan', 'Vegetarian', 'Gluten Free', 'Non-Vegetarian', 'Ketogenic', 'Pescatarian', 'High Protein', 'No Added Sugar', 'Halal', 'Paleo', 'Clean Label', 'Baked not Fried', 'Lacto-Ovo Vegetarian'];
    $scope.diet = {
        suitableFor: ['Vegan', 'Vegetarian', 'Gluten Free', 'Non-Vegetarian', 'Ketogenic', 'Pescetarian', 'High Protein', 'No Added Sugar', 'Halal', 'Paleo', 'Clean Label', 'Baked not Fried', 'Lacto-Ovo Vegetarian'],
        contains: ['Gluten', 'Eggs', 'Fish', 'Crustaceans', 'Peanuts', 'Soy', 'Dairy', 'Nuts', 'Celery', 'Mustard', 'Sesame Seeds', 'Mussels / Oysters', 'Squids', 'Snails', 'Sulphur Dioxide & Sulphites'],

        veganEnable: ['Vegetarian'],
        veganDisable: ['Pescetarian', 'Lacto-Ovo Vegetarian', 'Non-Vegetarian', 'Eggs', 'Fish', 'Crustaceans', 'Dairy', 'Mussels / Oysters', 'Squids', 'Snails'],
        vegetarianDisable: ['Pescetarian', 'Lacto-Ovo Vegetarian', 'Non-Vegetarian', 'Eggs', 'Fish', 'Crustaceans', 'Mussels / Oysters', 'Squids', 'Snails'],
        pescetarianEnable: ['Non-Vegetarian'],
        nonVegetarianPescetarianDisable: ['Vegan', 'Lacto-Ovo Vegetarian', 'Vegetarian'],
        lactoOvoVegetarianDisable: ['Vegan', 'Pescetarian', 'Vegetarian', 'Non-Vegetarian', 'Fish', 'Crustaceans', 'Mussels / Oysters', 'Squids', 'Snails'],
        glutenFreeDisable: ['Gluten'],

        setDietType: function (type) {
            if ($scope.dietInfo.suitableFor == undefined) {
                $scope.dietInfo.suitableFor = [];
            }

            var index = $scope.dietInfo.suitableFor.indexOf(type);

            if (index == -1) {
                $scope.dietInfo.suitableFor.push(type);
            } else {
                $scope.dietInfo.suitableFor.splice(index, 1);
            }

            if (type == 'Vegan' && $scope.dietInfo.suitableFor.indexOf('Vegan') != -1) {
                if ($scope.dietInfo.suitableFor.indexOf('Vegetarian') == -1) {
                    $scope.dietInfo.suitableFor = $scope.dietInfo.suitableFor.concat($scope.diet.veganEnable);
                }
            }

            if (type == 'Pescetarian' && $scope.dietInfo.suitableFor.indexOf('Pescetarian') != -1) {
                if ($scope.dietInfo.suitableFor.indexOf('Non-Vegetarian') == -1) {
                    $scope.dietInfo.suitableFor = $scope.dietInfo.suitableFor.concat($scope.diet.pescetarianEnable);
                }
            }
        },
        setItem: function (item) {
            if ($scope.dietInfo.contains == undefined) {
                $scope.dietInfo.contains = [];
            }

            var index = $scope.dietInfo.contains.indexOf(item);

            if (index == -1) {
                $scope.dietInfo.contains.push(item);
            } else {
                $scope.dietInfo.contains.splice(index, 1);
            }
        },
        isMealtypeSelected: function (item) {
            var flag = false;
            if ($scope.dietInfo.recipe_meal_types && $scope.dietInfo.recipe_meal_types.includes(item)) {
                flag = true;
            }
            return flag;
        },
        isAllergiesSelected: function (item) {
            var flag = false;
            if ($scope.dietInfo.allergies && $scope.dietInfo.allergies.includes(item)) {
                flag = true;
            }
            return flag;
        },
        isDietSelected: function (type) {
            var flag = false;
            if ($scope.dietInfo.suitableFor && $scope.dietInfo.suitableFor.includes(type)) {
                flag = true;
            }
            return flag;
        },
        isItemSelected: function (item) {
            var flag = false;
            if ($scope.dietInfo.contains && $scope.dietInfo.contains.includes(item)) {
                flag = true;
            }
            return flag;
        },
        isDisabled: function (type) {
            if ($scope.dietInfo.suitableFor) {

                if ($scope.dietInfo.suitableFor.includes('Vegan')) {
                    if ($scope.diet.veganDisable.indexOf(type) != -1) {
                        return true;
                    }
                }
                if ($scope.dietInfo.suitableFor.includes('Vegetarian')) {
                    if ($scope.diet.vegetarianDisable.indexOf(type) != -1) {
                        return true;
                    }
                }
                if ($scope.dietInfo.suitableFor.includes('Non-Vegetarian') || $scope.dietInfo.suitableFor.includes('Pescetarian')) {
                    if ($scope.diet.nonVegetarianPescetarianDisable.indexOf(type) != -1) {
                        return true;
                    }
                }
                if ($scope.dietInfo.suitableFor.includes('Lacto-Ovo Vegetarian')) {
                    if ($scope.diet.lactoOvoVegetarianDisable.indexOf(type) != -1) {
                        return true;
                    }
                }
                if ($scope.dietInfo.suitableFor.includes('Gluten Free')) {
                    if ($scope.diet.glutenFreeDisable.indexOf(type) != -1) {
                        return true;
                    }
                }
            }
            return false;
        },
    };

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

    $scope.removeImage = function (imageId) {
        Data.removeImage({ id: imageId }, function (result) {
            $scope.images = _.filter($scope.images, function (item) {
                return item.id !== result
            });
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

            $scope.dietInfo.price = result.contents.per_serving_selling_price;
            $scope.dietInfo.costPrice = result.contents.per_serving_cost_price;
            $scope.cookingInstruction = result.contents.cooking_info;
            $scope.dietInfo.allergiesInfo = result.contents.allergies_info;
            $scope.dietInfo.ingredientsInfo = result.contents.ingredients_info;

            $scope.recipeDetail.foodType = [1, 2].includes(result.contents.recipe_type) ? result.contents.recipe_type : '';
            $scope.recipeDetail.cookedWeight = result.contents.total_cooked_weight;
            $scope.recipeDetail.servingDescription = result.contents.serving_description;
            $scope.recipeDetail.servingWeight = result.contents.per_serving_weight;

            $scope.recipeCategories = result.contents.categories;
            $scope.recipeDetail.usedAsIngredient = result.contents.used_as_ingredient;

            $scope.recipe.category_id = result.contents.category_id;
            
            $scope.allergies = result.contents.allergies;
            $scope.images = result.contents.recipe_images;

            $scope.generateTotal();
            $scope.pageLoader = false;

        }, function (error) {
            console.log(error);
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
            used_as_ingredient: $scope.recipeDetail.usedAsIngredient

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
            $scope.$broadcast('GET_ALLERGIES_AND_MEAL_TYPES');

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
            $scope.$broadcast('GET_ALLERGIES_AND_MEAL_TYPES');

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
                $scope.$broadcast('GET_ALLERGIES_AND_MEAL_TYPES');
            }, function (error) {
                console.log(error);
            });
        }
    };

    $scope.setIngredientEditable = function (ing) {
        ing.isEditable = true;
    };

    $scope.generateRecipeTags = function () {
        $scope.$broadcast('GET_ALLERGIES_AND_MEAL_TYPES');
    }

    $scope.$on('GET_ALLERGIES_AND_MEAL_TYPES', function (event, options) {
        Data.getAllergiesAndMealTypes({ recipe_id: $stateParams.id }, function (result) {
            $scope.dietInfo.allergies = angular.copy(result.contents.recipe_allergies);
            $scope.dietInfo.recipe_meal_types = angular.copy(result.contents.recipe_meal_types);
            $scope.dietInfo.allergiesInfo = angular.copy(result.contents.allergiesInfo);
            $scope.dietInfo.mealTypesInfo = angular.copy(result.contents.mealTypesInfo);
        }, function (error) {
            console.log(error);
        });
    });

    $scope.init();

}]);