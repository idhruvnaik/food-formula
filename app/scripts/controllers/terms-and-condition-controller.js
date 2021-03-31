'use strict';
angular.module('restaurantApp').controller('termsAndConditionCtrl', ['$scope', function ($scope) {

    $scope.init = function () {
        window.open('/upload/terms-and-condition.pdf', '_self');
    };
    $scope.init();
}]);