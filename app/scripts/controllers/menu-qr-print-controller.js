'use strict';
angular.module('restaurantApp').controller('menuQrCtrl', ['$scope', '$window', '$localStorage', 'ENV', 'Data', '$stateParams', function ($scope, $window, $localStorage, ENV, Data, $stateParams) {
    
    $scope.logo = [];
    $scope.lang = $stateParams.lang ? $stateParams.lang : 'eng'; 
    $scope.account_Id = $localStorage.selectedUser ?  $localStorage.selectedUser.account_id : $localStorage.user.account_id;
    $scope.init = function(){
        $scope.menuPrint = {};
        $scope.qrSize = 200;

        $scope.menuPrint.qrcodeUrl = ENV.apiUrl + '/restaurant/nutrical_menu?id='+$scope.account_Id+'&lang='+$scope.lang;
        
        $scope.getRestaurantLogo($scope.account_Id);
        var params = {
            id: $scope.account_Id,
            qr_code_category: $localStorage.QrCategories
        };
        Data.updateQrCodeCategory(params, function(result){
            console.log(result)
        },function(error){
            console.log(error);
        })
    };

    $scope.getRestaurantLogo = function (accountId) {
        Data.getImage({Id: accountId, entity_type: 11}, function (result) {
            $scope.logo = result.contents;
        });
    };

    $scope.print = function(){
        document.title = $scope.$parent.accountData.user.name;
        $window.print(); 
    };
    $scope.init();
}]);