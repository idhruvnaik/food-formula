'use strict';
angular.module('restaurantApp').controller('privacyPolicyCtrl', ['$scope', function ($scope) {

    $scope.init = function () {
        window.open('/upload/nutrical-privacy-policy.pdf', '_self');
    };
    $scope.init();
}]);