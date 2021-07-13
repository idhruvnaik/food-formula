'use strict';
angular.module('restaurantApp').controller('menuInitCtrl', ['$scope', 'Data', '$state', '$stateParams', 'Notification', '$localStorage', function ($scope, Data, $state, $stateParams, Notification, $localStorage) {

    $scope.init = function () {
        $scope.menuLanguage;
        $scope.formData = $localStorage.user ? $localStorage.user : {};
        $scope.menu_key = $stateParams.menu_key;
        $scope.formData.menuEntity = $stateParams.menu_entity;
        Data.menuInit({ menu_key: $scope.menu_key }, function (result) {
            $scope.languages = result.contents.languages;
            $scope.logo = result.contents.logo;
            $localStorage.restaurant_id = result.contents.id;
            $scope.take_away = result.contents.take_away;
        }, function (error) {
            console.log(error);
        });
    }

    $scope.seeMenu = function () {
        if ($scope.take_away) {
            if ($scope.formData.name == undefined || $scope.formData.mobile_no == undefined || $scope.formData.address == undefined || $scope.formData.menuLanguage == undefined) {
                Notification.error('Please fill all required information');
                return;
            }
        } else {
            if ($scope.formData.menuLanguage == undefined) {
                Notification.error('Please select language');
                return;
            }
        }
        $localStorage.user = $scope.formData;
        $state.go('app.getmenu', { menu_key: $scope.menu_key, entity: $scope.formData.menuEntity, lang: $scope.formData.menuLanguage });
    }
    $scope.init();
}]);