'use strict';
angular.module('restaurantApp').controller('ProfileCtrl', ['$scope', '$filter', '$localStorage', '$timeout', 'Data', 'Notification', '$uibModal', 'ENV', function ($scope, $filter, $localStorage, $timeout, Data, Notification, $uibModal, ENV) {

    $scope.user = {
        personal_detail: {
            webSiteUrl: ''
        }
    };
    $scope.pass = {};
    $scope.errorMsg2 = false;
    $scope.successMsg2 = false;
    $scope.formIsSubmit = false;
    $scope.logoUpdateSuccess = false;
    $scope.logo = {};
    $scope.restaurantLogo = [];
    $scope.loader = false;
    $scope.currencies = ENV.CURRENCY;

    var init = function () {
        $scope.user = angular.copy($localStorage.user);
        delete $localStorage.selectedUser;
        $scope.accountId = $localStorage.account_Id;
        $scope.getRestaurantLogo($scope.accountId);
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

        if ($scope.restaurantLogo.length == 0) {
            Notification({ message: 'Please select a image to be uploaded' }, 'warning');
            return;
        }

        if ($scope.restaurantLogo.size > 10485760) {
            Notification({ message: 'Image file size exceeding 10 MB' }, 'warning');
            return;
        }

        var fd = new FormData();
        fd.append('file', $scope.restaurantLogo);
        fd.append('entity_type', 11);
        fd.append('entity_type_id', $scope.accountId);

        $scope.loader = true;

        Data.uploadImages(fd, function (result) {

            $scope.logo.push(result);
            $scope.logoLoaded = true;
            $scope.loader = false;
            $scope.logoUpdateSuccess = true;

            $timeout(function () {
                $scope.logoUpdateSuccess = false;
            }, 2500)
        }, function (error) {
            $scope.logoLoaded = false;
            $scope.loader = false;
            console.log(error);
        });
    };

    $scope.removeRestaurantLogo = function (imageId) {
        Data.removeImage({ id: imageId }, function (result) {
            $scope.logo.pop(result);
            $scope.logoLoaded = false;
        }, function (error) {
            console.log(error);
        });
    };

    $scope.getRestaurantLogo = function (accountId) {
        $scope.logoLoaded = false;
        Data.getImage({ Id: accountId, entity_type: 11 }, function (result) {
            if (result.contents == null) {
                return;
            }
            $scope.logo.push(result.contents);
            $scope.logoLoaded = true;
        });
    };

    $scope.getFiles = function (file) {
        $scope.restaurantLogo = file;
    };

    $scope.updateUserDetails = function () {
        Data.updateUserDetails({ name: $scope.user.name, email: $scope.user.email, currency: $scope.user.currency, personal_detail: $scope.user.personal_detail}, function (result) {
            $localStorage.user = result.contents;
            Notification.success('Updated');
        }, function (error) {
            Notification.error(error);
        });
    };

    $scope.uploadFile = function(file){
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child(Date.now().toString() + '-' + file.name).put(file);
        uploadTask.on('state_changed', function(snapshot) {
        }, function(error) {
            console.log(error);
        }, function() {
        
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            var params = {
                entity_type: 2,
                entity_type_id: $scope.user.user_id,
                url: downloadURL
            };
            Data.uploadImage(params, function (result) {
                $scope.logo = result.contents;
        }, function (error) {
            alert(error);
        });
        });
        });
    };

    init();
}]);