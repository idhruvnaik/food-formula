'use strict';
angular.module('restaurantApp').controller('menuTemplateCtrl', ['$scope', 'Data', '$localStorage', function ($scope, Data, $localStorage) {

    $scope.init = function () {
        $scope.account_Id = $localStorage.selectedUser ? $localStorage.selectedUser.account_id : $localStorage.user.account_id;
        delete $scope.recipeCategoryIds;
        $scope.recipeCategoryIds = angular.copy($localStorage.recipeCategoryIds);
        $scope.getRestaurantLogo($scope.account_Id);
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

    $scope.getRestaurantLogo = function (accountId) {
        Data.getImage({ Id: accountId, entity_type: 11 }, function (result) {
            $scope.logo = result.contents;
        });
    };

    $scope.getRoundVal = function (val) {
        return Math.round(val);
    };

    $scope.printPage = function () {
        document.title = $scope.$parent.accountData.user.name;
        window.print();
    };

    $scope.init();

}]);