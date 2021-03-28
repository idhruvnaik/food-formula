'use strict';
angular.module('restaurantApp').controller('ProfileCtrl', ['$scope', '$filter', '$localStorage', '$timeout', 'Data', 'Notification', '$uibModal', 'ENV', function ($scope, $filter, $localStorage, $timeout, Data, Notification, $uibModal, ENV) {

    $scope.user = {};
    $scope.pass = {};
    $scope.errorMsg2 = false;
    $scope.successMsg2 = false;
    $scope.formIsSubmit = false;
    $scope.logo = {};
    $scope.file = {};
    $scope.currencies = ENV.CURRENCY;

    var init = function () {
        $scope.user = angular.copy($localStorage.user);
        $scope.getRestaurantLogo($scope.$parent.accountData.restaurant_id);
    };

    $scope.saveUserPassword = function () {
        $scope.formIsSubmit = true;

        Data.updateUserPassword($scope.pass, function (result) {
            $scope.successMsg2 = result.message;
            $timeout(function () {
                $scope.successMsg2 = false;
            }, 2500);

        }, function (result) {
            $scope.pass = {};
            $scope.errorMsg2 = result;
            $timeout(function () {
                $scope.errorMsg2 = false;
            }, 2500);
        });
    };

    $scope.saveRestaurantLogo = function () {
        if (angular.equals($scope.file, {})) {
            Notification({ message: 'Please select a image to be uploaded' }, 'warning');
            return;
        }

        if ($scope.file.size > 10485760) {
            Notification({ message: 'Image file size exceeding 10 MB' }, 'warning');
            return;
        }

        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child(Date.now().toString() + '-' + $scope.file.name).put($scope.file);
        uploadTask.on('state_changed', function (snapshot) {
        }, function (error) {
            console.log(error);
        }, function () {

            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                var params = {
                    entity_type: 2,
                    entity_type_id: $scope.user.user_id,
                    url: downloadURL
                };
                Data.uploadImage(params, function (result) {
                    $scope.logo = result.contents;
                    $scope.file = {};
                }, function (error) {
                    $scope.file = {};
                    console.log(error);
                    
                });
            });
        });
    };

    $scope.removeRestaurantLogo = function (imageId) {
        Data.removeImage({ id: imageId }, function (result) {
            $scope.logo = {};
        }, function (error) {
            console.log(error);
        });
    };

    $scope.getRestaurantLogo = function (restaurantId) {
        $scope.logoLoaded = false;
        Data.getRestaurantLogo({ restaurant_id: restaurantId }, function (result) {
            $scope.logo = result.contents;
        });
    };

    $scope.getFiles = function (file) {
        $scope.file = file;
    };

    $scope.updateUserDetails = function () {
        Data.updateUserDetails({ name: $scope.user.name, email: $scope.user.email, currency: $scope.user.currency, personal_detail: $scope.user.personal_detail }, function (result) {
            $localStorage.user = result.contents;
            Notification.success('Updated');
        }, function (error) {
            Notification.error(error);
        });
    };
    init();
}]);