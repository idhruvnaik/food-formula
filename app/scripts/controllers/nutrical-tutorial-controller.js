'use strict';
angular.module('restaurantApp').controller('nutricalTutorialCtrl', ['$scope', 'Data', function ($scope, Data) {
    
    $scope.init = function () {
        $scope.getAccountData();
    };

    $scope.getAccountData = function(){
        Data.getMastersData(function(result){
            $scope.user = result.contents.user;
        });
    };
    $scope.init();
}]); 