'use strict';
angular.module('restaurantApp').controller('enquiryDetailCtrl', ['$scope', '$stateParams', 'Data', 'Notification', function ($scope, $stateParams, Data, Notification) {
    $scope.statuses = [{ label: 'Open', val: 1 }, { label: 'Close', val: 2 }];
    
    $scope.init = function () {
        $scope.getEnquiry();
    };

    $scope.getEnquiry = function () {
        $scope.enquiry = {};
        Data.getEnquiry({ id: $stateParams.id }, function (result) {
            $scope.enquiry = result.contents;
        }, function (error) {
            console.log(error);
        });
    };

    $scope.updateEnquiry = function () {
        Data.updateEnquiry({ id: $stateParams.id, status_id: $scope.enquiry.status_id }, function (result) {
            Notification.success('Updated');
        }, function (error) {
            console.log(error);
        });
    };

    $scope.init();
}]);