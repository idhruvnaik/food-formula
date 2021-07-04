'use strict';
angular.module('restaurantApp').controller('menuInitCtrl', ['$scope', 'Data', '$state', '$stateParams', 'Notification', '$localStorage', function ($scope, Data, $state, $stateParams, Notification, $localStorage) {

    $scope.init = function () {
        $scope.menuLanguage;
        $scope.menuEntity;
        $scope.formData = $localStorage.user ? $localStorage.user : {};
        $scope.menu_key = $stateParams.menu_key;
        Data.menuInit({ menu_key: $scope.menu_key }, function (result) {
            $scope.languages = result.contents.languages;
            $scope.entities = result.contents.entities;
            $scope.logo = result.contents.logo;
            $localStorage.restaurant_id = result.contents.id;
        }, function (error) {
            console.log(error);
        });
    }

    $scope.seeMenu = function () {
        $localStorage.user = $scope.formData;
        $state.go('app.getmenu', { menu_key: $scope.menu_key, entity: $scope.formData.menuEntity, lang: $scope.formData.menuLanguage });
    }
    $scope.init();
}]);