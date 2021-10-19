'use strict';
angular.module('restaurantApp').controller('ProfileCtrl', ['$scope', '$filter', '$localStorage', '$timeout', 'Data', 'Notification', '$uibModal', 'ENV', function ($scope, $filter, $localStorage, $timeout, Data, Notification, $uibModal, ENV) {

    $scope.user = {};
    $scope.pass = {};
    $scope.errorMsg2 = false;
    $scope.successMsg2 = false;
    $scope.formIsSubmit = false;
    $scope.logo = {};
    $scope.hrLogo = {};
    $scope.file = {};
    $scope.currencies = ENV.CURRENCY;
    $scope.bannerImages = [];

    var init = function () {

        $scope.user = angular.copy($localStorage.user);
        if (!$scope.isAdmin()) {
            $scope.getRestaurantLogo($scope.$parent.accountData.restaurant_id);
        }
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

    $scope.saveHrLogo = function () {
        if (angular.equals($scope.hrLogoFile, {})) {
            Notification({ message: 'Please select a image to be uploaded' }, 'warning');
            return;
        }

        if ($scope.hrLogoFile.size > 10485760) {
            Notification({ message: 'Image file size exceeding 10 MB' }, 'warning');
            return;
        }

        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child(Date.now().toString() + '-' + $scope.hrLogoFile.name).put($scope.hrLogoFile);
        uploadTask.on('state_changed', function (snapshot) {
        }, function (error) {
            console.log(error);
        }, function () {

            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                var params = {
                    entity_type: 4,
                    entity_type_id: $scope.$parent.accountData.id,
                    url: downloadURL
                };
                Data.uploadImage(params, function (result) {
                    $scope.hrLogo = result.contents;
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

    $scope.removeHrLogo = function (imageId) {
        Data.removeImage({ id: imageId }, function (result) {
            $scope.hrLogo = {};
        }, function (error) {
            console.log(error);
        });
    };

    $scope.getRestaurantLogo = function (restaurantId) {
        $scope.logoLoaded = false;
        Data.getRestaurantLogo({ restaurant_id: restaurantId }, function (result) {
            $scope.logo = result.contents.logo;
            $scope.bannerImages = result.contents.banner_images;
            $scope.hrLogo = result.contents.hr_logo;
        });
    };

    $scope.uploadFile = function (file) {
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child(Date.now().toString() + '-' + file.name).put(file);
        uploadTask.on('state_changed', function (snapshot) {
        }, function (error) {
            console.log(error);
        }, function () {

            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                var params = {
                    entity_type: 3,
                    entity_type_id: $scope.$parent.accountData.id,
                    url: downloadURL
                };
                Data.uploadImage(params, function (result) {
                    $scope.bannerImages.push(result.contents);
                }, function (error) {
                    alert(error);
                });
            });
        });
    };

    $scope.removeImage = function (index, imageId) {
        Data.removeImage({ id: imageId }, function (result) {
            $scope.bannerImages.splice(index, 1);
        }, function (error) {
            console.log(error);
        });
    };

    $scope.getFiles = function (file) {
        $scope.file = file;
    };

    $scope.gethrLogo = function (file) {
        $scope.hrLogoFile = file;
    };

    $scope.updateUserDetails = function () {
        Data.updateUserDetails({ name: $scope.user.name, email: $scope.user.email, currency: $scope.user.currency, website: $scope.user.website, country_code: $scope.user.country_code, map_link: $scope.user.map_link, color1: $scope.user.color1, color2: $scope.user.color2}, function (result) {
            $localStorage.user = result.contents;
            console.log($localStorage.user);
            
            Notification.success('Updated');
        }, function (error) {
            Notification.error(error);
        });
    };
    init();
}]);