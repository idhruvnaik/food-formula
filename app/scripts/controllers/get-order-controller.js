'use strict';
angular.module('restaurantApp').controller('getOrderCtrl', ['$scope', 'Data', 'ENV', function ($scope, Data, ENV) {
    
    $scope.init = function () {
        $scope.getOrders();
        $scope.orders = [];
        $scope.statuses = ENV.ORDER_STATUSES;
    };
    $scope.getOrders = function(){
        Data.getOrders(function(result){
            $scope.orders = result.contents;
        });
    };
    $scope.init();
}]); 