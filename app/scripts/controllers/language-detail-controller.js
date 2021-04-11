
'use strict';
angular.module('restaurantApp').controller('languageDetailCtrl', ['$scope', '$state', '$http', 'Data', '$location', '$stateParams', 'Notification', 'ENV', function ($scope, $state, $http, Data, $location, $stateParams, Notification, ENV) {
    $scope.formData = {};
    $scope.languageId = $stateParams.id ? $stateParams.id : null;

    $scope.saveLanguage = function () {
        $scope.btnLoader = true;
        if ($scope.languageId) {
            $scope.formData.id = $scope.languageId;
            Data.addUpdateLanguage($scope.formData, function (result) {
                $scope.btnLoader = false;
                Notification.success(result.message);
            }, function (error) {
                console.log(error);
                $scope.btnLoader = false;
            });
        } else {
            Data.addUpdateLanguage($scope.formData, function (result) {
                $scope.btnLoader = false;
                $state.go('app.language');
            }, function (error) {
                console.log(error);
                $scope.btnLoader = false;
            });
        }
    };

    var initialize = function () {
        if ($scope.languageId) {
            Data.getLanguageById({ id: $scope.languageId }, function (result) {
                $scope.formData = result.contents;
                $scope.formData.status_id = parseInt(result.contents.status_id);
            }, function (error) {
                console.log(error);
            });
        }
    };
    initialize();
}]);