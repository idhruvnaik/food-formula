'use strict';
angular.module('restaurantApp').controller('getOrderDetailCtrl', ['$scope', 'Data', 'ENV', '$stateParams', '$state', 'Notification', function ($scope, Data, ENV, $stateParams, $state, Notification) {

    $scope.init = function () {
        $scope.id = $stateParams.id;
        if (!$scope.id) {
            $state.go('app.getorders');
        }
        $scope.getOrderDetails();
        $scope.orderDetails = {};
        $scope.recipes = []
        $scope.statuses = ENV.ORDER_STATUSES;
    };
    $scope.getOrderDetails = function () {
        Data.getOrderDetails({ id: $scope.id }, function (result) {
            $scope.orderDetails.name = result.contents.name;
            $scope.orderDetails.phone = result.contents.phone;
            $scope.orderDetails.status = result.contents.status.toString();
            $scope.orderDetails.email = result.contents.email;
            $scope.orderDetails.mobile_no = result.contents.mobile_no;
            $scope.orderDetails.address = result.contents.address;
            $scope.orderDetails.instructions = result.contents.instructions;
            $scope.orderDetails.total_price = result.contents.total_price;
            $scope.recipes = result.contents.recipes;
        });
    };

    $scope.updateOrderStatus = function () {
        Data.updateOrderStatus({ id: $scope.id, status_id: $scope.orderDetails.status }, function () {
            Notification.success('Status updated')
        });
    }
    $scope.init();
}]); 