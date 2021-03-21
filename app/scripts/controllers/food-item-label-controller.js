'use strict';
angular.module('restaurantApp').controller('foodItemLabelCtrl', ['$scope', '$window', '$stateParams', 'Data', '$localStorage', 'ENV', '$uibModal', '$timeout', function ($scope, $window, $stateParams, Data, $localStorage, ENV, $uibModal, $timeout) {

    $scope.recipeId = $stateParams.recipeId;
    $scope.personalDetail = $localStorage.user.personal_detail;

    $scope.init = function(){
        $scope.isLoaded = false;
        Data.getFoodItemLabel({id: $scope.recipeId}, function(result){
            $scope.foodInformation = result.contents;
            $scope.foodInformation.productionDate = new Date($scope.foodInformation.productionDate).getFullYear() == 1970 ? null : $scope.foodInformation.productionDate;
            $scope.foodInformation.bestBeforeDate = new Date($scope.foodInformation.bestBeforeDate).getFullYear() == 1970 ? null : $scope.foodInformation.bestBeforeDate;
            $scope.isLoaded = true;
        }, function(error){
            console.log(error);
        });
    };

    $scope.print = function(){
        document.title = $scope.foodInformation.recipe_name;
        $window.print(); 
    };

    $scope.init();

}]);