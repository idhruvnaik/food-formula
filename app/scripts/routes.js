'use strict';
angular.module('routes', [])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '',
                views: {
                    '': {//<--this is the main template
                        controller: ['$scope', function ($scope) { }],
                        templateUrl: 'views/main.html'
                    }
                }
            })
            .state('app.home', {
                url: '/',
                controller: 'HomeCtrl',
                templateUrl: 'views/home.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/home-controller.js');
                    }]
                }
            })
            .state('app.privacy_policy', {
                url: '/privacy-policy',
                controller: 'privacyPolicyCtrl',
                templateUrl: 'views/privacy-policy.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/privacy-policy-controller.js');
                    }]
                }
            })
            .state('app.terms_and_condition', {
                url: '/terms-and-condition',
                controller: 'termsAndConditionCtrl',
                templateUrl: 'views/terms-and-condition.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/terms-and-condition-controller.js');
                    }]
                }
            })
            .state('app.dashboard', {
                url: '/dashboard',
                controller: 'dashboardCtrl',
                templateUrl: 'views/dashboard.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/dashboard-controller.js');
                    }]
                }
            })
            .state('app.profile', {
                url: '/profile',
                controller: 'ProfileCtrl',
                templateUrl: 'views/my-profile.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/my-profile-controller.js');
                    }]
                }
            })
            .state('app.menu-template', {
                url: '/menu-template',
                controller: 'menuTemplateCtrl',
                templateUrl: 'views/menu-template.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/menu-template-controller.js');
                    }]
                }
            })
            .state('app.menu-qr-print', {
                url: '/menu-qr-print',
                controller: 'menuQrCtrl',
                templateUrl: 'views/menu-qr-print.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/menu-qr-print-controller.js');
                    }]
                }
            })
            .state('app.food-item-template', {
                url: '/food-item-template/:recipeId',
                controller: 'foodItemTemplateCtrl',
                templateUrl: 'views/food-item-template.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/food-item-template-controller.js');
                    }]
                }
            })
            .state('app.edit-recipe-details', {
                url: '/edit-recipe-details/:id/:isCopy',
                controller: 'editRecipeDetailsCtrl',
                templateUrl: 'views/edit-recipe-details.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/edit-recipe-details-controller.js');
                    }]
                }
            })
            .state('app.admin-login', {
                url: '/adminpanel',
                controller: 'adminLoginCtrl',
                templateUrl: 'views/admin-login.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/admin-login-controller.js');
                    }]
                }
            })
            .state('app.admin-dashboard', {
                url: '/admin-dashboard',
                controller: 'adminDashboardCtrl',
                templateUrl: 'views/admin-dashboard.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/admin-dashboard-controller.js');
                    }]
                },
                data: {
                    role: 'admin'
                }
            })
            .state('app.enquiry', {
                url: '/enquiry',
                controller: 'enquiryCtrl',
                templateUrl: 'views/enquiry.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/enquiry-controller.js');
                    }]
                },
                data: {
                    role: 'admin'
                }
            })
            .state('app.enquiry-detail', {
                url: '/enquiry-detail/:id',
                controller: 'enquiryDetailCtrl',
                templateUrl: 'views/enquiry-detail.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/enquiry-detail-controller.js');
                    }]
                },
                data: {
                    role: 'admin'
                }
            })
            .state('app.admin-profile', {
                url: '/admin-profile',
                controller: 'ProfileCtrl',
                templateUrl: 'views/admin-profile.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/my-profile-controller.js');
                    }]
                },
                data: {
                    role: 'admin'
                }
            })
            .state('app.add-user', {
                url: '/add-user',
                controller: 'userDetailCtrl',
                templateUrl: 'views/user-detail.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/user-detail-controller.js');
                    }]
                },
                data: {
                    role: 'admin'
                }
            })
            .state('app.edit-user', {
                url: '/edit-user/:id',
                controller: 'userDetailCtrl',
                templateUrl: 'views/user-detail.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/user-detail-controller.js');
                    }]
                },
                data: {
                    role: 'admin'
                }
            })
            .state('app.food-item-label', {
                url: '/food-item-label/:recipeId',
                controller: 'foodItemLabelCtrl',
                templateUrl: 'views/food-item-label.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/food-item-label-controller.js');
                    }]
                }
            }).state('app.getmenu', {
                url: '/get-menu/:menu_key',
                controller: 'getMenuQrCtrl',
                templateUrl: 'views/get-menu.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/get-menu-controller.js');
                    }]
                }
            }).state('app.entity', {
                url: '/entity',
                controller: 'entityCtrl',
                templateUrl: 'views/entity.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/entity-controller.js');
                    }]
                },
                data: {
                    role: 'admin'
                }
            }).state('app.add-entity', {
                url: '/add-entity',
                controller: 'entityDetailCtrl',
                templateUrl: 'views/entity-detail.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/entity-detail-controller.js');
                    }]
                },
                data: {
                    role: 'admin'
                }
            }).state('app.edit-entity', {
                url: '/edit-entity/:id',
                controller: 'entityDetailCtrl',
                templateUrl: 'views/entity-detail.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('scripts/controllers/entity-detail-controller.js');
                    }]
                },
                data: {
                    role: 'admin'
                }
            });
        $urlRouterProvider.otherwise('/');
    }]);
