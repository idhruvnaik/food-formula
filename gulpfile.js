// generated on 2020-06-08 using generator-webapp 4.0.0-8
const { src, dest, watch, series, parallel, lastRun } = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const fs = require('fs');
const mkdirp = require('mkdirp');
const Modernizr = require('modernizr');
const browserSync = require('browser-sync');
const del = require('del');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { argv } = require('yargs');
const wiredep = require('wiredep').stream;
const modRewrite = require('connect-modrewrite');
const ngConstant = require('gulp-ng-constant');
const workboxBuild = require('workbox-build');
const ngtemplate = require('gulp-ng-templates');
const replace = require('gulp-string-replace');
const $ = gulpLoadPlugins();
const uglifyEs = require('gulp-uglify-es').default;
const server = browserSync.create();

const port = argv.port || 9000;

var isProd = argv.production ? true : false;

var envSet = {
    loc: {
        name: 'local',
        apiUrl: 'https://restoz.herokuapp.com/',
        CONTENT_STATUS: { 1: "Published", 2: "Draft", 3: "Discarded" },
        POST_TYPES: [{ id: 1, name: "Blog" }, { id: 3, name: "Press" }],
        META_DESCRIPTION: 'Restaurants, Food Brands & Manufacturers, Meal Plan Companies, Cloud Kitchens use NutriCal to manage recipes & menus, calculate calories, create nutrition labels, conduct food costing & much more.',
        CURRENCY: {
            'AED': 'United Arab Emirates Dirham',
            'AFN': 'Afghan Afghani',
            'ALL': 'Albanian Lek',
            'AMD': 'Armenian Dram',
            'ANG': 'Netherlands Antillean Guilder',
            'AOA': 'Angolan Kwanza',
            'ARS': 'Argentine Peso',
            'AUD': 'Australian Dollar',
            'AWG': 'Aruban Florin',
            'AZN': 'Azerbaijani Manat',
            'BAM': 'Bosnia-Herzegovina Convertible Mark',
            'BBD': 'Barbadian Dollar',
            'BDT': 'Bangladeshi Taka',
            'BGN': 'Bulgarian Lev',
            'BHD': 'Bahraini Dinar',
            'BIF': 'Burundian Franc',
            'BMD': 'Bermudan Dollar',
            'BND': 'Brunei Dollar',
            'BOB': 'Bolivian Boliviano',
            'BRL': 'Brazilian Real',
            'BSD': 'Bahamian Dollar',
            'BTC': 'Bitcoin',
            'BTN': 'Bhutanese Ngultrum',
            'BWP': 'Botswanan Pula',
            'BYN': 'Belarusian Ruble',
            'BZD': 'Belize Dollar',
            'CAD': 'Canadian Dollar',
            'CDF': 'Congolese Franc',
            'CHF': 'Swiss Franc',
            'CLF': 'Chilean Unit of Account (UF)',
            'CLP': 'Chilean Peso',
            'CNH': 'Chinese Yuan (Offshore)',
            'CNY': 'Chinese Yuan',
            'COP': 'Colombian Peso',
            'CRC': 'Costa Rican Colón',
            'CUC': 'Cuban Convertible Peso',
            'CUP': 'Cuban Peso',
            'CVE': 'Cape Verdean Escudo',
            'CZK': 'Czech Republic Koruna',
            'DJF': 'Djiboutian Franc',
            'DKK': 'Danish Krone',
            'DOP': 'Dominican Peso',
            'DZD': 'Algerian Dinar',
            'EGP': 'Egyptian Pound',
            'ERN': 'Eritrean Nakfa',
            'ETB': 'Ethiopian Birr',
            'EUR': 'Euro',
            'FJD': 'Fijian Dollar',
            'FKP': 'Falkland Islands Pound',
            'GBP': 'British Pound Sterling',
            'GEL': 'Georgian Lari',
            'GGP': 'Guernsey Pound',
            'GHS': 'Ghanaian Cedi',
            'GIP': 'Gibraltar Pound',
            'GMD': 'Gambian Dalasi',
            'GNF': 'Guinean Franc',
            'GTQ': 'Guatemalan Quetzal',
            'GYD': 'Guyanaese Dollar',
            'HKD': 'Hong Kong Dollar',
            'HNL': 'Honduran Lempira',
            'HRK': 'Croatian Kuna',
            'HTG': 'Haitian Gourde',
            'HUF': 'Hungarian Forint',
            'IDR': 'Indonesian Rupiah',
            'ILS': 'Israeli New Sheqel',
            'IMP': 'Manx pound',
            'INR': 'Indian Rupee',
            'IQD': 'Iraqi Dinar',
            'IRR': 'Iranian Rial',
            'ISK': 'Icelandic Króna',
            'JEP': 'Jersey Pound',
            'JMD': 'Jamaican Dollar',
            'JOD': 'Jordanian Dinar',
            'JPY': 'Japanese Yen',
            'KES': 'Kenyan Shilling',
            'KGS': 'Kyrgystani Som',
            'KHR': 'Cambodian Riel',
            'KMF': 'Comorian Franc',
            'KPW': 'North Korean Won',
            'KRW': 'South Korean Won',
            'KWD': 'Kuwaiti Dinar',
            'KYD': 'Cayman Islands Dollar',
            'KZT': 'Kazakhstani Tenge',
            'LAK': 'Laotian Kip',
            'LBP': 'Lebanese Pound',
            'LKR': 'Sri Lankan Rupee',
            'LRD': 'Liberian Dollar',
            'LSL': 'Lesotho Loti',
            'LYD': 'Libyan Dinar',
            'MAD': 'Moroccan Dirham',
            'MDL': 'Moldovan Leu',
            'MGA': 'Malagasy Ariary',
            'MKD': 'Macedonian Denar',
            'MMK': 'Myanma Kyat',
            'MNT': 'Mongolian Tugrik',
            'MOP': 'Macanese Pataca',
            'MRO': 'Mauritanian Ouguiya (pre-2018)',
            'MRU': 'Mauritanian Ouguiya',
            'MUR': 'Mauritian Rupee',
            'MVR': 'Maldivian Rufiyaa',
            'MWK': 'Malawian Kwacha',
            'MXN': 'Mexican Peso',
            'MYR': 'Malaysian Ringgit',
            'MZN': 'Mozambican Metical',
            'NAD': 'Namibian Dollar',
            'NGN': 'Nigerian Naira',
            'NIO': 'Nicaraguan Córdoba',
            'NOK': 'Norwegian Krone',
            'NPR': 'Nepalese Rupee',
            'NZD': 'New Zealand Dollar',
            'OMR': 'Omani Rial',
            'PAB': 'Panamanian Balboa',
            'PEN': 'Peruvian Nuevo Sol',
            'PGK': 'Papua New Guinean Kina',
            'PHP': 'Philippine Peso',
            'PKR': 'Pakistani Rupee',
            'PLN': 'Polish Zloty',
            'PYG': 'Paraguayan Guarani',
            'QAR': 'Qatari Rial',
            'RON': 'Romanian Leu',
            'RSD': 'Serbian Dinar',
            'RUB': 'Russian Ruble',
            'RWF': 'Rwandan Franc',
            'SAR': 'Saudi Riyal',
            'SBD': 'Solomon Islands Dollar',
            'SCR': 'Seychellois Rupee',
            'SDG': 'Sudanese Pound',
            'SEK': 'Swedish Krona',
            'SGD': 'Singapore Dollar',
            'SHP': 'Saint Helena Pound',
            'SLL': 'Sierra Leonean Leone',
            'SOS': 'Somali Shilling',
            'SRD': 'Surinamese Dollar',
            'SSP': 'South Sudanese Pound',
            'STD': 'São Tomé and Príncipe Dobra (pre-2018)',
            'STN': 'São Tomé and Príncipe Dobra',
            'SVC': 'Salvadoran Colón',
            'SYP': 'Syrian Pound',
            'SZL': 'Swazi Lilangeni',
            'THB': 'Thai Baht',
            'TJS': 'Tajikistani Somoni',
            'TMT': 'Turkmenistani Manat',
            'TND': 'Tunisian Dinar',
            'TOP': 'Tongan Pa\'anga',
            'TRY': 'Turkish Lira',
            'TTD': 'Trinidad and Tobago Dollar',
            'TWD': 'New Taiwan Dollar',
            'TZS': 'Tanzanian Shilling',
            'UAH': 'Ukrainian Hryvnia',
            'UGX': 'Ugandan Shilling',
            'USD': 'United States Dollar',
            'UYU': 'Uruguayan Peso',
            'UZS': 'Uzbekistan Som',
            'VEF': 'Venezuelan Bolívar Fuerte (Old)',
            'VES': 'Venezuelan Bolívar Soberano',
            'VND': 'Vietnamese Dong',
            'VUV': 'Vanuatu Vatu',
            'WST': 'Samoan Tala',
            'XAF': 'CFA Franc BEAC',
            'XAG': 'Silver Ounce',
            'XAU': 'Gold Ounce',
            'XCD': 'East Caribbean Dollar',
            'XDR': 'Special Drawing Rights',
            'XOF': 'CFA Franc BCEAO',
            'XPD': 'Palladium Ounce',
            'XPF': 'CFP Franc',
            'XPT': 'Platinum Ounce',
            'YER': 'Yemeni Rial',
            'ZAR': 'South African Rand',
            'ZMW': 'Zambian Kwacha',
            'ZWL': 'Zimbabwean Dollar'
        },
        ALLERGIES:
            [{ "id": 1, "name": "Brinjal" }, { "id": 2, "name": "Celery" }, { "id": 3, "name": "Crab" }, { "id": 4, "name": "Mushrooms" }, { "id": 5, "name": "Cashew Nut" }, { "id": 6, "name": "Almond" }, { "id": 7, "name": "Chickpea Flour (Besan) " }, { "id": 8, "name": "Poppy Seeds" }, { "id": 9, "name": "Peanuts" }, { "id": 10, "name": "Walnut" }, { "id": 11, "name": "Sesame Seeds" }, { "id": 12, "name": "Hazelnut" }, { "id": 13, "name": "Food Colors" }, { "id": 14, "name": "Pistachio" }, { "id": 15, "name": "Litchee" }, { "id": 16, "name": "Kiwi" }, { "id": 17, "name": "Coconut Water" }, { "id": 18, "name": "Strawberry" }, { "id": 19, "name": "Sago" }, { "id": 20, "name": "Cucumber" }, { "id": 21, "name": "Pine Nut" }, { "id": 22, "name": "Black Pepper" }, { "id": 23, "name": "Pineapple" }, { "id": 24, "name": "Mustard" }, { "id": 25, "name": "Buckwheat" }, { "id": 26, "name": "Squid" }, { "id": 27, "name": "Coconut" }, { "id": 28, "name": "Monosodium Glutamate (MSG)" }, { "id": 29, "name": "Sulpha Drugs (Sulphur Dioxide & Sulphites)" }, { "id": 30, "name": "Red Meat" }, { "id": 31, "name": "Cheese" }, { "id": 32, "name": "Garlic" }, { "id": 33, "name": "Sea Foods" }, { "id": 34, "name": "Yeast" }, { "id": 35, "name": "Food Additives" }, { "id": 36, "name": "Egg" }, { "id": 37, "name": "Poultry Meat" }, { "id": 38, "name": "Not Allergic" }, { "id": 39, "name": "Cow Milk Protein" }, { "id": 40, "name": "Tree Nut" }, { "id": 41, "name": "Corn" }, { "id": 42, "name": "Lactose" }, { "id": 43, "name": "Shell Fish" }, { "id": 44, "name": "Soy" }, { "id": 45, "name": "Gluten (Wheat, Oats, Rye, Barley)" }, { "id": 46, "name": "Wheat" }, { "id": 47, "name": "Milk & Milk products" }, { "id": 48, "name": "Seafood" }, { "id": 49, "name": "Prashi Test" }, { "id": 50, "name": "Sago " }, { "id": 51, "name": "Sesame Seeds " }, { "id": 52, "name": "Soy Lecithin" }, { "id": 53, "name": "Egg Yolk" }, { "id": 54, "name": "Sunflower Seeds" }, { "id": 55, "name": "Masoor Dal" }, { "id": 56, "name": "Asafoetida (Hing)" }, { "id": 57, "name": "Pumpkin" }, { "id": 58, "name": "Banana" }, { "id": 59, "name": "Tomato" }, { "id": 60, "name": "Red Chilli" }, { "id": 61, "name": "Fish" }, { "id": 62, "name": "Citrus Fruits" }, { "id": 63, "name": "Lemon" }, { "id": 64, "name": "Wine" }, { "id": 65, "name": "Pecan" }, { "id": 66, "name": "Caffeine" }, { "id": 67, "name": "Cocoa" }, { "id": 68, "name": "Curd and Buttermilk" }, { "id": 69, "name": "Lady's Finger" }, { "id": 70, "name": "Turmeric" }, { "id": 71, "name": "Macadamia Nuts" }, { "id": 72, "name": "Curd And Buttermilk" }, { "id": 73, "name": "Mushroom" }, { "id": 74, "name": "Sunflower Seed" }, { "id": 75, "name": "Dairy Products" }],
        MEALTYPES:
            [{ "id": 40, "name": "During Workout" }, { "id": 41, "name": "Snack" }, { "id": 42, "name": "Bed Time" }, { "id": 43, "name": "Mid Meals" }, { "id": 44, "name": "Sweet" }, { "id": 45, "name": "Mid morning meal" }, { "id": 46, "name": "Bedtime" }, { "id": 47, "name": "evening meal" }, { "id": 48, "name": "All Day Food/Snacks" }, { "id": 49, "name": "Lunch" }, { "id": 50, "name": "Breakfast" }, { "id": 51, "name": "Dinner" }, { "id": 52, "name": "Pre Workout " }, { "id": 53, "name": "Early Morning" }, { "id": 54, "name": "Post Workout" }],
        COUNTRIES: [
            { name: 'Afghanistan', code: 'AF' },
            { name: 'Åland Islands', code: 'AX' },
            { name: 'Albania', code: 'AL' },
            { name: 'Algeria', code: 'DZ' },
            { name: 'American Samoa', code: 'AS' },
            { name: 'AndorrA', code: 'AD' },
            { name: 'Angola', code: 'AO' },
            { name: 'Anguilla', code: 'AI' },
            { name: 'Antarctica', code: 'AQ' },
            { name: 'Antigua and Barbuda', code: 'AG' },
            { name: 'Argentina', code: 'AR' },
            { name: 'Armenia', code: 'AM' },
            { name: 'Aruba', code: 'AW' },
            { name: 'Australia', code: 'AU' },
            { name: 'Austria', code: 'AT' },
            { name: 'Azerbaijan', code: 'AZ' },
            { name: 'Bahamas', code: 'BS' },
            { name: 'Bahrain', code: 'BH' },
            { name: 'Bangladesh', code: 'BD' },
            { name: 'Barbados', code: 'BB' },
            { name: 'Belarus', code: 'BY' },
            { name: 'Belgium', code: 'BE' },
            { name: 'Belize', code: 'BZ' },
            { name: 'Benin', code: 'BJ' },
            { name: 'Bermuda', code: 'BM' },
            { name: 'Bhutan', code: 'BT' },
            { name: 'Bolivia', code: 'BO' },
            { name: 'Bosnia and Herzegovina', code: 'BA' },
            { name: 'Botswana', code: 'BW' },
            { name: 'Bouvet Island', code: 'BV' },
            { name: 'Brazil', code: 'BR' },
            { name: 'British Indian Ocean Territory', code: 'IO' },
            { name: 'Brunei Darussalam', code: 'BN' },
            { name: 'Bulgaria', code: 'BG' },
            { name: 'Burkina Faso', code: 'BF' },
            { name: 'Burundi', code: 'BI' },
            { name: 'Cambodia', code: 'KH' },
            { name: 'Cameroon', code: 'CM' },
            { name: 'Canada', code: 'CA' },
            { name: 'Cape Verde', code: 'CV' },
            { name: 'Cayman Islands', code: 'KY' },
            { name: 'Central African Republic', code: 'CF' },
            { name: 'Chad', code: 'TD' },
            { name: 'Chile', code: 'CL' },
            { name: 'China', code: 'CN' },
            { name: 'Christmas Island', code: 'CX' },
            { name: 'Cocos (Keeling) Islands', code: 'CC' },
            { name: 'Colombia', code: 'CO' },
            { name: 'Comoros', code: 'KM' },
            { name: 'Congo', code: 'CG' },
            { name: 'Congo, The Democratic Republic of the', code: 'CD' },
            { name: 'Cook Islands', code: 'CK' },
            { name: 'Costa Rica', code: 'CR' },
            { name: 'Cote D\'Ivoire', code: 'CI' },
            { name: 'Croatia', code: 'HR' },
            { name: 'Cuba', code: 'CU' },
            { name: 'Cyprus', code: 'CY' },
            { name: 'Czech Republic', code: 'CZ' },
            { name: 'Denmark', code: 'DK' },
            { name: 'Djibouti', code: 'DJ' },
            { name: 'Dominica', code: 'DM' },
            { name: 'Dominican Republic', code: 'DO' },
            { name: 'Ecuador', code: 'EC' },
            { name: 'Egypt', code: 'EG' },
            { name: 'El Salvador', code: 'SV' },
            { name: 'Equatorial Guinea', code: 'GQ' },
            { name: 'Eritrea', code: 'ER' },
            { name: 'Estonia', code: 'EE' },
            { name: 'Ethiopia', code: 'ET' },
            { name: 'Falkland Islands (Malvinas)', code: 'FK' },
            { name: 'Faroe Islands', code: 'FO' },
            { name: 'Fiji', code: 'FJ' },
            { name: 'Finland', code: 'FI' },
            { name: 'France', code: 'FR' },
            { name: 'French Guiana', code: 'GF' },
            { name: 'French Polynesia', code: 'PF' },
            { name: 'French Southern Territories', code: 'TF' },
            { name: 'Gabon', code: 'GA' },
            { name: 'Gambia', code: 'GM' },
            { name: 'Georgia', code: 'GE' },
            { name: 'Germany', code: 'DE' },
            { name: 'Ghana', code: 'GH' },
            { name: 'Gibraltar', code: 'GI' },
            { name: 'Greece', code: 'GR' },
            { name: 'Greenland', code: 'GL' },
            { name: 'Grenada', code: 'GD' },
            { name: 'Guadeloupe', code: 'GP' },
            { name: 'Guam', code: 'GU' },
            { name: 'Guatemala', code: 'GT' },
            { name: 'Guernsey', code: 'GG' },
            { name: 'Guinea', code: 'GN' },
            { name: 'Guinea-Bissau', code: 'GW' },
            { name: 'Guyana', code: 'GY' },
            { name: 'Haiti', code: 'HT' },
            { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
            { name: 'Holy See (Vatican City State)', code: 'VA' },
            { name: 'Honduras', code: 'HN' },
            { name: 'Hong Kong', code: 'HK' },
            { name: 'Hungary', code: 'HU' },
            { name: 'Iceland', code: 'IS' },
            { name: 'India', code: 'IN' },
            { name: 'Indonesia', code: 'ID' },
            { name: 'Iran, Islamic Republic Of', code: 'IR' },
            { name: 'Iraq', code: 'IQ' },
            { name: 'Ireland', code: 'IE' },
            { name: 'Isle of Man', code: 'IM' },
            { name: 'Israel', code: 'IL' },
            { name: 'Italy', code: 'IT' },
            { name: 'Jamaica', code: 'JM' },
            { name: 'Japan', code: 'JP' },
            { name: 'Jersey', code: 'JE' },
            { name: 'Jordan', code: 'JO' },
            { name: 'Kazakhstan', code: 'KZ' },
            { name: 'Kenya', code: 'KE' },
            { name: 'Kiribati', code: 'KI' },
            { name: 'Korea, Democratic People\'S Republic of', code: 'KP' },
            { name: 'Korea, Republic of', code: 'KR' },
            { name: 'Kuwait', code: 'KW' },
            { name: 'Kyrgyzstan', code: 'KG' },
            { name: 'Lao People\'S Democratic Republic', code: 'LA' },
            { name: 'Latvia', code: 'LV' },
            { name: 'Lebanon', code: 'LB' },
            { name: 'Lesotho', code: 'LS' },
            { name: 'Liberia', code: 'LR' },
            { name: 'Libyan Arab Jamahiriya', code: 'LY' },
            { name: 'Liechtenstein', code: 'LI' },
            { name: 'Lithuania', code: 'LT' },
            { name: 'Luxembourg', code: 'LU' },
            { name: 'Macao', code: 'MO' },
            { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
            { name: 'Madagascar', code: 'MG' },
            { name: 'Malawi', code: 'MW' },
            { name: 'Malaysia', code: 'MY' },
            { name: 'Maldives', code: 'MV' },
            { name: 'Mali', code: 'ML' },
            { name: 'Malta', code: 'MT' },
            { name: 'Marshall Islands', code: 'MH' },
            { name: 'Martinique', code: 'MQ' },
            { name: 'Mauritania', code: 'MR' },
            { name: 'Mauritius', code: 'MU' },
            { name: 'Mayotte', code: 'YT' },
            { name: 'Mexico', code: 'MX' },
            { name: 'Micronesia, Federated States of', code: 'FM' },
            { name: 'Moldova, Republic of', code: 'MD' },
            { name: 'Monaco', code: 'MC' },
            { name: 'Mongolia', code: 'MN' },
            { name: 'Montserrat', code: 'MS' },
            { name: 'Morocco', code: 'MA' },
            { name: 'Mozambique', code: 'MZ' },
            { name: 'Myanmar', code: 'MM' },
            { name: 'Namibia', code: 'NA' },
            { name: 'Nauru', code: 'NR' },
            { name: 'Nepal', code: 'NP' },
            { name: 'Netherlands', code: 'NL' },
            { name: 'Netherlands Antilles', code: 'AN' },
            { name: 'New Caledonia', code: 'NC' },
            { name: 'New Zealand', code: 'NZ' },
            { name: 'Nicaragua', code: 'NI' },
            { name: 'Niger', code: 'NE' },
            { name: 'Nigeria', code: 'NG' },
            { name: 'Niue', code: 'NU' },
            { name: 'Norfolk Island', code: 'NF' },
            { name: 'Northern Mariana Islands', code: 'MP' },
            { name: 'Norway', code: 'NO' },
            { name: 'Oman', code: 'OM' },
            { name: 'Pakistan', code: 'PK' },
            { name: 'Palau', code: 'PW' },
            { name: 'Palestinian Territory, Occupied', code: 'PS' },
            { name: 'Panama', code: 'PA' },
            { name: 'Papua New Guinea', code: 'PG' },
            { name: 'Paraguay', code: 'PY' },
            { name: 'Peru', code: 'PE' },
            { name: 'Philippines', code: 'PH' },
            { name: 'Pitcairn', code: 'PN' },
            { name: 'Poland', code: 'PL' },
            { name: 'Portugal', code: 'PT' },
            { name: 'Puerto Rico', code: 'PR' },
            { name: 'Qatar', code: 'QA' },
            { name: 'Reunion', code: 'RE' },
            { name: 'Romania', code: 'RO' },
            { name: 'Russian Federation', code: 'RU' },
            { name: 'RWANDA', code: 'RW' },
            { name: 'Saint Helena', code: 'SH' },
            { name: 'Saint Kitts and Nevis', code: 'KN' },
            { name: 'Saint Lucia', code: 'LC' },
            { name: 'Saint Pierre and Miquelon', code: 'PM' },
            { name: 'Saint Vincent and the Grenadines', code: 'VC' },
            { name: 'Samoa', code: 'WS' },
            { name: 'San Marino', code: 'SM' },
            { name: 'Sao Tome and Principe', code: 'ST' },
            { name: 'Saudi Arabia', code: 'SA' },
            { name: 'Senegal', code: 'SN' },
            { name: 'Serbia and Montenegro', code: 'CS' },
            { name: 'Seychelles', code: 'SC' },
            { name: 'Sierra Leone', code: 'SL' },
            { name: 'Singapore', code: 'SG' },
            { name: 'Slovakia', code: 'SK' },
            { name: 'Slovenia', code: 'SI' },
            { name: 'Solomon Islands', code: 'SB' },
            { name: 'Somalia', code: 'SO' },
            { name: 'South Africa', code: 'ZA' },
            { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
            { name: 'Spain', code: 'ES' },
            { name: 'Sri Lanka', code: 'LK' },
            { name: 'Sudan', code: 'SD' },
            { name: 'Suriname', code: 'SR' },
            { name: 'Svalbard and Jan Mayen', code: 'SJ' },
            { name: 'Swaziland', code: 'SZ' },
            { name: 'Sweden', code: 'SE' },
            { name: 'Switzerland', code: 'CH' },
            { name: 'Syrian Arab Republic', code: 'SY' },
            { name: 'Taiwan, Province of China', code: 'TW' },
            { name: 'Tajikistan', code: 'TJ' },
            { name: 'Tanzania, United Republic of', code: 'TZ' },
            { name: 'Thailand', code: 'TH' },
            { name: 'Timor-Leste', code: 'TL' },
            { name: 'Togo', code: 'TG' },
            { name: 'Tokelau', code: 'TK' },
            { name: 'Tonga', code: 'TO' },
            { name: 'Trinidad and Tobago', code: 'TT' },
            { name: 'Tunisia', code: 'TN' },
            { name: 'Turkey', code: 'TR' },
            { name: 'Turkmenistan', code: 'TM' },
            { name: 'Turks and Caicos Islands', code: 'TC' },
            { name: 'Tuvalu', code: 'TV' },
            { name: 'Uganda', code: 'UG' },
            { name: 'Ukraine', code: 'UA' },
            { name: 'United Arab Emirates', code: 'AE' },
            { name: 'United Kingdom', code: 'GB' },
            { name: 'United States', code: 'US' },
            { name: 'United States Minor Outlying Islands', code: 'UM' },
            { name: 'Uruguay', code: 'UY' },
            { name: 'Uzbekistan', code: 'UZ' },
            { name: 'Vanuatu', code: 'VU' },
            { name: 'Venezuela', code: 'VE' },
            { name: 'Viet Nam', code: 'VN' },
            { name: 'Virgin Islands, British', code: 'VG' },
            { name: 'Virgin Islands, U.S.', code: 'VI' },
            { name: 'Wallis and Futuna', code: 'WF' },
            { name: 'Western Sahara', code: 'EH' },
            { name: 'Yemen', code: 'YE' },
            { name: 'Zambia', code: 'ZM' },
            { name: 'Zimbabwe', code: 'ZW' }
        ]
    },
    production: {
        name: 'production',
        apiUrl: 'https://restoz.herokuapp.com/',
        CONTENT_STATUS: { 1: "Published", 2: "Draft", 3: "Discarded" },
        POST_TYPES: [{ id: 1, name: "Blog" }, { id: 3, name: "Press" }],
        META_DESCRIPTION: 'Restaurants, Food Brands & Manufacturers, Meal Plan Companies, Cloud Kitchens use NutriCal to manage recipes & menus, calculate calories, create nutrition labels, conduct food costing & much more.',
        CURRENCY: {
            'AED': 'United Arab Emirates Dirham',
            'AFN': 'Afghan Afghani',
            'ALL': 'Albanian Lek',
            'AMD': 'Armenian Dram',
            'ANG': 'Netherlands Antillean Guilder',
            'AOA': 'Angolan Kwanza',
            'ARS': 'Argentine Peso',
            'AUD': 'Australian Dollar',
            'AWG': 'Aruban Florin',
            'AZN': 'Azerbaijani Manat',
            'BAM': 'Bosnia-Herzegovina Convertible Mark',
            'BBD': 'Barbadian Dollar',
            'BDT': 'Bangladeshi Taka',
            'BGN': 'Bulgarian Lev',
            'BHD': 'Bahraini Dinar',
            'BIF': 'Burundian Franc',
            'BMD': 'Bermudan Dollar',
            'BND': 'Brunei Dollar',
            'BOB': 'Bolivian Boliviano',
            'BRL': 'Brazilian Real',
            'BSD': 'Bahamian Dollar',
            'BTC': 'Bitcoin',
            'BTN': 'Bhutanese Ngultrum',
            'BWP': 'Botswanan Pula',
            'BYN': 'Belarusian Ruble',
            'BZD': 'Belize Dollar',
            'CAD': 'Canadian Dollar',
            'CDF': 'Congolese Franc',
            'CHF': 'Swiss Franc',
            'CLF': 'Chilean Unit of Account (UF)',
            'CLP': 'Chilean Peso',
            'CNH': 'Chinese Yuan (Offshore)',
            'CNY': 'Chinese Yuan',
            'COP': 'Colombian Peso',
            'CRC': 'Costa Rican Colón',
            'CUC': 'Cuban Convertible Peso',
            'CUP': 'Cuban Peso',
            'CVE': 'Cape Verdean Escudo',
            'CZK': 'Czech Republic Koruna',
            'DJF': 'Djiboutian Franc',
            'DKK': 'Danish Krone',
            'DOP': 'Dominican Peso',
            'DZD': 'Algerian Dinar',
            'EGP': 'Egyptian Pound',
            'ERN': 'Eritrean Nakfa',
            'ETB': 'Ethiopian Birr',
            'EUR': 'Euro',
            'FJD': 'Fijian Dollar',
            'FKP': 'Falkland Islands Pound',
            'GBP': 'British Pound Sterling',
            'GEL': 'Georgian Lari',
            'GGP': 'Guernsey Pound',
            'GHS': 'Ghanaian Cedi',
            'GIP': 'Gibraltar Pound',
            'GMD': 'Gambian Dalasi',
            'GNF': 'Guinean Franc',
            'GTQ': 'Guatemalan Quetzal',
            'GYD': 'Guyanaese Dollar',
            'HKD': 'Hong Kong Dollar',
            'HNL': 'Honduran Lempira',
            'HRK': 'Croatian Kuna',
            'HTG': 'Haitian Gourde',
            'HUF': 'Hungarian Forint',
            'IDR': 'Indonesian Rupiah',
            'ILS': 'Israeli New Sheqel',
            'IMP': 'Manx pound',
            'INR': 'Indian Rupee',
            'IQD': 'Iraqi Dinar',
            'IRR': 'Iranian Rial',
            'ISK': 'Icelandic Króna',
            'JEP': 'Jersey Pound',
            'JMD': 'Jamaican Dollar',
            'JOD': 'Jordanian Dinar',
            'JPY': 'Japanese Yen',
            'KES': 'Kenyan Shilling',
            'KGS': 'Kyrgystani Som',
            'KHR': 'Cambodian Riel',
            'KMF': 'Comorian Franc',
            'KPW': 'North Korean Won',
            'KRW': 'South Korean Won',
            'KWD': 'Kuwaiti Dinar',
            'KYD': 'Cayman Islands Dollar',
            'KZT': 'Kazakhstani Tenge',
            'LAK': 'Laotian Kip',
            'LBP': 'Lebanese Pound',
            'LKR': 'Sri Lankan Rupee',
            'LRD': 'Liberian Dollar',
            'LSL': 'Lesotho Loti',
            'LYD': 'Libyan Dinar',
            'MAD': 'Moroccan Dirham',
            'MDL': 'Moldovan Leu',
            'MGA': 'Malagasy Ariary',
            'MKD': 'Macedonian Denar',
            'MMK': 'Myanma Kyat',
            'MNT': 'Mongolian Tugrik',
            'MOP': 'Macanese Pataca',
            'MRO': 'Mauritanian Ouguiya (pre-2018)',
            'MRU': 'Mauritanian Ouguiya',
            'MUR': 'Mauritian Rupee',
            'MVR': 'Maldivian Rufiyaa',
            'MWK': 'Malawian Kwacha',
            'MXN': 'Mexican Peso',
            'MYR': 'Malaysian Ringgit',
            'MZN': 'Mozambican Metical',
            'NAD': 'Namibian Dollar',
            'NGN': 'Nigerian Naira',
            'NIO': 'Nicaraguan Córdoba',
            'NOK': 'Norwegian Krone',
            'NPR': 'Nepalese Rupee',
            'NZD': 'New Zealand Dollar',
            'OMR': 'Omani Rial',
            'PAB': 'Panamanian Balboa',
            'PEN': 'Peruvian Nuevo Sol',
            'PGK': 'Papua New Guinean Kina',
            'PHP': 'Philippine Peso',
            'PKR': 'Pakistani Rupee',
            'PLN': 'Polish Zloty',
            'PYG': 'Paraguayan Guarani',
            'QAR': 'Qatari Rial',
            'RON': 'Romanian Leu',
            'RSD': 'Serbian Dinar',
            'RUB': 'Russian Ruble',
            'RWF': 'Rwandan Franc',
            'SAR': 'Saudi Riyal',
            'SBD': 'Solomon Islands Dollar',
            'SCR': 'Seychellois Rupee',
            'SDG': 'Sudanese Pound',
            'SEK': 'Swedish Krona',
            'SGD': 'Singapore Dollar',
            'SHP': 'Saint Helena Pound',
            'SLL': 'Sierra Leonean Leone',
            'SOS': 'Somali Shilling',
            'SRD': 'Surinamese Dollar',
            'SSP': 'South Sudanese Pound',
            'STD': 'São Tomé and Príncipe Dobra (pre-2018)',
            'STN': 'São Tomé and Príncipe Dobra',
            'SVC': 'Salvadoran Colón',
            'SYP': 'Syrian Pound',
            'SZL': 'Swazi Lilangeni',
            'THB': 'Thai Baht',
            'TJS': 'Tajikistani Somoni',
            'TMT': 'Turkmenistani Manat',
            'TND': 'Tunisian Dinar',
            'TOP': 'Tongan Pa\'anga',
            'TRY': 'Turkish Lira',
            'TTD': 'Trinidad and Tobago Dollar',
            'TWD': 'New Taiwan Dollar',
            'TZS': 'Tanzanian Shilling',
            'UAH': 'Ukrainian Hryvnia',
            'UGX': 'Ugandan Shilling',
            'USD': 'United States Dollar',
            'UYU': 'Uruguayan Peso',
            'UZS': 'Uzbekistan Som',
            'VEF': 'Venezuelan Bolívar Fuerte (Old)',
            'VES': 'Venezuelan Bolívar Soberano',
            'VND': 'Vietnamese Dong',
            'VUV': 'Vanuatu Vatu',
            'WST': 'Samoan Tala',
            'XAF': 'CFA Franc BEAC',
            'XAG': 'Silver Ounce',
            'XAU': 'Gold Ounce',
            'XCD': 'East Caribbean Dollar',
            'XDR': 'Special Drawing Rights',
            'XOF': 'CFA Franc BCEAO',
            'XPD': 'Palladium Ounce',
            'XPF': 'CFP Franc',
            'XPT': 'Platinum Ounce',
            'YER': 'Yemeni Rial',
            'ZAR': 'South African Rand',
            'ZMW': 'Zambian Kwacha',
            'ZWL': 'Zimbabwean Dollar'
        },
        ALLERGIES:
            [{ "id": 1, "name": "Brinjal" }, { "id": 2, "name": "Celery" }, { "id": 3, "name": "Crab" }, { "id": 4, "name": "Mushrooms" }, { "id": 5, "name": "Cashew Nut" }, { "id": 6, "name": "Almond" }, { "id": 7, "name": "Chickpea Flour (Besan) " }, { "id": 8, "name": "Poppy Seeds" }, { "id": 9, "name": "Peanuts" }, { "id": 10, "name": "Walnut" }, { "id": 11, "name": "Sesame Seeds" }, { "id": 12, "name": "Hazelnut" }, { "id": 13, "name": "Food Colors" }, { "id": 14, "name": "Pistachio" }, { "id": 15, "name": "Litchee" }, { "id": 16, "name": "Kiwi" }, { "id": 17, "name": "Coconut Water" }, { "id": 18, "name": "Strawberry" }, { "id": 19, "name": "Sago" }, { "id": 20, "name": "Cucumber" }, { "id": 21, "name": "Pine Nut" }, { "id": 22, "name": "Black Pepper" }, { "id": 23, "name": "Pineapple" }, { "id": 24, "name": "Mustard" }, { "id": 25, "name": "Buckwheat" }, { "id": 26, "name": "Squid" }, { "id": 27, "name": "Coconut" }, { "id": 28, "name": "Monosodium Glutamate (MSG)" }, { "id": 29, "name": "Sulpha Drugs (Sulphur Dioxide & Sulphites)" }, { "id": 30, "name": "Red Meat" }, { "id": 31, "name": "Cheese" }, { "id": 32, "name": "Garlic" }, { "id": 33, "name": "Sea Foods" }, { "id": 34, "name": "Yeast" }, { "id": 35, "name": "Food Additives" }, { "id": 36, "name": "Egg" }, { "id": 37, "name": "Poultry Meat" }, { "id": 38, "name": "Not Allergic" }, { "id": 39, "name": "Cow Milk Protein" }, { "id": 40, "name": "Tree Nut" }, { "id": 41, "name": "Corn" }, { "id": 42, "name": "Lactose" }, { "id": 43, "name": "Shell Fish" }, { "id": 44, "name": "Soy" }, { "id": 45, "name": "Gluten (Wheat, Oats, Rye, Barley)" }, { "id": 46, "name": "Wheat" }, { "id": 47, "name": "Milk & Milk products" }, { "id": 48, "name": "Seafood" }, { "id": 49, "name": "Prashi Test" }, { "id": 50, "name": "Sago " }, { "id": 51, "name": "Sesame Seeds " }, { "id": 52, "name": "Soy Lecithin" }, { "id": 53, "name": "Egg Yolk" }, { "id": 54, "name": "Sunflower Seeds" }, { "id": 55, "name": "Masoor Dal" }, { "id": 56, "name": "Asafoetida (Hing)" }, { "id": 57, "name": "Pumpkin" }, { "id": 58, "name": "Banana" }, { "id": 59, "name": "Tomato" }, { "id": 60, "name": "Red Chilli" }, { "id": 61, "name": "Fish" }, { "id": 62, "name": "Citrus Fruits" }, { "id": 63, "name": "Lemon" }, { "id": 64, "name": "Wine" }, { "id": 65, "name": "Pecan" }, { "id": 66, "name": "Caffeine" }, { "id": 67, "name": "Cocoa" }, { "id": 68, "name": "Curd and Buttermilk" }, { "id": 69, "name": "Lady's Finger" }, { "id": 70, "name": "Turmeric" }, { "id": 71, "name": "Macadamia Nuts" }, { "id": 72, "name": "Curd And Buttermilk" }, { "id": 73, "name": "Mushroom" }, { "id": 74, "name": "Sunflower Seed" }, { "id": 75, "name": "Dairy Products" }],
        MEALTYPES:
            [{ "id": 40, "name": "During Workout" }, { "id": 41, "name": "Snack" }, { "id": 42, "name": "Bed Time" }, { "id": 43, "name": "Mid Meals" }, { "id": 44, "name": "Sweet" }, { "id": 45, "name": "Mid morning meal" }, { "id": 46, "name": "Bedtime" }, { "id": 47, "name": "evening meal" }, { "id": 48, "name": "All Day Food/Snacks" }, { "id": 49, "name": "Lunch" }, { "id": 50, "name": "Breakfast" }, { "id": 51, "name": "Dinner" }, { "id": 52, "name": "Pre Workout " }, { "id": 53, "name": "Early Morning" }, { "id": 54, "name": "Post Workout" }],
        COUNTRIES: [
            { name: 'Afghanistan', code: 'AF' },
            { name: 'Åland Islands', code: 'AX' },
            { name: 'Albania', code: 'AL' },
            { name: 'Algeria', code: 'DZ' },
            { name: 'American Samoa', code: 'AS' },
            { name: 'AndorrA', code: 'AD' },
            { name: 'Angola', code: 'AO' },
            { name: 'Anguilla', code: 'AI' },
            { name: 'Antarctica', code: 'AQ' },
            { name: 'Antigua and Barbuda', code: 'AG' },
            { name: 'Argentina', code: 'AR' },
            { name: 'Armenia', code: 'AM' },
            { name: 'Aruba', code: 'AW' },
            { name: 'Australia', code: 'AU' },
            { name: 'Austria', code: 'AT' },
            { name: 'Azerbaijan', code: 'AZ' },
            { name: 'Bahamas', code: 'BS' },
            { name: 'Bahrain', code: 'BH' },
            { name: 'Bangladesh', code: 'BD' },
            { name: 'Barbados', code: 'BB' },
            { name: 'Belarus', code: 'BY' },
            { name: 'Belgium', code: 'BE' },
            { name: 'Belize', code: 'BZ' },
            { name: 'Benin', code: 'BJ' },
            { name: 'Bermuda', code: 'BM' },
            { name: 'Bhutan', code: 'BT' },
            { name: 'Bolivia', code: 'BO' },
            { name: 'Bosnia and Herzegovina', code: 'BA' },
            { name: 'Botswana', code: 'BW' },
            { name: 'Bouvet Island', code: 'BV' },
            { name: 'Brazil', code: 'BR' },
            { name: 'British Indian Ocean Territory', code: 'IO' },
            { name: 'Brunei Darussalam', code: 'BN' },
            { name: 'Bulgaria', code: 'BG' },
            { name: 'Burkina Faso', code: 'BF' },
            { name: 'Burundi', code: 'BI' },
            { name: 'Cambodia', code: 'KH' },
            { name: 'Cameroon', code: 'CM' },
            { name: 'Canada', code: 'CA' },
            { name: 'Cape Verde', code: 'CV' },
            { name: 'Cayman Islands', code: 'KY' },
            { name: 'Central African Republic', code: 'CF' },
            { name: 'Chad', code: 'TD' },
            { name: 'Chile', code: 'CL' },
            { name: 'China', code: 'CN' },
            { name: 'Christmas Island', code: 'CX' },
            { name: 'Cocos (Keeling) Islands', code: 'CC' },
            { name: 'Colombia', code: 'CO' },
            { name: 'Comoros', code: 'KM' },
            { name: 'Congo', code: 'CG' },
            { name: 'Congo, The Democratic Republic of the', code: 'CD' },
            { name: 'Cook Islands', code: 'CK' },
            { name: 'Costa Rica', code: 'CR' },
            { name: 'Cote D\'Ivoire', code: 'CI' },
            { name: 'Croatia', code: 'HR' },
            { name: 'Cuba', code: 'CU' },
            { name: 'Cyprus', code: 'CY' },
            { name: 'Czech Republic', code: 'CZ' },
            { name: 'Denmark', code: 'DK' },
            { name: 'Djibouti', code: 'DJ' },
            { name: 'Dominica', code: 'DM' },
            { name: 'Dominican Republic', code: 'DO' },
            { name: 'Ecuador', code: 'EC' },
            { name: 'Egypt', code: 'EG' },
            { name: 'El Salvador', code: 'SV' },
            { name: 'Equatorial Guinea', code: 'GQ' },
            { name: 'Eritrea', code: 'ER' },
            { name: 'Estonia', code: 'EE' },
            { name: 'Ethiopia', code: 'ET' },
            { name: 'Falkland Islands (Malvinas)', code: 'FK' },
            { name: 'Faroe Islands', code: 'FO' },
            { name: 'Fiji', code: 'FJ' },
            { name: 'Finland', code: 'FI' },
            { name: 'France', code: 'FR' },
            { name: 'French Guiana', code: 'GF' },
            { name: 'French Polynesia', code: 'PF' },
            { name: 'French Southern Territories', code: 'TF' },
            { name: 'Gabon', code: 'GA' },
            { name: 'Gambia', code: 'GM' },
            { name: 'Georgia', code: 'GE' },
            { name: 'Germany', code: 'DE' },
            { name: 'Ghana', code: 'GH' },
            { name: 'Gibraltar', code: 'GI' },
            { name: 'Greece', code: 'GR' },
            { name: 'Greenland', code: 'GL' },
            { name: 'Grenada', code: 'GD' },
            { name: 'Guadeloupe', code: 'GP' },
            { name: 'Guam', code: 'GU' },
            { name: 'Guatemala', code: 'GT' },
            { name: 'Guernsey', code: 'GG' },
            { name: 'Guinea', code: 'GN' },
            { name: 'Guinea-Bissau', code: 'GW' },
            { name: 'Guyana', code: 'GY' },
            { name: 'Haiti', code: 'HT' },
            { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
            { name: 'Holy See (Vatican City State)', code: 'VA' },
            { name: 'Honduras', code: 'HN' },
            { name: 'Hong Kong', code: 'HK' },
            { name: 'Hungary', code: 'HU' },
            { name: 'Iceland', code: 'IS' },
            { name: 'India', code: 'IN' },
            { name: 'Indonesia', code: 'ID' },
            { name: 'Iran, Islamic Republic Of', code: 'IR' },
            { name: 'Iraq', code: 'IQ' },
            { name: 'Ireland', code: 'IE' },
            { name: 'Isle of Man', code: 'IM' },
            { name: 'Israel', code: 'IL' },
            { name: 'Italy', code: 'IT' },
            { name: 'Jamaica', code: 'JM' },
            { name: 'Japan', code: 'JP' },
            { name: 'Jersey', code: 'JE' },
            { name: 'Jordan', code: 'JO' },
            { name: 'Kazakhstan', code: 'KZ' },
            { name: 'Kenya', code: 'KE' },
            { name: 'Kiribati', code: 'KI' },
            { name: 'Korea, Democratic People\'S Republic of', code: 'KP' },
            { name: 'Korea, Republic of', code: 'KR' },
            { name: 'Kuwait', code: 'KW' },
            { name: 'Kyrgyzstan', code: 'KG' },
            { name: 'Lao People\'S Democratic Republic', code: 'LA' },
            { name: 'Latvia', code: 'LV' },
            { name: 'Lebanon', code: 'LB' },
            { name: 'Lesotho', code: 'LS' },
            { name: 'Liberia', code: 'LR' },
            { name: 'Libyan Arab Jamahiriya', code: 'LY' },
            { name: 'Liechtenstein', code: 'LI' },
            { name: 'Lithuania', code: 'LT' },
            { name: 'Luxembourg', code: 'LU' },
            { name: 'Macao', code: 'MO' },
            { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
            { name: 'Madagascar', code: 'MG' },
            { name: 'Malawi', code: 'MW' },
            { name: 'Malaysia', code: 'MY' },
            { name: 'Maldives', code: 'MV' },
            { name: 'Mali', code: 'ML' },
            { name: 'Malta', code: 'MT' },
            { name: 'Marshall Islands', code: 'MH' },
            { name: 'Martinique', code: 'MQ' },
            { name: 'Mauritania', code: 'MR' },
            { name: 'Mauritius', code: 'MU' },
            { name: 'Mayotte', code: 'YT' },
            { name: 'Mexico', code: 'MX' },
            { name: 'Micronesia, Federated States of', code: 'FM' },
            { name: 'Moldova, Republic of', code: 'MD' },
            { name: 'Monaco', code: 'MC' },
            { name: 'Mongolia', code: 'MN' },
            { name: 'Montserrat', code: 'MS' },
            { name: 'Morocco', code: 'MA' },
            { name: 'Mozambique', code: 'MZ' },
            { name: 'Myanmar', code: 'MM' },
            { name: 'Namibia', code: 'NA' },
            { name: 'Nauru', code: 'NR' },
            { name: 'Nepal', code: 'NP' },
            { name: 'Netherlands', code: 'NL' },
            { name: 'Netherlands Antilles', code: 'AN' },
            { name: 'New Caledonia', code: 'NC' },
            { name: 'New Zealand', code: 'NZ' },
            { name: 'Nicaragua', code: 'NI' },
            { name: 'Niger', code: 'NE' },
            { name: 'Nigeria', code: 'NG' },
            { name: 'Niue', code: 'NU' },
            { name: 'Norfolk Island', code: 'NF' },
            { name: 'Northern Mariana Islands', code: 'MP' },
            { name: 'Norway', code: 'NO' },
            { name: 'Oman', code: 'OM' },
            { name: 'Pakistan', code: 'PK' },
            { name: 'Palau', code: 'PW' },
            { name: 'Palestinian Territory, Occupied', code: 'PS' },
            { name: 'Panama', code: 'PA' },
            { name: 'Papua New Guinea', code: 'PG' },
            { name: 'Paraguay', code: 'PY' },
            { name: 'Peru', code: 'PE' },
            { name: 'Philippines', code: 'PH' },
            { name: 'Pitcairn', code: 'PN' },
            { name: 'Poland', code: 'PL' },
            { name: 'Portugal', code: 'PT' },
            { name: 'Puerto Rico', code: 'PR' },
            { name: 'Qatar', code: 'QA' },
            { name: 'Reunion', code: 'RE' },
            { name: 'Romania', code: 'RO' },
            { name: 'Russian Federation', code: 'RU' },
            { name: 'RWANDA', code: 'RW' },
            { name: 'Saint Helena', code: 'SH' },
            { name: 'Saint Kitts and Nevis', code: 'KN' },
            { name: 'Saint Lucia', code: 'LC' },
            { name: 'Saint Pierre and Miquelon', code: 'PM' },
            { name: 'Saint Vincent and the Grenadines', code: 'VC' },
            { name: 'Samoa', code: 'WS' },
            { name: 'San Marino', code: 'SM' },
            { name: 'Sao Tome and Principe', code: 'ST' },
            { name: 'Saudi Arabia', code: 'SA' },
            { name: 'Senegal', code: 'SN' },
            { name: 'Serbia and Montenegro', code: 'CS' },
            { name: 'Seychelles', code: 'SC' },
            { name: 'Sierra Leone', code: 'SL' },
            { name: 'Singapore', code: 'SG' },
            { name: 'Slovakia', code: 'SK' },
            { name: 'Slovenia', code: 'SI' },
            { name: 'Solomon Islands', code: 'SB' },
            { name: 'Somalia', code: 'SO' },
            { name: 'South Africa', code: 'ZA' },
            { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
            { name: 'Spain', code: 'ES' },
            { name: 'Sri Lanka', code: 'LK' },
            { name: 'Sudan', code: 'SD' },
            { name: 'Suriname', code: 'SR' },
            { name: 'Svalbard and Jan Mayen', code: 'SJ' },
            { name: 'Swaziland', code: 'SZ' },
            { name: 'Sweden', code: 'SE' },
            { name: 'Switzerland', code: 'CH' },
            { name: 'Syrian Arab Republic', code: 'SY' },
            { name: 'Taiwan, Province of China', code: 'TW' },
            { name: 'Tajikistan', code: 'TJ' },
            { name: 'Tanzania, United Republic of', code: 'TZ' },
            { name: 'Thailand', code: 'TH' },
            { name: 'Timor-Leste', code: 'TL' },
            { name: 'Togo', code: 'TG' },
            { name: 'Tokelau', code: 'TK' },
            { name: 'Tonga', code: 'TO' },
            { name: 'Trinidad and Tobago', code: 'TT' },
            { name: 'Tunisia', code: 'TN' },
            { name: 'Turkey', code: 'TR' },
            { name: 'Turkmenistan', code: 'TM' },
            { name: 'Turks and Caicos Islands', code: 'TC' },
            { name: 'Tuvalu', code: 'TV' },
            { name: 'Uganda', code: 'UG' },
            { name: 'Ukraine', code: 'UA' },
            { name: 'United Arab Emirates', code: 'AE' },
            { name: 'United Kingdom', code: 'GB' },
            { name: 'United States', code: 'US' },
            { name: 'United States Minor Outlying Islands', code: 'UM' },
            { name: 'Uruguay', code: 'UY' },
            { name: 'Uzbekistan', code: 'UZ' },
            { name: 'Vanuatu', code: 'VU' },
            { name: 'Venezuela', code: 'VE' },
            { name: 'Viet Nam', code: 'VN' },
            { name: 'Virgin Islands, British', code: 'VG' },
            { name: 'Virgin Islands, U.S.', code: 'VI' },
            { name: 'Wallis and Futuna', code: 'WF' },
            { name: 'Western Sahara', code: 'EH' },
            { name: 'Yemen', code: 'YE' },
            { name: 'Zambia', code: 'ZM' },
            { name: 'Zimbabwe', code: 'ZW' }]
    }
};
function generateENV() {
    var env = isProd ? envSet.production : envSet.loc;
    return src('config.json')
        .pipe(ngConstant({
            name: 'config',
            deps: isProd ? ['templates'] : [],
            constants: {
                ENV: {
                    name: env.name,
                    apiUrl: env.apiUrl,
                    CONTENT_STATUS: env.CONTENT_STATUS,
                    META_DESCRIPTION: env.META_DESCRIPTION,
                    POST_TYPES: env.POST_TYPES,
                    CURRENCY: env.CURRENCY,
                    ALLERGIES: env.ALLERGIES,
                    MEALTYPES: env.MEALTYPES,
                    COUNTRIES: env.COUNTRIES
                }
            },
            wrap: '<%= __ngModule %>'
        }))
        .pipe(dest('app/scripts/services/env', { overwrite: true }));
}

function injectBower() {
    var options = {
        bowerJson: require("./bower.json"),
        directory: 'app/components'
    };
    var target = src('app/index.html');
    return target.pipe(wiredep(options)).pipe(dest('app', { overwrite: true }));
}
function copyJs() {
    isProd = true;
    return src(['app/scripts/controllers/*.js'])
        .pipe($.if(/\.js$/, uglifyEs()))
        .pipe(dest('dist/scripts/controllers'));
}

function copyAssets() {
    return src(['app/upload/**'])
        .pipe(dest('dist/upload'));
}

function copyFonts() {
    return src('app/fonts/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe(dest('dist/fonts'));
}
function copyHtml() {
    return src(['app/views/*.html'])
        .pipe(ngtemplate({
            filename: 'templates.js',
            module: 'templates',
            htmlMinifier: {
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: { compress: { drop_console: true } },
                processConditionalComments: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            },
            path: function (path, base) {
                return path.replace(base, 'views');
            }
        }))
        .pipe(uglifyEs())
        .pipe(dest('dist/scripts', { overwrite: true }));
}
function concatTemplate() {
    return src(['dist/scripts/templates.js', 'dist/scripts/app.js'])
        .pipe($.concat('app.js'))
        .pipe(dest('dist/scripts'));
}
function styles() {
    return src('app/styles/**/*.scss', {
        sourcemaps: !isProd,
    })
        .pipe($.plumber())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.postcss([
            autoprefixer()
        ]))
        .pipe(dest('.tmp/styles', {
            sourcemaps: !isProd,
        }))
        .pipe(server.reload({ stream: true }));
}


function scripts() {
    return src('app/scripts/**/*.js', {
        sourcemaps: !isProd,
    })
        .pipe($.plumber())
        .pipe($.babel())
        .pipe(dest('.tmp/scripts', {
            sourcemaps: !isProd ? '.' : false,
        }))
        .pipe(server.reload({ stream: true }));
}
;

async function modernizr() {
    const readConfig = () => new Promise((resolve, reject) => {
        fs.readFile(`${__dirname}/modernizr.json`, 'utf8', (err, data) => {
            if (err)
                reject(err);
            resolve(JSON.parse(data));
        })
    })
    const createDir = () => new Promise((resolve, reject) => {
        mkdirp(`${__dirname}/.tmp/scripts`, err => {
            if (err)
                reject(err);
            resolve();
        })
    });
    const generateScript = config => new Promise((resolve, reject) => {
        Modernizr.build(config, content => {
            fs.writeFile(`${__dirname}/.tmp/scripts/modernizr.js`, content, err => {
                if (err)
                    reject(err);
                resolve(content);
            });
        })
    });

    const [config] = await Promise.all([
        readConfig(),
        createDir()
    ]);
    await generateScript(config);
}

const lintBase = (files, options) => {
    return src(files)
        .pipe($.eslint(options))
        .pipe(server.reload({ stream: true, once: true }))
        .pipe($.eslint.format())
        .pipe($.if(!server.active, $.eslint.failAfterError()));
}
function lint() {
    return lintBase('app/scripts/**/*.js', { fix: true })
        .pipe(dest('app/scripts'));
}

function html() {
    return src('app/*.html')
        .pipe($.useref({ searchPath: ['.tmp', 'app', '.'] }))
        .pipe($.if(/\.js$/, uglifyEs()))
        .pipe($.if(/\.css$/, $.postcss([cssnano({ safe: true, autoprefixer: false })])))
        .pipe($.if(/\.html$/, $.htmlmin({ collapseWhitespace: true, conservativeCollapse: true, minifyCSS: true, minifyJS: true })))
        .pipe(dest('dist'));
}

function images() {
    return src('app/images/**/*', { since: lastRun(images) })
        .pipe($.imagemin({
            verbose: true,
            silent: true,
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [
                {
                    removeViewBox: true
                }
            ]
        }))
        .pipe(dest('dist/images'));
}

function fonts() {
    return src('app/fonts/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe($.if(!isProd, dest('.tmp/fonts'), dest('dist/fonts')));
}

function extras() {
    return src([
        'app/*',
        '!app/*.html'
    ], {
        dot: true
    }).pipe(dest('dist'));
}

function clean() {
    return del(['.tmp', 'dist'])
}
function cleanUpDist() {
    return del(['dist/scripts/templates.js', 'dist/components', 'dist/views']);
}
function measureSize() {
    return src('dist/**/*')
        .pipe($.size({ title: 'build', gzip: true }));
}

function serviceWorker() {
    return workboxBuild.generateSW({
        cacheId: require('./bower.json').name,
        //        importWorkboxFrom: 'local',
        globDirectory: 'dist',
        globPatterns: [
            '**\/*.{js,css,jpg,png,woff,ttf,svg,eot}'
        ],
        runtimeCaching: [{
            urlPattern: new RegExp('^https://cdn\.tinymce\.com/'),
            handler: 'StaleWhileRevalidate',
            options: {
                cacheableResponse: {
                    statuses: [0, 200]
                }
            }
        }, {
            urlPattern: new RegExp('^https://fonts\.googleapis\.com/'),
            handler: 'StaleWhileRevalidate',
            options: {
                cacheableResponse: {
                    statuses: [0, 200]
                }
            }
        }],
        cleanupOutdatedCaches: true,
        directoryIndex: 'index.html',
        swDest: 'dist/service-worker.js',
        //        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 3145728
    }).then(({ count, size }) => {
        console.log(`precache ${count} files, totaling ${size} bytes.`);
    });
}


const build = series(
    clean,
    injectBower,
    copyJs,
    copyAssets,
    copyHtml,
    generateENV,
    parallel(
        lint,
        series(parallel(styles, scripts, modernizr), html, concatTemplate),
        images,
        copyFonts,
        extras
    ),
    cleanUpDist,
    serviceWorker,
    measureSize
);

function startAppServer() {
    server.init({
        notify: false,
        port,
        server: {
            baseDir: ['.tmp', 'app'],
            middleware: [
                modRewrite(['^[^\\.]*$ /index.html [L]'])
            ]
        }
    });

    watch([
        'app/{,*/}*.html',
        'app/images/**/*',
        '.tmp/fonts/**/*'
    ]).on('change', server.reload);

    watch('app/styles/**/*.scss', styles);
    watch('app/scripts/{,*/}*.js', scripts);
    watch('modernizr.json', modernizr);
    watch('app/fonts/**/*', fonts);
}

function startDistServer() {
    server.init({
        notify: false,
        port,
        server: {
            baseDir: 'dist',
            middleware: [
                modRewrite(['^[^\\.]*$ /index.html [L]'])
            ]
        }
    });
}

let serve = series(clean, injectBower, generateENV, parallel(styles, scripts, modernizr, fonts), startAppServer);
exports.serveDist = startDistServer;
exports.serve = serve;
exports.build = build;
exports.default = build;
