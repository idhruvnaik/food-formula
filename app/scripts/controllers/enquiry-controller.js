'use strict';
angular.module('restaurantApp').controller('enquiryCtrl', ['$scope', '$state', '$http', 'Data', '$localStorage', function ($scope, $state, $http, Data, $localStorage) {
    $scope.init = function () {
        $scope.retrieveEnquiries();
    };

    $scope.retrieveEnquiries = function () {
        $scope.enquiries = [];
        Data.getEnquiries(function (result) {
            $scope.enquiries = result.contents;
            console.log($scope.enquiries);
        }, function (error) {
            console.log(error);
        });
    };

    $scope.removeEnquiry = function (id, index) {
        if (confirm('Do you want to delete this enquiry')) {
            Data.deleteEnquiry({ id: id }, function (result) {
                $scope.enquiries.splice(index, 1);
            },
                function (error) {
                    console.log(error);
                }
            );
        }
    }

    $scope.init();
}]);