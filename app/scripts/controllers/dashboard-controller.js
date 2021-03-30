'use strict';
angular
  .module('restaurantApp')
  .controller('dashboardCtrl', [
    '$scope',
    '$window',
    '$state',
    'Data',
    '$localStorage',
    'ENV',
    '$uibModal',
    '$timeout',
    'Notification',
    function (
      $scope,
      $window,
      $state,
      Data,
      $localStorage,
      ENV,
      $uibModal,
      $timeout,
      Notification
    ) {
      $scope.pageLoader = true;
      $scope.recipeCategories = [];
      $scope.masterNutrients = [];
      delete $localStorage.recipeCategoryIds;
      $scope.search = {
        q: '',
        showRecipe: function (name) {
          var flag = true;
          if (this.q.length > 1) {
            if (!name.toLowerCase().includes(this.q.toLowerCase())) {
              flag = false;
            }
          }
          return flag;
        },
      };
      $scope.user = $localStorage.user;
      $scope.access_state = $scope.user['access_state'];
      if ($scope.access_state == 2 && $scope.getRecipeCategoriesLength < 3) {
        var d = document.getElementById('access_state');
        d.className += ' button-disabled';
      }
      $scope.saveOrder = function (list) {
        Data.setRecipeCategory(
          { list: list },
          function (result) { },
          function (error) { }
        );
        return true;
      };

      if ($scope.isAdmin()) {
        Data.getUsers(
          function (result) {
            $scope.users = result.contents;
          },
          function (error) {
            console.log(error);
          }
        );
      }

      $scope.searchRecipe = function (val) {
        var params = {
          name: val,
        };
        if (val == '') {
          Data.getResturantCategories(
            function (result) {
              $scope.recipeCategories = result.contents;
              var chunkIndex = Math.ceil(result.contents.length / 4);
              $scope.categoryCols = _.chunk(
                result.contents,
                chunkIndex ? chunkIndex : 1
              );
              $scope.addCategoryIndex =
                result.contents.length > 3 ? 3 : result.contents.length;
              if (
                result.contents.length <= 3 ||
                $scope.categoryCols.length <= 3
              ) {
                $scope.categoryCols.push([]);
              }
            },
            function (error) {
              console.log(error);
            }
          );
        } else if (val.length >= 3) {
          Data.searchRecipe(
            params,
            function (result) {
              var data = Object.values(result.contents);
              $scope.recipeCategories = data;
              var chunkIndex = Math.ceil(data.length / 4);
              $scope.categoryCols = _.chunk(data, chunkIndex ? chunkIndex : 1);
              $scope.addCategoryIndex = data.length > 3 ? 3 : data.length;
              if (data.length <= 3 || $scope.categoryCols.length <= 3) {
                $scope.categoryCols.push([]);
              }
              angular.forEach($scope.categoryCols, function (categories) {
                angular.forEach(categories, function (category) {
                  category.show = true;
                });
              });
            },
            function (error) {
              console.log(error);
            }
          );
        }
      };

      $scope.getCategoryRecipes = function (category) {
        category.isLoading = true;
        if (!category.recipes || category.recipes.length == 0) {
          Data.getCategoryRecipes(
            category,
            function (result) {
              category.recipes = result.contents;
              category.isLoading = false;
              category.show = !category.show;
            },
            function (error) {
              category.recipes = [];
              category.isLoading = false;
            }
          );
        } else {
          category.show = !category.show;
        }
      };

      $scope.init = function () {
        Data.getResturantCategories(
          function (result) {
            $scope.recipeCategories = result.contents;
            var chunkIndex = Math.ceil(result.contents.length / 4);
            $scope.categoryCols = _.chunk(
              result.contents,
              chunkIndex ? chunkIndex : 1
            );
            $scope.addCategoryIndex =
              result.contents.length > 3 ? 3 : result.contents.length;
            if (
              result.contents.length <= 3 ||
              $scope.categoryCols.length <= 3
            ) {
              $scope.categoryCols.push([]);
            }
          },
          function (error) {
            console.log(error);
          }
        );
      };

      $scope.downloadCategory = function (category) {
        delete $localStorage.recipeCategoryIds;
        $localStorage.recipeCategoryIds = angular.copy([category.id]);
        $timeout(function () {
          $window.open('/menu-template', '_blank');
        }, 100);
      };

      $scope.category = {
        id: null,
        name: '',
        addCatLoader: false,
        addCatError: '',
        showCatBox: false,
        save: function () {
          if (this.name == '') {
            this.addCatError = 'Please enter category name';
            return;
          }
          this.addCatError = '';
          this.addCatLoader = true;
          Data.saveRecipeCategory(
            this.id,
            this.name,
            function (result) {
              var data = result.contents;
              if ($scope.category.id == null) {
                $scope.recipeCategories.push(data);
              } else {
                for (var i in $scope.recipeCategories) {
                  if ($scope.recipeCategories[i].id == data.id) {
                    $scope.recipeCategories[i] = data;
                  }
                }
              }
              $scope.category.id = null;
              $scope.category.name = '';
              $scope.category.addCatLoader = false;
              $scope.init();
            },
            function (error) {
              console.log(error);
            }
          );
        },
        openCatBox: function () {
          this.showCatBox = true;
        },
        hideCatBox: function () {
          this.showCatBox = false;
        },
      };

      $scope.categoryShow = function (category) {
        $scope.getCategoryRecipes(category);
      };

      $scope.foodItem = {
        name: '',
        addBulk: false,
        selectedCat: null,
        addLoader: false,
        addCatError: '',
        addCategoryFood: function (cat) {
          this.addBulk = false;
          this.selectedCat = cat;
        },
        hideCategoryFood: function () {
          this.addBulk = false;
          this.name = '';
          this.selectedCat = null;
        },
        addCategoryFoodBulk: function (cat) {
          this.addBulk = true;
          this.selectedCat = cat;
        },
        save: function () {
          if (this.name == '') {
            this.addCatError = 'Please enter category name';
            return;
          }

          $scope.foodItem.addCatError = '';
          $scope.foodItem.addLoader = true;

          if (this.addBulk) {
            Data.addBulkRecipes(
              {
                recipe_names: this.name.split('\n'),
                category_id: this.selectedCat.id,
              },
              function (result) {
                if (!$scope.foodItem.selectedCat.recipes) {
                  $scope.foodItem.selectedCat.recipes = [];
                }

                for (var i in result.contents) {
                  console.log(result.contents[i]);
                  $scope.foodItem.selectedCat.recipes.push(result.contents[i]);
                }

                $scope.foodItem.selectedCat = null;
                $scope.foodItem.name = '';
                $scope.foodItem.addLoader = false;
              },
              function (error) {
                console.log(error);
              }
            );
          } else {
            Data.addRecipe(
              this.name,
              this.selectedCat.id,
              function (result) {
                $state.go('app.edit-recipe-details', {
                  id: result.contents.id,
                  isCopy: false,
                });

                if (!$scope.foodItem.selectedCat.recipes) {
                  $scope.foodItem.selectedCat.recipes = [];
                }

                $scope.foodItem.selectedCat.recipes.push(result.contents);
                $scope.foodItem.selectedCat = null;
                $scope.foodItem.name = '';
                $scope.foodItem.addLoader = false;
              },
              function (error) {
                console.log(error);
              }
            );
          }
        },
        discard: function (cat, recipe) {
          if (confirm('Do you want to delete this recipe')) {
            Data.discardRecipe(
              recipe.id,
              function (result) {
                var index = cat.recipes.indexOf(recipe);
                if (index != -1) {
                  cat.recipes.splice(index, 1);
                }
              },
              function (error) {
                console.log(error);
              }
            );
          }
        },
      };

      $scope.getRecipeCategoriesLength = function () {
        return Object.keys($scope.recipeCategories).length;
      };

      $scope.getVegNonVegIndi = function (recipe) {
        var className = '';
        if ([0, 1].includes(recipe.recipe_type)) {
          className = 'veg-food';
        } else if ([2, 3, 4, 5].includes(recipe.recipe_type)) {
          className = 'non-veg-food';
        }

        return className;
      };

      $scope.exportIngredients = function () {
        var param = Data.getAuthData({});
        $window.open(
          ENV.apiUrl +
          '/restaurant/export_recipes.csv?api_key=' +
          param.api_key +
          '&restaurant_id=' +
          param.restaurant_id,
          '_blank'
        );
      };

      $scope.openFoodItemLabel = function (recipe) {
        $window.open('/food-item-label/' + recipe.id, '_blank');
      };

      $scope.openMenuTemplate = function () {
        $uibModal
          .open({
            animation: true,
            keyboard: false,
            placement: 'bottom',
            windowClass: 'login-modal',
            size: 'lg',
            backdrop: 'static',
            templateUrl: 'download_menu_template.html',
            controller: 'downloadMenuCtrl',
            resolve: {
              categories: function () {
                return $scope.recipeCategories;
              },
            },
          })
          .result.then(
            function (result) {
              $localStorage.recipeCategoryIds = result;
              $timeout(function () {
                $window.open('/menu-template', '_blank');
              }, 100);
            },
            function () { }
          );
      };

      $scope.getRoundVal = function (val) {
        return Math.round(val);
      };

      $scope.openQrModal = function (category, recipe) {
        $uibModal
          .open({
            animation: true,
            keyboard: false,
            placement: 'bottom',
            windowClass: 'login-modal',
            size: 'lg',
            backdrop: 'static',
            templateUrl: 'qr_modal.html',
            controller: 'qrModalCtrl',
            resolve: {
              options: function () {
                return {
                  categoryName: category,
                  recipe: recipe,
                };
              },
            },
          })
          .result.then(
            function (result) { },
            function () { }
          );
      };

      $scope.categoryModal = function (category) {
        $uibModal
          .open({
            animation: true,
            keyboard: false,
            placement: 'bottom',
            windowClass: 'login-modal',
            size: 'lg',
            backdrop: 'static',
            templateUrl: 'category_modal.html',
            controller: 'categoryModalCtrl',
            resolve: {
              options: function () {
                return {
                  category: category,
                };
              },
            },
          })
          .result.then(
            function (result) {
              if ($scope.recipeCategories.length == 0) {
                $scope.init();
              } else {
                if (_.findWhere($scope.recipeCategories, { id: result.id })) {
                  var catIndex = $scope.recipeCategories.indexOf(
                    _.findWhere($scope.recipeCategories, { id: result.id })
                  );
                  $scope.recipeCategories[catIndex].name = result.name;
                }
                angular.forEach($scope.categoryCols, function (categories) {
                  if (_.findWhere(categories, { id: result.id })) {
                    var catIndex = categories.indexOf(
                      _.findWhere(categories, { id: result.id })
                    );
                    categories[catIndex].name = result.name;
                  }
                });
              }
            },
            function () { }
          );
      };

      $scope.deleteCategory = function (cat) {
        if (cat.recipes && cat.recipes.length != 0) {
          if (
            confirm(
              'Warning! Deleting category will delete the recipes too. Press ok to countinue.'
            )
          ) {
            Data.deleteRecipeCategory(
              cat.id,
              function (result) {
                $scope.init();
              },
              function (error) {
                console.log(error);
              }
            );
          }
        } else {
          if (confirm('Do you want to delete the category?')) {
            Data.deleteRecipeCategory(
              cat.id,
              function (result) {
                $scope.init();
              },
              function (error) {
                console.log(error);
              }
            );
          }
        }
      };

      $scope.openMenuPrintModal = function () {
        $uibModal
          .open({
            animation: true,
            keyboard: false,
            placement: 'bottom',
            size: 'lg',
            backdrop: 'static',
            templateUrl: 'menu_print_modal.html',
            controller: 'menuPrintCtrl',
            resolve: {
              categories: function () {
                return $scope.recipeCategories;
              },
            },
          })
          .result.then(function (result) {
            console.log(result.cat_id);
            $localStorage.QrCategories = result.cat_id.join('@');
            $timeout(function () {
              $window.open('/menu-qr-print/' + result.lang, '_blank');
            }, 100);
          });
      };

      $scope.copyRecipe = function (recipeId) {
        if (confirm('Do you want to copy the recipe ?')) {
          Data.copyRecipe(
            { id: recipeId },
            function (result) {
              $state.go('app.edit-recipe-details', {
                id: result.contents.id,
                isCopy: true,
              });
            },
            function (error) {
              console.log(error);
            }
          );
        }
      };

      $scope.init();
    },
  ])
  .controller('downloadMenuCtrl', [
    '$scope',
    'categories',
    '$uibModalInstance',
    'Notification',
    function ($scope, categories, $uibModalInstance, Notification) {
      $scope.download = { categories: [] };
      $scope.categories = categories;
      $scope.downloadCategories = function () {
        if ($scope.download.categories.length > 0) {
          $uibModalInstance.close($scope.download.categories);
        } else {
          Notification.error('Select atleast one category');
        }
      };

      $scope.$watch('download.checkall', function (value) {
        if (value) {
          angular.forEach($scope.categories, function (item) {
            if (angular.isDefined(item.id)) {
              $scope.download.categories.push(item.id);
            }
          });
        } else {
          $scope.download.categories = [];
        }
      });
    },
  ])
  .controller('categoryModalCtrl', [
    '$scope',
    'options',
    '$uibModalInstance',
    'Data',
    function ($scope, options, $uibModalInstance, Data) {
      $scope.category = angular.copy(options.category);
      $scope.title = angular.equals(options.category, {})
        ? 'Add Food Category'
        : 'Edit Food Category';
      $scope.saveCategory = function () {
        Data.saveRecipeCategory(
          $scope.category.id,
          $scope.category.name,
          function (result) {
            $uibModalInstance.close(result.contents);
          }
        );
      };
    },
  ])
  .controller('qrModalCtrl', [
    '$scope',
    'options',
    'ENV',
    '$sce',
    function ($scope, options, ENV, $sce) {
      $scope.detail = angular.copy(options);
      $scope.detail.qrDetailArabic = $sce.trustAsResourceUrl(
        ENV.apiUrl +
        '/restaurant/nutrition_facts_label_nutrical?&id=' +
        options.recipe.id +
        '&language=Ar'
      );
      $scope.detail.qrDetailEnglish = $sce.trustAsResourceUrl(
        ENV.apiUrl +
        '/restaurant/nutrition_facts_label_nutrical?&id=' +
        options.recipe.id +
        '&language=Eng'
      );
      $scope.detail.qrDetailMix = $sce.trustAsResourceUrl(
        ENV.apiUrl +
        '/restaurant/nutrition_facts_label_nutrical?&id=' +
        options.recipe.id +
        '&language=Mix'
      );

      $scope.print = function () {
        var divToPrint = document.getElementById('DivIdToPrint');
        var newWin = window.open('', 'Print-Window');
        newWin.document.open();
        newWin.document.write(
          '<html><head><title>' +
          $scope.detail.recipe.name +
          '-Nutrition-Label' +
          '</title><style>body{display: flex; justify-content: space-around; align-items: center;} .nutri-facts-info{padding: 20px; border: 1px dashed;}</style></head><body onload="window.print()">' +
          divToPrint.innerHTML +
          '</body></html>'
        );
        newWin.document.close();
      };
    },
  ])
  .controller('menuPrintCtrl', [
    '$scope',
    'categories',
    '$uibModalInstance',
    'Notification',
    'Data',
    '$localStorage',
    function (
      $scope,
      categories,
      $uibModalInstance,
      Notification,
      Data,
      $localStorage
    ) {
      $scope.download = { categories: [] };
      $scope.categories = categories;
      $scope.printCategories = function (lang) {
        if ($scope.download.categories.length > 0) {
          $uibModalInstance.close({
            cat_id: $scope.download.categories
          });
        } else {
          Notification.error('Select atleast one category');
        }
      };

      $scope.$watch('download.checkall', function (value) {
        if (value) {
          angular.forEach($scope.categories, function (item) {
            if (angular.isDefined(item.id)) {
              $scope.download.categories.push(item.id);
            }
          });
        } else {
          $scope.download.categories = [];
        }
      });
      Data.getQRCategories({}, function (result) {
        $scope.download.categories = result.contents.split('@');
      },
        function (error) {
          console.log(error);
        }
      );
    },
  ]);
