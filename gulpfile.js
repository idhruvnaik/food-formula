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
        apiUrl: 'https://foodformula.herokuapp.com/',
        CONTENT_STATUS: { 1: "Published", 2: "Draft", 3: "Discarded" },
        POST_TYPES: [{ id: 1, name: "Blog" }, { id: 3, name: "Press" }],
        META_DESCRIPTION: 'Restaurants use our platform to manage recipes & menus, conduct food costing & much more.',
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
        COUNTRIES: {
            'AF': 'Afghanistan',
            'AL': 'Albania',
            'DZ': 'Algeria',
            'AS': 'AmericanSamoa',
            'AD': 'Andorra',
            'AO': 'Angola',
            'AI': 'Anguilla',
            'AG': 'Antigua and Barbuda',
            'AR': 'Argentina',
            'AM': 'Armenia',
            'AW': 'Aruba',
            'AU': 'Australia',
            'AT': 'Austria',
            'AZ': 'Azerbaijan',
            'BS': 'Bahamas',
            'BH': 'Bahrain',
            'BD': 'Bangladesh',
            'BB': 'Barbados',
            'BY': 'Belarus',
            'BE': 'Belgium',
            'BZ': 'Belize',
            'BJ': 'Benin',
            'BM': 'Bermuda',
            'BT': 'Bhutan',
            'BA': 'Bosnia and Herzegovina',
            'BW': 'Botswana',
            'BR': 'Brazil',
            'IO': 'British Indian Ocean Territory',
            'BG': 'Bulgaria',
            'BF': 'Burkina Faso',
            'BI': 'Burundi',
            'KH': 'Cambodia',
            'CM': 'Cameroon',
            'CA': 'Canada',
            'CV': 'Cape Verde',
            'KY': 'Cayman Islands',
            'CF': 'Central African Republic',
            'TD': 'Chad',
            'CL': 'Chile',
            'CN': 'China',
            'CX': 'Christmas Island',
            'CO': 'Colombia',
            'KM': 'Comoros',
            'CG': 'Congo',
            'CK': 'Cook Islands',
            'CR': 'Costa Rica',
            'HR': 'Croatia',
            'CU': 'Cuba',
            'CY': 'Cyprus',
            'CZ': 'Czech Republic',
            'DK': 'Denmark',
            'DJ': 'Djibouti',
            'DM': 'Dominica',
            'DO': 'Dominican Republic',
            'EC': 'Ecuador',
            'EG': 'Egypt',
            'SV': 'El Salvador',
            'GQ': 'Equatorial Guinea',
            'ER': 'Eritrea',
            'EE': 'Estonia',
            'ET': 'Ethiopia',
            'FO': 'Faroe Islands',
            'FJ': 'Fiji',
            'FI': 'Finland',
            'FR': 'France',
            'GF': 'French Guiana',
            'PF': 'French Polynesia',
            'GA': 'Gabon',
            'GM': 'Gambia',
            'GE': 'Georgia',
            'DE': 'Germany',
            'GH': 'Ghana',
            'GI': 'Gibraltar',
            'GR': 'Greece',
            'GL': 'Greenland',
            'GD': 'Grenada',
            'GP': 'Guadeloupe',
            'GU': 'Guam',
            'GT': 'Guatemala',
            'GN': 'Guinea',
            'GW': 'Guinea-Bissau',
            'GY': 'Guyana',
            'HT': 'Haiti',
            'HN': 'Honduras',
            'HU': 'Hungary',
            'IS': 'Iceland',
            'IN': 'India',
            'ID': 'Indonesia',
            'IQ': 'Iraq',
            'IE': 'Ireland',
            'IL': 'Israel',
            'IT': 'Italy',
            'JM': 'Jamaica',
            'JP': 'Japan',
            'JO': 'Jordan',
            'KZ': 'Kazakhstan',
            'KE': 'Kenya',
            'KI': 'Kiribati',
            'KW': 'Kuwait',
            'KG': 'Kyrgyzstan',
            'LV': 'Latvia',
            'LB': 'Lebanon',
            'LS': 'Lesotho',
            'LR': 'Liberia',
            'LI': 'Liechtenstein',
            'LT': 'Lithuania',
            'LU': 'Luxembourg',
            'MG': 'Madagascar',
            'MW': 'Malawi',
            'MY': 'Malaysia',
            'MV': 'Maldives',
            'ML': 'Mali',
            'MT': 'Malta',
            'MH': 'Marshall Islands',
            'MQ': 'Martinique',
            'MR': 'Mauritania',
            'MU': 'Mauritius',
            'YT': 'Mayotte',
            'MX': 'Mexico',
            'MC': 'Monaco',
            'MN': 'Mongolia',
            'ME': 'Montenegro',
            'MS': 'Montserrat',
            'MA': 'Morocco',
            'MM': 'Myanmar',
            'NA': 'Namibia',
            'NR': 'Nauru',
            'NP': 'Nepal',
            'NL': 'Netherlands',
            'AN': 'Netherlands Antilles',
            'NC': 'New Caledonia',
            'NZ': 'New Zealand',
            'NI': 'Nicaragua',
            'NE': 'Niger',
            'NG': 'Nigeria',
            'NU': 'Niue',
            'NF': 'Norfolk Island',
            'MP': 'Northern Mariana Islands',
            'NO': 'Norway',
            'OM': 'Oman',
            'PK': 'Pakistan',
            'PW': 'Palau',
            'PA': 'Panama',
            'PG': 'Papua New Guinea',
            'PY': 'Paraguay',
            'PE': 'Peru',
            'PH': 'Philippines',
            'PL': 'Poland',
            'PT': 'Portugal',
            'PR': 'Puerto Rico',
            'QA': 'Qatar',
            'RO': 'Romania',
            'RW': 'Rwanda',
            'WS': 'Samoa',
            'SM': 'San Marino',
            'SA': 'Saudi Arabia',
            'SN': 'Senegal',
            'RS': 'Serbia',
            'SC': 'Seychelles',
            'SL': 'Sierra Leone',
            'SG': 'Singapore',
            'SK': 'Slovakia',
            'SI': 'Slovenia',
            'SB': 'Solomon Islands',
            'ZA': 'South Africa',
            'GS': 'South Georgia and the South Sandwich Islands',
            'ES': 'Spain',
            'LK': 'Sri Lanka',
            'SD': 'Sudan',
            'SR': 'Suriname',
            'SZ': 'Swaziland',
            'SE': 'Sweden',
            'CH': 'Switzerland',
            'TJ': 'Tajikistan',
            'TH': 'Thailand',
            'TG': 'Togo',
            'TK': 'Tokelau',
            'TO': 'Tonga',
            'TT': 'Trinidad and Tobago',
            'TN': 'Tunisia',
            'TR': 'Turkey',
            'TM': 'Turkmenistan',
            'TC': 'Turks and Caicos Islands',
            'TV': 'Tuvalu',
            'UG': 'Uganda',
            'UA': 'Ukraine',
            'AE': 'United Arab Emirates',
            'GB': 'United Kingdom',
            'US': 'United States',
            'UY': 'Uruguay',
            'UZ': 'Uzbekistan',
            'VU': 'Vanuatu',
            'WF': 'Wallis and Futuna',
            'YE': 'Yemen',
            'ZM': 'Zambia',
            'ZW': 'Zimbabwe',
            'AX': 'land Islands',
            'AQ': 'Antarctica',
            'BO': 'Bolivia, Plurinational State of',
            'BN': 'Brunei Darussalam',
            'CC': 'Cocos (Keeling) Islands',
            'CD': 'Congo, The Democratic Republic of the',
            'CI': 'Cote d Ivoire',
            'FK': 'Falkland Islands (Malvinas)',
            'GG': 'Guernsey',
            'VA': 'Holy See (Vatican City State)',
            'HK': 'Hong Kong',
            'IR': 'Iran, Islamic Republic of',
            'IM': 'Isle of Man',
            'JE': 'Jersey',
            'KP': 'Korea, Democratic Peoples Republic of',
            'KR': 'Korea, Republic of',
            'LA': 'Lao Peoples Democratic Republic',
            'LY': 'Libyan Arab Jamahiriya',
            'MO': 'Macao',
            'MK': 'Macedonia, The Former Yugoslav Republic of',
            'FM': 'Micronesia, Federated States of',
            'MD': 'Moldova, Republic of',
            'MZ': 'Mozambique',
            'PS': 'Palestinian Territory, Occupied',
            'PN': 'Pitcairn',
            'RE': 'Réunion',
            'RU': 'Russia',
            'BL': 'Saint Barthélemy',
            'SH': 'Saint Helena, Ascension and Tristan Da Cunha',
            'KN': 'Saint Kitts and Nevis',
            'LC': 'Saint Lucia',
            'MF': 'Saint Martin',
            'PM': 'Saint Pierre and Miquelon',
            'VC': 'Saint Vincent and the Grenadines',
            'ST': 'Sao Tome and Principe',
            'SO': 'Somalia',
            'SJ': 'Svalbard and Jan Mayen',
            'SY': 'Syrian Arab Republic',
            'TW': 'Taiwan, Province of China',
            'TZ': 'Tanzania, United Republic of',
            'TL': 'Timor-Leste',
            'VE': 'Venezuela, Bolivarian Republic of',
            'VN': 'Viet Nam',
            'VG': 'Virgin Islands, British',
            'VI': 'Virgin Islands, U.S.'
        }
    },
    production: {
        name: 'production',
        apiUrl: 'https://foodformula.herokuapp.com/',
        CONTENT_STATUS: { 1: "Published", 2: "Draft", 3: "Discarded" },
        POST_TYPES: [{ id: 1, name: "Blog" }, { id: 3, name: "Press" }],
        META_DESCRIPTION: 'Restaurants use our platform to manage recipes & menus, conduct food costing & much more.',
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
        COUNTRIES: {
            'AF': 'Afghanistan',
            'AL': 'Albania',
            'DZ': 'Algeria',
            'AS': 'AmericanSamoa',
            'AD': 'Andorra',
            'AO': 'Angola',
            'AI': 'Anguilla',
            'AG': 'Antigua and Barbuda',
            'AR': 'Argentina',
            'AM': 'Armenia',
            'AW': 'Aruba',
            'AU': 'Australia',
            'AT': 'Austria',
            'AZ': 'Azerbaijan',
            'BS': 'Bahamas',
            'BH': 'Bahrain',
            'BD': 'Bangladesh',
            'BB': 'Barbados',
            'BY': 'Belarus',
            'BE': 'Belgium',
            'BZ': 'Belize',
            'BJ': 'Benin',
            'BM': 'Bermuda',
            'BT': 'Bhutan',
            'BA': 'Bosnia and Herzegovina',
            'BW': 'Botswana',
            'BR': 'Brazil',
            'IO': 'British Indian Ocean Territory',
            'BG': 'Bulgaria',
            'BF': 'Burkina Faso',
            'BI': 'Burundi',
            'KH': 'Cambodia',
            'CM': 'Cameroon',
            'CA': 'Canada',
            'CV': 'Cape Verde',
            'KY': 'Cayman Islands',
            'CF': 'Central African Republic',
            'TD': 'Chad',
            'CL': 'Chile',
            'CN': 'China',
            'CX': 'Christmas Island',
            'CO': 'Colombia',
            'KM': 'Comoros',
            'CG': 'Congo',
            'CK': 'Cook Islands',
            'CR': 'Costa Rica',
            'HR': 'Croatia',
            'CU': 'Cuba',
            'CY': 'Cyprus',
            'CZ': 'Czech Republic',
            'DK': 'Denmark',
            'DJ': 'Djibouti',
            'DM': 'Dominica',
            'DO': 'Dominican Republic',
            'EC': 'Ecuador',
            'EG': 'Egypt',
            'SV': 'El Salvador',
            'GQ': 'Equatorial Guinea',
            'ER': 'Eritrea',
            'EE': 'Estonia',
            'ET': 'Ethiopia',
            'FO': 'Faroe Islands',
            'FJ': 'Fiji',
            'FI': 'Finland',
            'FR': 'France',
            'GF': 'French Guiana',
            'PF': 'French Polynesia',
            'GA': 'Gabon',
            'GM': 'Gambia',
            'GE': 'Georgia',
            'DE': 'Germany',
            'GH': 'Ghana',
            'GI': 'Gibraltar',
            'GR': 'Greece',
            'GL': 'Greenland',
            'GD': 'Grenada',
            'GP': 'Guadeloupe',
            'GU': 'Guam',
            'GT': 'Guatemala',
            'GN': 'Guinea',
            'GW': 'Guinea-Bissau',
            'GY': 'Guyana',
            'HT': 'Haiti',
            'HN': 'Honduras',
            'HU': 'Hungary',
            'IS': 'Iceland',
            'IN': 'India',
            'ID': 'Indonesia',
            'IQ': 'Iraq',
            'IE': 'Ireland',
            'IL': 'Israel',
            'IT': 'Italy',
            'JM': 'Jamaica',
            'JP': 'Japan',
            'JO': 'Jordan',
            'KZ': 'Kazakhstan',
            'KE': 'Kenya',
            'KI': 'Kiribati',
            'KW': 'Kuwait',
            'KG': 'Kyrgyzstan',
            'LV': 'Latvia',
            'LB': 'Lebanon',
            'LS': 'Lesotho',
            'LR': 'Liberia',
            'LI': 'Liechtenstein',
            'LT': 'Lithuania',
            'LU': 'Luxembourg',
            'MG': 'Madagascar',
            'MW': 'Malawi',
            'MY': 'Malaysia',
            'MV': 'Maldives',
            'ML': 'Mali',
            'MT': 'Malta',
            'MH': 'Marshall Islands',
            'MQ': 'Martinique',
            'MR': 'Mauritania',
            'MU': 'Mauritius',
            'YT': 'Mayotte',
            'MX': 'Mexico',
            'MC': 'Monaco',
            'MN': 'Mongolia',
            'ME': 'Montenegro',
            'MS': 'Montserrat',
            'MA': 'Morocco',
            'MM': 'Myanmar',
            'NA': 'Namibia',
            'NR': 'Nauru',
            'NP': 'Nepal',
            'NL': 'Netherlands',
            'AN': 'Netherlands Antilles',
            'NC': 'New Caledonia',
            'NZ': 'New Zealand',
            'NI': 'Nicaragua',
            'NE': 'Niger',
            'NG': 'Nigeria',
            'NU': 'Niue',
            'NF': 'Norfolk Island',
            'MP': 'Northern Mariana Islands',
            'NO': 'Norway',
            'OM': 'Oman',
            'PK': 'Pakistan',
            'PW': 'Palau',
            'PA': 'Panama',
            'PG': 'Papua New Guinea',
            'PY': 'Paraguay',
            'PE': 'Peru',
            'PH': 'Philippines',
            'PL': 'Poland',
            'PT': 'Portugal',
            'PR': 'Puerto Rico',
            'QA': 'Qatar',
            'RO': 'Romania',
            'RW': 'Rwanda',
            'WS': 'Samoa',
            'SM': 'San Marino',
            'SA': 'Saudi Arabia',
            'SN': 'Senegal',
            'RS': 'Serbia',
            'SC': 'Seychelles',
            'SL': 'Sierra Leone',
            'SG': 'Singapore',
            'SK': 'Slovakia',
            'SI': 'Slovenia',
            'SB': 'Solomon Islands',
            'ZA': 'South Africa',
            'GS': 'South Georgia and the South Sandwich Islands',
            'ES': 'Spain',
            'LK': 'Sri Lanka',
            'SD': 'Sudan',
            'SR': 'Suriname',
            'SZ': 'Swaziland',
            'SE': 'Sweden',
            'CH': 'Switzerland',
            'TJ': 'Tajikistan',
            'TH': 'Thailand',
            'TG': 'Togo',
            'TK': 'Tokelau',
            'TO': 'Tonga',
            'TT': 'Trinidad and Tobago',
            'TN': 'Tunisia',
            'TR': 'Turkey',
            'TM': 'Turkmenistan',
            'TC': 'Turks and Caicos Islands',
            'TV': 'Tuvalu',
            'UG': 'Uganda',
            'UA': 'Ukraine',
            'AE': 'United Arab Emirates',
            'GB': 'United Kingdom',
            'US': 'United States',
            'UY': 'Uruguay',
            'UZ': 'Uzbekistan',
            'VU': 'Vanuatu',
            'WF': 'Wallis and Futuna',
            'YE': 'Yemen',
            'ZM': 'Zambia',
            'ZW': 'Zimbabwe',
            'AX': 'land Islands',
            'AQ': 'Antarctica',
            'BO': 'Bolivia, Plurinational State of',
            'BN': 'Brunei Darussalam',
            'CC': 'Cocos (Keeling) Islands',
            'CD': 'Congo, The Democratic Republic of the',
            'CI': 'Cote d Ivoire',
            'FK': 'Falkland Islands (Malvinas)',
            'GG': 'Guernsey',
            'VA': 'Holy See (Vatican City State)',
            'HK': 'Hong Kong',
            'IR': 'Iran, Islamic Republic of',
            'IM': 'Isle of Man',
            'JE': 'Jersey',
            'KP': 'Korea, Democratic Peoples Republic of',
            'KR': 'Korea, Republic of',
            'LA': 'Lao Peoples Democratic Republic',
            'LY': 'Libyan Arab Jamahiriya',
            'MO': 'Macao',
            'MK': 'Macedonia, The Former Yugoslav Republic of',
            'FM': 'Micronesia, Federated States of',
            'MD': 'Moldova, Republic of',
            'MZ': 'Mozambique',
            'PS': 'Palestinian Territory, Occupied',
            'PN': 'Pitcairn',
            'RE': 'Réunion',
            'RU': 'Russia',
            'BL': 'Saint Barthélemy',
            'SH': 'Saint Helena, Ascension and Tristan Da Cunha',
            'KN': 'Saint Kitts and Nevis',
            'LC': 'Saint Lucia',
            'MF': 'Saint Martin',
            'PM': 'Saint Pierre and Miquelon',
            'VC': 'Saint Vincent and the Grenadines',
            'ST': 'Sao Tome and Principe',
            'SO': 'Somalia',
            'SJ': 'Svalbard and Jan Mayen',
            'SY': 'Syrian Arab Republic',
            'TW': 'Taiwan, Province of China',
            'TZ': 'Tanzania, United Republic of',
            'TL': 'Timor-Leste',
            'VE': 'Venezuela, Bolivarian Republic of',
            'VN': 'Viet Nam',
            'VG': 'Virgin Islands, British',
            'VI': 'Virgin Islands, U.S.'
        }
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
