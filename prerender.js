var fs = require('fs');
var webPage = require('webpage');
var page = webPage.create();
//var https = require('https');
// since this tool will run before your production deploy, your target URL will be your dev/staging environment (localhost, in this example)
//var pageName = 'superfoods-recipes-health-benefits-part-2';
//var path = 'blog/' + pageName;
//var url = 'https://www.nutrical.co/' + path;
var urls = [
    "superfoods-recipes-health-benefits-part-2",
    "indian-cuisine-and-nutrition-calories",
    "superfoods-recipes-health-benefits",
    "cold-pressed-juices-health-benefits-calories-nutrition",
    "keto-diet-recipes-restaurant-menu",
    "poke-bowl-recipe-calories-macros-rice-salmon-avocado",
    "are-salads-healthy-calories-macros-nutritional-benefits",
    "nutrical-health-\u0026-nutrition-solution-for-meal-plan-companies",
    "nutrical-at-expo-culinaire-sharjah-2020",
    "post-lockdown-restaurant-industry-trends-prediction-coronavirus-pre-vaccine",
    "best-selling-healthiest-breakfast-items",
    "nutrical-at-gulfood-startup-pitching-competition-2020-rethinking-food",
    "creating-a-vegan-menu-for-your-restaurant-cafe-veganizing-recipes-plant-based",
    "sushi-calories-macros-nutrition-facts-japenese-food-and-ingredients",
    "acai-berry-bowls-calories-nutritional-benefits",
    "calories-in-popular-lebanese-foods-and-how-to-make-them-healthier",
    "adapting-to-the-new-normal-shifting-your-food-business-focus-online",
    "a-guide-to-creating-recipes-and-food-products-with-immunity-building-ingredients",
    "new-features-in-nutrical",
    "suitable-for-and-contains-allergy-information-in-nutrical",
    "colour-coded-nutrition-facts-labels",
    "dubai-restaurants-serving-healthy-immunity-building-foods",
    "saudi-arabia-ksa-calorie-labels-on-menus",
    "nutriPlan-a-guide-for-restaurants-to-navigate-business-during-the-covid-pandemic",
    "dubai-requirements-calorie-count-on-menus-and-food-labelling",
];

//https.get('https://dubai.fitterfly.in/restaurants_app/nutrical/get_published_blog_list', (resp) => {
//    let data = '';
//    resp.on('data', (chunk) => {
//        console.log(chunk);
//        data += chunk;
//    });
//    resp.on('end', () => {
//        var data = JSON.parse(data);
//        console.log(data);
//        phantom.exit();
//    });
//
//});
//for (var i = 0; i < urls.length; i++) {
//    var path = 'http://localhost:9000/blog/' + urls[i];
var path = 'blog/superfoods-recipes-health-benefits-part-2';
var url = 'https://www.nutrical.co/' + path;
page.open(url, function (status) {
//        console.log(url[i] + '=>' + status)

    if (status != 'success')
        throw 'Error trying to prerender ' + url;

    var content = page.content;
    fs.write(path + '.html', content, 'w');

    console.log("The file was saved.");
    phantom.exit();
//        if (urls.length == i) {
//            phantom.exit();
//        }
});
//}
