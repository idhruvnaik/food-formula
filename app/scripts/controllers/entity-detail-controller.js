
'use strict';
angular.module('restaurantApp').controller('entityDetailCtrl', ['$scope', '$state', '$http', 'Data', '$location', '$stateParams', 'Notification', 'ENV', function ($scope, $state, $http, Data, $location, $stateParams, Notification, ENV) {
    $scope.formData = {};
    $scope.entityId = $stateParams.id ? $stateParams.id : null;

    $scope.saveEntity = function () {
        $scope.btnLoader = true;
        if ($scope.entityId) {
            $scope.formData.id = $scope.entityId;
            Data.addUpdateEntity($scope.formData, function (result) {
                $scope.btnLoader = false;
                Notification.success(result.message);
            }, function (error) {
                console.log(error);
                $scope.btnLoader = false;
            });
        } else {
            Data.addUpdateEntity($scope.formData, function (result) {
                $scope.btnLoader = false;
                Notification.success(result.message);
                $state.go('app.entity');
            }, function (error) {
                console.log(error);
                $scope.btnLoader = false;
            });
        }
    };

    var initialize = function () {
        if ($scope.entityId) {
            Data.getEntityById({ id: $scope.entityId }, function (result) {
                $scope.formData = result.contents;
                $scope.formData.status_id = parseInt(result.contents.status_id);
            }, function (error) {
                console.log(error);
            });
        }
    };
    initialize();
}]);