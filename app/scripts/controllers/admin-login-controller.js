/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
angular.module('restaurantApp').controller('adminLoginCtrl', ['$scope', '$rootScope', '$state', 'Data', '$localStorage', function ($scope, $rootScope, $state, Data, $localStorage) {
        $scope.loginObj = {};
        $scope.requestAccess = function () {
            $scope.loginLoader = true;

            Data.getLogin($scope.loginObj, function (result) {
                window.localStorage.clear();
                $localStorage.$reset();
                if (result.status == 'success') {
                    $rootScope.$broadcast('LOGIN');
                    $localStorage.user = result.contents;
                    $localStorage.api_key = result.contents.api_key;
                    $state.go('app.dashboard');
                    window.localStorage.loggedInTime = new Date();
                } else {
                    $scope.loginLoader = false;
                }

            }, function (error) {
//                alert(error);
                $scope.loginLoader = false;
            }
            );
        };
    }]);