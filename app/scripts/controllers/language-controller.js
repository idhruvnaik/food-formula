'use strict';
angular.module('restaurantApp').controller('languageCtrl', ['$scope', '$state', '$http', 'Data', '$localStorage', function ($scope, $state, $http, Data, $localStorage) {
    
    $scope.init = function () {
        $scope.retrieveEntities();
    };
    
    $scope.retrieveEntities = function () {
        $scope.languages = [];
        Data.getLanguages(function (result) {
            $scope.languages = result.contents;
        }, function (error) {
            console.log(error);
        });
    };

    $scope.init();
}]);