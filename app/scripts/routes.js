'use strict';
angular.module('routes', [])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                        .state('app', {
                            url: '',
                            views: {
                                '': {//<--this is the main template
                                    controller: ['$scope', function ($scope) {}],
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
                        .state('app.who_is_it_for', {
                            url: '/who-is-it-for',
                            controller: 'HomeCtrl',
                            templateUrl: 'views/who_is_it_for.html',
                            resolve: {
                                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('scripts/controllers/home-controller.js');
                                    }]
                            }
                        })
                        .state('app.how_it_works', {
                            url: '/how-it-works',
                            controller: 'HomeCtrl',
                            templateUrl: 'views/how_it_works.html',
                            resolve: {
                                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('scripts/controllers/home-controller.js');
                                    }]
                            }
                        })
                        .state('app.privacy_policy', {
                            url: '/privacy_policy',
                            controller: 'privacyPolicyCtrl',
                            templateUrl: 'views/privacy-policy.html',
                            resolve: {
                                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('scripts/controllers/privacy-policy-controller.js');
                                    }]
                            }
                        })
                        .state('app.contact_us', {
                            url: '/contact-us',
                            controller: 'HomeCtrl',
                            templateUrl: 'views/contact_us.html',
                            resolve: {
                                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('scripts/controllers/home-controller.js');
                                    }]
                            }
                        })
                        .state('app.customers', {
                            url: '/customers',
                            controller: 'HomeCtrl',
                            templateUrl: 'views/customers.html',
                            resolve: {
                                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('scripts/controllers/home-controller.js');
                                    }]
                            }
                        })
                        .state('app.press', {
                            url: '/press',
                            controller: 'pressCtrl',
                            templateUrl: 'views/press.html',
                            resolve: {
                                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('scripts/controllers/press-controller.js');
                                }],
                                press: ['Data', function (Data) {
                                        return Data.getPublishedPress();
                                }]
                            }
                        })
                        .state('app.blogs', {
                            url: '/blogs',
                            controller: 'blogsCtrl',
                            templateUrl: 'views/blogs.html',
                            resolve: {
                                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('scripts/controllers/blogs-controller.js');
                                    }],
                                blogs: ['Data', function (Data) {
                                        return Data.getPublishedBlogs();
                                    }]
                            }
                        })
                        .state('app.blogdetail', {
                            url: '/blog/:url',
                            controller: 'blogCtrl',
                            templateUrl: 'views/blog.html',
                            resolve: {
                                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('scripts/controllers/blog-controller.js');
                                    }],
                                blogDetail: ['$stateParams', 'Data', function ($stateParams, Data) {
                                        return Data.getBlogDetails({url: $stateParams.url});
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
                        .state('app.nutrical_tutorial', {
                            url: '/nutrical-tutorial',
                            controller: 'nutricalTutorialCtrl',
                            templateUrl: 'views/nutrical_tutorial.html',
                            resolve: {
                                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('scripts/controllers/nutrical-tutorial-controller.js');
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
                            url: '/menu-qr-print/:lang',
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
                        .state('app.posts', {
                            url: '/posts',
                            controller: 'postsCtrl',
                            templateUrl: 'views/posts.html',
                            resolve: {
                                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('scripts/controllers/posts-controller.js');
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
                        .state('app.add-post', {
                            url: '/add-post',
                            controller: 'postDetailCtrl',
                            templateUrl: 'views/post-detail.html',
                            resolve: {
                                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('scripts/controllers/post-detail-controller.js');
                                    }]
                            },
                            data: {
                                role: 'admin'
                            }
                        })
                        .state('app.edit-post', {
                            url: '/edit-post/:id',
                            controller: 'postDetailCtrl',
                            templateUrl: 'views/post-detail.html',
                            resolve: {
                                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('scripts/controllers/post-detail-controller.js');
                                    }]
                            },
                            data: {
                                role: 'admin'
                            }
                        })
                        .state('app.ingredients-cost', {
                            url: '/ingredients-cost',
                            controller: 'ingredientsCostCtrl',
                            templateUrl: 'views/ingredients-cost.html',
                            resolve: {
                                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                        return $ocLazyLoad.load('scripts/controllers/ingredients-cost-controller.js');
                                }]
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
                        });
                $urlRouterProvider.otherwise('/');
            }]);
