'use strict';
angular.module('restaurantApp').service('Data', ['$http', '$localStorage', 'ENV', function ($http, $localStorage, ENV) {
    var s = {};

    s.user = $localStorage.user;
    s.baseUrl = ENV.apiUrl;

    s.postHttp = function (url, params, successCb, failureCb) {
        s.getAuthData(params);
        $http.post(s.baseUrl + url, params, { ignoreLoadingBar: params.ignoreLoadingBar }).then(function (result) {
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

    s.getLogin = function (data, successCb, failureCb) {
        data.ignoreLoadingBar = true;
        s.postHttp('admin/request_account_access', data, successCb, failureCb);
    };

    s.getMastersData = function (successCb, failureCb) {
        s.postHttp('user/get_master', {}, successCb, failureCb);
    };

    s.getAdminMaster = function (successCb, failureCb) {
        s.postHttp('admin/get_master', {}, successCb, failureCb);
    };

    s.getDashboardDetails = function (successCb, failureCb) {
        s.postHttp('restaurant/get_all_categories', {}, successCb, failureCb);
    };

    s.saveRecipeCategory = function (id, name, successCb, failureCb) {
        s.postHttp('restaurant/add_or_update_category', { id: id, name: name }, successCb, failureCb);
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

    s.getOrders = function (successCb, failureCb) {
        s.postHttp('order/get_restaurant_orders', {}, successCb, failureCb);
    };

    s.getOrderDetails = function (params, successCb, failureCb) {
        s.postHttp('order/get_order_details', params, successCb, failureCb);
    };

    s.updateOrderStatus = function (params, successCb, failureCb) {
        s.postHttp('order/update_order', params, successCb, failureCb);
    };

    s.getAllOrders = function (params, successCb, failureCb) {
        s.postHttp('order/get_end_user_orders', params, successCb, failureCb);
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
    s.menuInit = function (params, successCb, failureCb) {
        s.postHttp('restaurant/menu_init', params, successCb, failureCb);
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
    s.getRestaurantMenu = function (params, successCb, failureCb) {
        params.ignoreLoadingBar = true;
        s.postHttp('restaurant/get_menu_template_v4', params, successCb, failureCb);
    };
    s.getRecipesByCategories = function (params, successCb, failureCb) {
        s.postHttp('restaurant/get_recipe_details_from_category', params, successCb, failureCb);
    };
    s.getEntities = function (successCb, failureCb) {
        s.postHttp('entity/get_all_masters_entities', {}, successCb, failureCb);
    };
    s.getEntityById = function (params, successCb, failureCb) {
        s.postHttp('entity/get_entity_by_id', params, successCb, failureCb);
    };
    s.addUpdateEntity = function (params, successCb, failureCb) {
        s.postHttp('entity/add_or_update_entity', params, successCb, failureCb);
    };
    s.addUserEntity = function (params, successCb, failureCb) {
        s.postHttp('entity/create_user_entity', params, successCb, failureCb);
    };
    s.removeUserEntity = function (params, successCb, failureCb) {
        s.postHttp('entity/remove_user_entity', params, successCb, failureCb);
    };
    s.updateFoodItemPrices = function (params, successCb, failureCb) {
        s.postHttp('restaurant/update_food_item_prices', params, successCb, failureCb);
    };
    s.getLanguages = function (successCb, failureCb) {
        s.postHttp('language/get_all_masters_languages', {}, successCb, failureCb);
    };
    s.getLanguageById = function (params, successCb, failureCb) {
        s.postHttp('language/get_language_by_id', params, successCb, failureCb);
    };
    s.addUpdateLanguage = function (params, successCb, failureCb) {
        s.postHttp('language/add_or_update_language', params, successCb, failureCb);
    };
    s.addUserLanguage = function (params, successCb, failureCb) {
        s.postHttp('language/create_user_language', params, successCb, failureCb);
    };
    s.removeUserLanguage = function (params, successCb, failureCb) {
        s.postHttp('language/remove_user_language', params, successCb, failureCb);
    };
    s.updateFoodItemAliases = function (params, successCb, failureCb) {
        s.postHttp('restaurant/update_food_item_aliases', params, successCb, failureCb);
    };
    s.generateOrder = function (params, successCb, failureCb) {
        s.postHttp('order/generate_order', params, successCb, failureCb);
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

