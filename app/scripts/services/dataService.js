'use strict';
angular.module('restaurantApp').service('Data', ['$http', '$localStorage', 'ENV', function ($http, $localStorage, ENV) {
    var s = {};

    s.user = $localStorage.user;
    s.baseUrl = ENV.apiUrl;

    s.postHttp = function (url, params, successCb, failureCb) {
        s.getAuthData(params);
        $http.post(s.baseUrl + url, params).then(function (result) {
            if (result.data.status == 'error') {
                failureCb(result.data.message);

            } else if (result.data.status == 'success') {
                successCb(result.data);

            } else {
                failureCb('Something is wrong.');
            }

        }, function (error) {
            failureCb(error);
        });
    };

    s.getHttp = function (url, params, successCb, failureCb) {
        s.getAuthData(params);
        $http.get(s.baseUrl + url, { params: params }, { ignoreLoadingBar: params.ignoreLoadingBar }).then(function (result) {
            if (result.data.status == 'error') {
                failureCb(result.data.message);

            } else if (result.data.status == 'success') {
                successCb(result.data);

            } else {
                failureCb('Something is wrong.');
            }

        }, function (error) {
            failureCb(error);
        });
    };


    s.getAuthData = function (data) {
        if ($localStorage.user) {
            data.restaurant_id = $localStorage.user.restaurant_id;
            data.api_key = $localStorage.user.api_key;
        }
        return data;
    };

    s.getUserLogin = function (data, successCb, failureCb) {
        s.postHttp('user/request_account_access', data, successCb, failureCb);
    };
    s.signupRestaurant = function (data, successCb, failureCb) {
        s.postHttp('account/nutrical_account_request', data, successCb, failureCb);
    };
    s.getLogin = function (data, successCb, failureCb) {
        data.ignoreLoadingBar = true;
        s.postHttp('admin/request_account_access', data, successCb, failureCb);
    };
    s.getMastersData = function (successCb, failureCb) {
        s.postHttp('user/get_master', {}, successCb, failureCb);
    };

    s.getDashboardDetails = function (successCb, failureCb) {
        s.postHttp('restaurant/get_all_categories', {}, successCb, failureCb);
    };

    s.saveRecipeCategory = function (id, name, successCb, failureCb) {
        s.postHttp('restaurant/create_category', { id: id, name: name }, successCb, failureCb);
    };

    s.updateUserPassword = function (data, successCb, failureCb) {
        s.postHttp('user/update_password', data, successCb, failureCb);
    };

    s.deleteRecipeCategory = function (id, successCb, failureCb) {
        s.postHttp('restaurant/remove_category', { id: id }, successCb, failureCb);
    };
    s.getUsers = function (successCb, failureCb) {
        s.postHttp('admin/get_all_users', {}, successCb, failureCb);
    };

    s.addUsers = function (params, successCb, failureCb) {
        s.postHttp('admin/create_user', params, successCb, failureCb);
    };

    s.getUserData = function (params, successCb, failureCb) {
        s.postHttp('admin/get_user_profile', params, successCb, failureCb);
    };

    s.getQRCategories = function (params, successCb, failureCb) {
        s.postHttp('restaurant/get_qr_code_category', params, successCb, failureCb);
    };

    s.editUserData = function (params, successCb, failureCb) {
        s.postHttp('admin/update_user_profile', params, successCb, failureCb);
    };

    s.getRecipeById = function (params, successCb, failureCb) {
        s.postHttp('restaurant/get_food_item_details_by_id', params, successCb, failureCb);
    };

    s.addIngredients = function (params, successCb, failureCb) {
        s.postHttp('nutrical/add_ingredients', params, successCb, failureCb);
    };

    s.addRecipe = function (name, categoryId, successCb, failureCb) {
        s.postHttp('restaurant/create_food_item', { name: name, category_id: categoryId }, successCb, failureCb);
    };

    s.addBulkRecipes = function (params, successCb, failureCb) {
        s.postHttp('restaurant/create_food_item_in_bulk', params, successCb, failureCb);
    };

    s.updateRecipe = function (params, successCb, failureCb) {
        s.postHttp('restaurant/update_food_item', params, successCb, failureCb);
    };

    s.discardRecipe = function (id, successCb, failureCb) {
        s.postHttp('restaurant/remove_food_item', { id: id }, successCb, failureCb);
    };

    s.addIngredient = function (params, successCb, failureCb) {
        s.postHttp('account/add_ingredient', params, successCb, failureCb);
    };

    s.updateIngredient = function (params, successCb, failureCb) {
        s.postHttp('account/update_ingredient', params, successCb, failureCb);
    };

    s.removeIngredient = function (params, successCb, failureCb) {
        s.postHttp('account/remove_ingredient', params, successCb, failureCb);
    };

    s.searchSubRecipe = function (params, successCb, failureCb) {
        s.postHttp('nutrical/search_sub_recipe', params, successCb, failureCb);
    };

    s.searchIngredients = function (params, successCb, failureCb) {
        s.postHttp('nutrical/search_ingredient', params, successCb, failureCb);
    };

    s.updateUserDetails = function (params, successCb, failureCb) {
        s.postHttp('user/update_user_profile', params, successCb, failureCb);
    };

    s.uploadImage = function (params, successCb, failureCb) {
        s.postHttp('restaurant/store_image', params, successCb, failureCb);
    };
    s.removeImage = function (params, successCb, failureCb) {
        s.postHttp('restaurant/remove_image', params, successCb, failureCb);
    };

    s.getRestaurantLogo = function (params, successCb, failureCb) {
        s.postHttp('restaurant/get_restaurant_logo', params, successCb, failureCb);
    };


    s.getFoodItemTemplate = function (params, successCb, failureCb) {
        s.postHttp('nutrical/get_food_item_template', params, successCb, failureCb);
    };

    s.getPosts = function (successCb, failureCb) {
        s.postHttp('nutrical/get_post_list', {}, successCb, failureCb);
    };
    s.addPost = function (params, successCb, failureCb) {
        $http.post(s.baseUrl + 'nutrical/add_post', params, {
            withCredentials: false,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        }).then(function (result) {
            s.handleResponse(result, successCb, failureCb);
        }, function (error) {
            failureCb(error);
        });
    };
    s.updatePost = function (params, successCb, failureCb) {
        $http.post(s.baseUrl + 'nutrical/update_post', params, {
            withCredentials: false,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        }).then(function (result) {
            s.handleResponse(result, successCb, failureCb);
        }, function (error) {
            failureCb(error);
        });
    };
    s.getPost = function (params, successCb, failureCb) {
        s.postHttp('nutrical/get_post', params, successCb, failureCb);
    };
    s.getChartNutrientsAnalysis = function (params, successCb, failureCb) {
        params.ignoreLoadingBar = true;
        s.postHttp('nutrical/get_chart_nutrients_analysis', params, successCb, failureCb);
    };
    s.getPublishedBlogs = function () {
        var promise = $http.post(s.baseUrl + 'nutrical/get_published_blog_list').then(function (response) {
            return response;
        });
        return promise;
    };
    s.getPublishedPress = function () {
        var promise = $http.post(s.baseUrl + 'nutrical/get_published_press_list').then(function (response) {
            return response;
        });
        return promise;
    };
    s.getBlogDetails = function (data) {
        var promise = $http.post(s.baseUrl + 'nutrical/detailed_blog', {
            url: data.url
        }).then(function (response) {
            return response;
        });
        return promise;
    };

    s.getResturantCategories = function (successCb, failureCb) {
        s.postHttp('restaurant/get_all_categories', {}, successCb, failureCb);
    };
    s.getCategoryRecipes = function (data, successCb, failureCb) {
        s.postHttp('restaurant/get_recipes_by_category', { id: data.id, ignoreLoadingBar: true }, successCb, failureCb);
    };
    s.updateQrCodeCategory = function (params, successCb, failureCb) {
        s.postHttp('restaurant/update_qr_code_category', params, successCb, failureCb);
    };
    s.getIngredients = function (successCb, failureCb) {
        s.postHttp('nutrical/get_ingredients', {}, successCb, failureCb);
    }
    s.updateIngredientCost = function (params, successCb, failureCb) {
        s.postHttp('nutrical/update_ingredient_cost', params, successCb, failureCb);
    }
    s.getFoodItemLabel = function (params, successCb, failureCb) {
        s.postHttp('restaurant/food_item_label', params, successCb, failureCb);
    };
    s.copyRecipe = function (params, successCb, failureCb) {
        s.postHttp('restaurant/copy_recipe', params, successCb, failureCb);
    };
    s.searchRecipe = function (params, successCb, failureCb) {
        s.postHttp('restaurant/search_recipe', params, successCb, failureCb);
    };
    s.getMenu = function (params, successCb, failureCb) {
        s.postHttp('restaurant/get_menu', params, successCb, failureCb);
    };
    s.getAllergiesAndMealTypes = function (params, successCb, failureCb) {
        s.postHttp('nutrical/get_allergies_and_meal_types', params, successCb, failureCb);
    };
    s.getLableInformation = function (params, successCb, failureCb) {
        s.getHttp('nutrical/get_label_information', params, successCb, failureCb);
    };
    s.setRecipeCategory = function (params, successCb, failureCb) {
        s.postHttp('restaurant/set_recipe_category', params, successCb, failureCb);
    };
    s.addEnquiry = function (params, successCb, failureCb) {
        s.postHttp('restaurant/generate_enquiry', params, successCb, failureCb);
    };
    s.getEnquiries = function (successCb, failureCb) {
        s.postHttp('restaurant/get_all_enquiries', {}, successCb, failureCb);
    };
    s.getEnquiry = function (params, successCb, failureCb) {
        s.postHttp('restaurant/get_enquiry_by_id', params, successCb, failureCb);
    };
    s.updateEnquiry = function (params, successCb, failureCb) {
        s.postHttp('restaurant/update_enquiry', params, successCb, failureCb);
    };
    s.deleteEnquiry = function (params, successCb, failureCb) {
        s.postHttp('restaurant/remove_enquiry', params, successCb, failureCb);
    };
    s.handleResponse = function (result, successCb, failureCb) {
        if (result.data.status == 'success') {
            successCb(result.data.contents);
        } else if (result.data.status == 'error') {
            failureCb(result.data.message);
        } else {
            failureCb('Something went wrong');
        }
    };

    return s;
}]);

