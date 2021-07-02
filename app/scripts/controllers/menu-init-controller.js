'use strict';
angular.module('restaurantApp').controller('menuInitCtrl', ['$scope', 'Data', '$state', '$stateParams', 'Notification', function ($scope, Data, $state, $stateParams, Notification) {

    $scope.init = function () {
        $scope.menuLanguage;
        $scope.menuEntity;
        $scope.menu_key = $stateParams.menu_key;
        Data.menuInit({ menu_key: $scope.menu_key }, function (result) {
            $scope.languages = result.contents.languages;
            $scope.entities = result.contents.entities;
            $scope.logo = result.contents.logo;
        }, function (error) {
            console.log(error);
        });
    }

    $scope.seeMenu = function () {
        if ($scope.menuLanguage == undefined || $scope.menuEntity == undefined) {
            Notification.error('Please select language and entity both');
            return;
        }
        $state.go('app.getmenu', { menu_key: $scope.menu_key, entity: $scope.menuEntity, lang: $scope.menuLanguage });
    }
    $scope.init();
}]);