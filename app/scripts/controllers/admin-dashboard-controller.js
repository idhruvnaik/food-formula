'use strict';
angular.module('restaurantApp').controller('adminDashboardCtrl', ['$scope', '$state', '$http', 'Data', '$localStorage', function ($scope, $state, $http, Data, $localStorage) {

        $scope.role = $localStorage.user;
        
        $scope.users = [];

        $scope.init = function () {
            $scope.retrieveUsers();
            delete $localStorage.selectedUser;
        };

        $scope.retrieveUsers = function () {
            $scope.loader = true;
            $scope.users = [];
            Data.getUsers(function (result) {
                $scope.users = result.contents;
                $scope.loader = false;
            }, function (error) {
                console.log(error);
            });
        };


        $scope.init();
    }]);