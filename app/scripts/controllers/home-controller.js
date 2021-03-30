/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
angular.module('restaurantApp').controller('HomeCtrl', ['$scope', '$state', 'Data', 'Notification', function ($scope, $state, Data, Notification) {
    $(".contact").click(function () {
        $('html,body').animate({
            scrollTop: $("#contact").offset().top
        }, 'slow');
    });
    $scope.enquiry = {};
    $scope.addEnquiry = function () {
        Data.addEnquiry($scope.enquiry, function (result) {
            Notification.success('Thank you! Our team will contact you within 24 hours');
            $("#contactForm")[0].reset();
        }, function (error) {
            console.log(error);
            $("#contactForm")[0].reset();
        });
    };
}]);