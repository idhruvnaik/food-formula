'use strict';
angular.module('restaurantApp', ['ui.router', 'oc.lazyLoad', 'ui.bootstrap', 'ui-notification', 'ngStorage', 'angular-loading-bar', 'ui.tinymce', 'ngIdle', 'checklist-model', 'monospaced.qrcode', 'routes', 'config', 'interceptor', 'ngAnimate', 'ngFileUpload', 'ui.select2', 'dndLists', 'ngImageCompress'])
    .config(['$provide', '$locationProvider', 'NotificationProvider', '$qProvider', 'IdleProvider', 'KeepaliveProvider', '$localStorageProvider', '$httpProvider', function ($provide, $locationProvider, NotificationProvider, $qProvider, IdleProvider, KeepaliveProvider, $localStorageProvider, $httpProvider) {
        $locationProvider.html5Mode(true);
        NotificationProvider.setOptions({
            delay: 3000,
            startTop: 10,
            startRight: 5,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'center',
            positionY: 'top'
        });
        IdleProvider.idle(3600);
        IdleProvider.timeout(1);
        KeepaliveProvider.interval(10);
        $qProvider.errorOnUnhandledRejections(false);
        $httpProvider.interceptors.push('errorHttpInterceptor');
        $httpProvider.useApplyAsync(true);
        $localStorageProvider.setKeyPrefix('nutrical-');
        $provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
            return function (exception, cause) {
                $delegate(exception, cause);
                if (exception && exception.message && exception.message.includes('is not registered.')) {
                    angular.reloadWithDebugInfo();
                    location.reload();
                }
            };
        }]);
    }])
    .run(['$rootScope', '$location', '$localStorage', function ($rootScope, $location, $localStorage) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams) {
            //                    event.preventDefault();
            $location.path('/');
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if ($localStorage.api_key) {
                if ($localStorage.user && $localStorage.user.is_admin) {
                    if (toState && toState.url == '/') {
                        $location.path('/admin-dashboard');
                    } else if (!toState || !toState.name) {
                        $location.path('/admin-dashboard');
                    }
                } else {
                    if (toState && _.contains(['app.home', 'app.who_is_it_for', 'app.how_it_works', 'app.contact_us', 'app.blogs', 'app.blogdetail', 'app.press', 'app.privacy_policy', 'app.terms_and_condition', 'app.getmenu'], toState.name)) {
                        $location.path('/dashboard');
                    } else if (!toState || !toState.name) {
                        $location.path('/dashboard');
                    } else {
                        if (toState.data && toState.data.role == 'admin' && !$localStorage.user.is_admin) {
                            $location.path('/dashboard');
                        }
                    }
                }
            } else {
                if (toState && toState.url == '/adminpanel') {
                    $location.path('/adminpanel');
                } else {
                    if (!_.contains(['app.who_is_it_for', 'app.how_it_works', 'app.contact_us', 'app.blogs', 'app.blogdetail', 'app.press', 'app.privacy_policy', 'app.terms_and_condition', 'app.getmenu', 'app.menuinit'], toState.name)) {
                        $location.path('/');
                    }
                }
            }
        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

        });
        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            $location.path('/');
        });
    }])
    .directive('swiper', function () {
        return {
            link: function (scope, element, attr) {
                const swiper = new Swiper('.swiper', {
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                    direction: 'horizontal',
                    loop: false,
                    preloadImages: false,
                    lazy: true,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets'
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        hideOnClick: true
                    },
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        draggable: true
                    },
                    zoom: {
                        maxRatio: 5,
                        toggle: true
                    },
                });
                swiper.slideTo(scope.docReport.index);
            }
        };
    })
    .directive('mmenu', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $(element).mmenu({ slidingSubmenus: false });
            }
        };
    });



