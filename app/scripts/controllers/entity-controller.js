'use strict';
angular.module('restaurantApp').controller('entityCtrl', ['$scope', '$state', '$http', 'Data', '$localStorage', function ($scope, $state, $http, Data, $localStorage) {
    $scope.status = [{ id: 1, name: 'Published' }, { id: 2, name: 'Draft' }]
    $scope.init = function () {
        $scope.retrieveEntities();
    };
    
    $scope.retrieveEntities = function () {
        $scope.entities = [];
        Data.getEntities(function (result) {
            $scope.entities = result.contents;
        }, function (error) {
            console.log(error);
        });
    };

    $scope.init();
}]);