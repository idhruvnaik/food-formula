
'use strict';
angular.module('restaurantApp').controller('userDetailCtrl', ['$scope', '$state', '$http', 'Data', '$location', '$stateParams', 'Notification', 'ENV', function ($scope, $state, $http, Data, $location, $stateParams, Notification, ENV) {
    $scope.formData = {};
    $scope.access_states = [{ label: 'Basic', val: 1 }, { label: 'Trial', val: 2 }];
    $scope.statuses = [{ label: 'Active', val: 1 }, { label: 'Inactive', val: 4 }];
    $scope.countries = ENV.COUNTRIES;
    $scope.currencies = ENV.CURRENCY;
    $scope.entityId = '';
    $scope.userEntities = [];

    var path = $location.$$path;
    if (path == '/add-user') {
        $scope.typeOfView = 'add';
        $scope.title = 'Add User';
    } else {
        $scope.typeOfView = 'edit';
        $scope.title = 'Edit User';
    };

    $scope.saveUser = function () {
        $scope.btnLoader = true;
        if ($scope.typeOfView == 'edit' && $stateParams.id) {
            $scope.formData.user_id = $stateParams.id;
            Data.editUserData($scope.formData, function (result) {
                $scope.btnLoader = false;
                Notification.success(result.message);
            }, function (error) {
                console.log(error);
                $scope.btnLoader = false;
            });
        } else {
            Data.addUsers($scope.formData, function (result) {
                $scope.btnLoader = false;
                Notification.success(result.message);
                $state.go('app.admin-dashboard');
            }, function (error) {
                console.log(error);
                $scope.btnLoader = false;
            });
        }
    };

    var initialize = function () {
        $scope.entities = $scope.$parent.adminData.masters_entities;
        if ($stateParams.id) {
            Data.getUserData({ user_id: $stateParams.id }, function (result) {
                var data = result.contents;
                $scope.formData = data;
                $scope.userEntities = data.user_entities;
                if (data.start_date == null) {
                    $scope.start_date = null;
                } else {
                    $scope.formData.start_date = new Date(data.start_date)
                }
                if (data.end_date == null) {
                    $scope.end_date = null;
                } else {
                    $scope.formData.end_date = new Date(data.end_date)
                }
            }, function (error) {
                console.log(error);
            });
        }
    };

    $scope.addUserEntity = function (id) {
        var params = {
            entity_id: id,
            user_id: $stateParams.id
        };
        if (id) {
            Data.addUserEntity(params, function (result) {
                $scope.userEntities.push(result.contents);
                $scope.entityId = '';
            }, function (error) {
                console.log(error);
                $scope.entityId = '';
            });
        }
    };

    $scope.removeUserEntity = function (id, index) {
        var params = {
            user_entity_id: id
        };
        Data.removeUserEntity(params, function (result) {
            $scope.userEntities.splice(index, 1);
        }, function (error) {
            console.log(error);
        });
    };

    initialize();
}]);