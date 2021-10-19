'use strict';
angular.module('restaurantApp').controller('menuQrCtrl', ['$scope', '$window', '$localStorage', 'ENV', 'Data', '$stateParams', function ($scope, $window, $localStorage, ENV, Data, $stateParams) {

    $scope.logo = {};
    $scope.user_id = $localStorage.user.user_id;

    $scope.entity = $stateParams.entity;

    $scope.menu_key = $scope.accountData.menu_key;
    
    $scope.init = async function () {
        $scope.menuPrint = {};
        $scope.languages = await $scope.$parent.accountData.user_languages;
        $scope.qrSize = 200;
        $scope.menuPrint.qrcodeUrl = window.location.host + '/menu-init/' + $scope.menu_key + '/' + $stateParams.entity;

        $scope.getRestaurantLogo($scope.user_id);
        var params = {
            qr_code_category: $localStorage.QrCategories
        };
        Data.updateQrCodeCategory(params, function (result) {
            console.log(result)
        }, function (error) {
            console.log(error);
        })
    };

    $scope.getRestaurantLogo = function (restaurantId) {
        $scope.logoLoaded = false;
        Data.getRestaurantLogo({ restaurant_id: restaurantId }, function (result) {
            $scope.logo = result.contents;
        });
    };

    $scope.print = function () {
        $window.print();
    };
    $scope.init();
}]);