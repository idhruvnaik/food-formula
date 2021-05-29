'use strict';
angular.module('interceptor', []).factory('errorHttpInterceptor', ['$q', '$injector', function ($q, $injector) {
        Offline.options = {
            requests: false
        };
        return {
            request: function (config) {
                return config || $q.when(config);
            },
            response: function (response) {
                // console.clear();
                return response || $q.when(response);
            },
            responseError: function (response) {
                if (response.data) {
                    $injector.get('Notification').error(response.data.message);
                } else {
                    $injector.get('Notification').error('Sorry! something went wrong.');
                }
                return $q.reject(response);
            }
        };
    }]);
