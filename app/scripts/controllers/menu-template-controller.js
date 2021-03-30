'use strict';
angular.module('restaurantApp').controller('menuTemplateCtrl', ['$scope', 'Data', '$localStorage', function ($scope, Data, $localStorage) {

    $scope.init = function () {
        $scope.user_id = $localStorage.user.user_id;
        delete $scope.recipeCategoryIds;
        $scope.recipeCategoryIds = angular.copy($localStorage.recipeCategoryIds);
        $scope.getRestaurantLogo($scope.user_id);
        $scope.currency = ($localStorage.selectedUser && $localStorage.selectedUser.currency) ? $localStorage.selectedUser.currency : ($localStorage.user.currency ? $localStorage.user.currency : 'AED');
        $scope.getMenu();
    };

    $scope.getMenu = function () {
        var params = {
            category_ids: $scope.recipeCategoryIds
        }
        Data.getMenu(params, function (result) {
            $scope.recipeCategories = result.contents;
        }, function (error) {
            console.log(error);
        });
    }

    $scope.getRestaurantLogo = function (restaurantId) {
        Data.getRestaurantLogo({ restaurant_id: restaurantId }, function (result) {
            $scope.logo = result.contents;
        });
    };

    $scope.getRoundVal = function (val) {
        return Math.round(val);
    };

    $scope.printPage = function () {
        document.title = $scope.$parent.accountData.name;
        window.print();
    };

    $scope.init();

}]);