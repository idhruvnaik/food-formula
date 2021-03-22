angular.module("config", [])

.constant("ENV", {
	"name": "local",
	"apiUrl": "https://restoz.herokuapp.com/",
	"CONTENT_STATUS": {
		"1": "Published",
		"2": "Draft",
		"3": "Discarded"
	},
	"META_DESCRIPTION": "Restaurants, Food Brands & Manufacturers, Meal Plan Companies, Cloud Kitchens use NutriCal to manage recipes & menus, calculate calories, create nutrition labels, conduct food costing & much more.",
	"POST_TYPES": [
		{
			"id": 1,
			"name": "Blog"
		},
		{
			"id": 3,
			"name": "Press"
		}
	],
	"CURRENCY": {
		"AED": "United Arab Emirates Dirham",
		"AFN": "Afghan Afghani",
		"ALL": "Albanian Lek",
		"AMD": "Armenian Dram",
		"ANG": "Netherlands Antillean Guilder",
		"AOA": "Angolan Kwanza",
		"ARS": "Argentine Peso",
		"AUD": "Australian Dollar",
		"AWG": "Aruban Florin",
		"AZN": "Azerbaijani Manat",
		"BAM": "Bosnia-Herzegovina Convertible Mark",
		"BBD": "Barbadian Dollar",
		"BDT": "Bangladeshi Taka",
		"BGN": "Bulgarian Lev",
		"BHD": "Bahraini Dinar",
		"BIF": "Burundian Franc",
		"BMD": "Bermudan Dollar",
		"BND": "Brunei Dollar",
		"BOB": "Bolivian Boliviano",
		"BRL": "Brazilian Real",
		"BSD": "Bahamian Dollar",
		"BTC": "Bitcoin",
		"BTN": "Bhutanese Ngultrum",
		"BWP": "Botswanan Pula",
		"BYN": "Belarusian Ruble",
		"BZD": "Belize Dollar",
		"CAD": "Canadian Dollar",
		"CDF": "Congolese Franc",
		"CHF": "Swiss Franc",
		"CLF": "Chilean Unit of Account (UF)",
		"CLP": "Chilean Peso",
		"CNH": "Chinese Yuan (Offshore)",
		"CNY": "Chinese Yuan",
		"COP": "Colombian Peso",
		"CRC": "Costa Rican Colón",
		"CUC": "Cuban Convertible Peso",
		"CUP": "Cuban Peso",
		"CVE": "Cape Verdean Escudo",
		"CZK": "Czech Republic Koruna",
		"DJF": "Djiboutian Franc",
		"DKK": "Danish Krone",
		"DOP": "Dominican Peso",
		"DZD": "Algerian Dinar",
		"EGP": "Egyptian Pound",
		"ERN": "Eritrean Nakfa",
		"ETB": "Ethiopian Birr",
		"EUR": "Euro",
		"FJD": "Fijian Dollar",
		"FKP": "Falkland Islands Pound",
		"GBP": "British Pound Sterling",
		"GEL": "Georgian Lari",
		"GGP": "Guernsey Pound",
		"GHS": "Ghanaian Cedi",
		"GIP": "Gibraltar Pound",
		"GMD": "Gambian Dalasi",
		"GNF": "Guinean Franc",
		"GTQ": "Guatemalan Quetzal",
		"GYD": "Guyanaese Dollar",
		"HKD": "Hong Kong Dollar",
		"HNL": "Honduran Lempira",
		"HRK": "Croatian Kuna",
		"HTG": "Haitian Gourde",
		"HUF": "Hungarian Forint",
		"IDR": "Indonesian Rupiah",
		"ILS": "Israeli New Sheqel",
		"IMP": "Manx pound",
		"INR": "Indian Rupee",
		"IQD": "Iraqi Dinar",
		"IRR": "Iranian Rial",
		"ISK": "Icelandic Króna",
		"JEP": "Jersey Pound",
		"JMD": "Jamaican Dollar",
		"JOD": "Jordanian Dinar",
		"JPY": "Japanese Yen",
		"KES": "Kenyan Shilling",
		"KGS": "Kyrgystani Som",
		"KHR": "Cambodian Riel",
		"KMF": "Comorian Franc",
		"KPW": "North Korean Won",
		"KRW": "South Korean Won",
		"KWD": "Kuwaiti Dinar",
		"KYD": "Cayman Islands Dollar",
		"KZT": "Kazakhstani Tenge",
		"LAK": "Laotian Kip",
		"LBP": "Lebanese Pound",
		"LKR": "Sri Lankan Rupee",
		"LRD": "Liberian Dollar",
		"LSL": "Lesotho Loti",
		"LYD": "Libyan Dinar",
		"MAD": "Moroccan Dirham",
		"MDL": "Moldovan Leu",
		"MGA": "Malagasy Ariary",
		"MKD": "Macedonian Denar",
		"MMK": "Myanma Kyat",
		"MNT": "Mongolian Tugrik",
		"MOP": "Macanese Pataca",
		"MRO": "Mauritanian Ouguiya (pre-2018)",
		"MRU": "Mauritanian Ouguiya",
		"MUR": "Mauritian Rupee",
		"MVR": "Maldivian Rufiyaa",
		"MWK": "Malawian Kwacha",
		"MXN": "Mexican Peso",
		"MYR": "Malaysian Ringgit",
		"MZN": "Mozambican Metical",
		"NAD": "Namibian Dollar",
		"NGN": "Nigerian Naira",
		"NIO": "Nicaraguan Córdoba",
		"NOK": "Norwegian Krone",
		"NPR": "Nepalese Rupee",
		"NZD": "New Zealand Dollar",
		"OMR": "Omani Rial",
		"PAB": "Panamanian Balboa",
		"PEN": "Peruvian Nuevo Sol",
		"PGK": "Papua New Guinean Kina",
		"PHP": "Philippine Peso",
		"PKR": "Pakistani Rupee",
		"PLN": "Polish Zloty",
		"PYG": "Paraguayan Guarani",
		"QAR": "Qatari Rial",
		"RON": "Romanian Leu",
		"RSD": "Serbian Dinar",
		"RUB": "Russian Ruble",
		"RWF": "Rwandan Franc",
		"SAR": "Saudi Riyal",
		"SBD": "Solomon Islands Dollar",
		"SCR": "Seychellois Rupee",
		"SDG": "Sudanese Pound",
		"SEK": "Swedish Krona",
		"SGD": "Singapore Dollar",
		"SHP": "Saint Helena Pound",
		"SLL": "Sierra Leonean Leone",
		"SOS": "Somali Shilling",
		"SRD": "Surinamese Dollar",
		"SSP": "South Sudanese Pound",
		"STD": "São Tomé and Príncipe Dobra (pre-2018)",
		"STN": "São Tomé and Príncipe Dobra",
		"SVC": "Salvadoran Colón",
		"SYP": "Syrian Pound",
		"SZL": "Swazi Lilangeni",
		"THB": "Thai Baht",
		"TJS": "Tajikistani Somoni",
		"TMT": "Turkmenistani Manat",
		"TND": "Tunisian Dinar",
		"TOP": "Tongan Pa'anga",
		"TRY": "Turkish Lira",
		"TTD": "Trinidad and Tobago Dollar",
		"TWD": "New Taiwan Dollar",
		"TZS": "Tanzanian Shilling",
		"UAH": "Ukrainian Hryvnia",
		"UGX": "Ugandan Shilling",
		"USD": "United States Dollar",
		"UYU": "Uruguayan Peso",
		"UZS": "Uzbekistan Som",
		"VEF": "Venezuelan Bolívar Fuerte (Old)",
		"VES": "Venezuelan Bolívar Soberano",
		"VND": "Vietnamese Dong",
		"VUV": "Vanuatu Vatu",
		"WST": "Samoan Tala",
		"XAF": "CFA Franc BEAC",
		"XAG": "Silver Ounce",
		"XAU": "Gold Ounce",
		"XCD": "East Caribbean Dollar",
		"XDR": "Special Drawing Rights",
		"XOF": "CFA Franc BCEAO",
		"XPD": "Palladium Ounce",
		"XPF": "CFP Franc",
		"XPT": "Platinum Ounce",
		"YER": "Yemeni Rial",
		"ZAR": "South African Rand",
		"ZMW": "Zambian Kwacha",
		"ZWL": "Zimbabwean Dollar"
	},
	"ALLERGIES": [
		{
			"id": 1,
			"name": "Brinjal"
		},
		{
			"id": 2,
			"name": "Celery"
		},
		{
			"id": 3,
			"name": "Crab"
		},
		{
			"id": 4,
			"name": "Mushrooms"
		},
		{
			"id": 5,
			"name": "Cashew Nut"
		},
		{
			"id": 6,
			"name": "Almond"
		},
		{
			"id": 7,
			"name": "Chickpea Flour (Besan) "
		},
		{
			"id": 8,
			"name": "Poppy Seeds"
		},
		{
			"id": 9,
			"name": "Peanuts"
		},
		{
			"id": 10,
			"name": "Walnut"
		},
		{
			"id": 11,
			"name": "Sesame Seeds"
		},
		{
			"id": 12,
			"name": "Hazelnut"
		},
		{
			"id": 13,
			"name": "Food Colors"
		},
		{
			"id": 14,
			"name": "Pistachio"
		},
		{
			"id": 15,
			"name": "Litchee"
		},
		{
			"id": 16,
			"name": "Kiwi"
		},
		{
			"id": 17,
			"name": "Coconut Water"
		},
		{
			"id": 18,
			"name": "Strawberry"
		},
		{
			"id": 19,
			"name": "Sago"
		},
		{
			"id": 20,
			"name": "Cucumber"
		},
		{
			"id": 21,
			"name": "Pine Nut"
		},
		{
			"id": 22,
			"name": "Black Pepper"
		},
		{
			"id": 23,
			"name": "Pineapple"
		},
		{
			"id": 24,
			"name": "Mustard"
		},
		{
			"id": 25,
			"name": "Buckwheat"
		},
		{
			"id": 26,
			"name": "Squid"
		},
		{
			"id": 27,
			"name": "Coconut"
		},
		{
			"id": 28,
			"name": "Monosodium Glutamate (MSG)"
		},
		{
			"id": 29,
			"name": "Sulpha Drugs (Sulphur Dioxide & Sulphites)"
		},
		{
			"id": 30,
			"name": "Red Meat"
		},
		{
			"id": 31,
			"name": "Cheese"
		},
		{
			"id": 32,
			"name": "Garlic"
		},
		{
			"id": 33,
			"name": "Sea Foods"
		},
		{
			"id": 34,
			"name": "Yeast"
		},
		{
			"id": 35,
			"name": "Food Additives"
		},
		{
			"id": 36,
			"name": "Egg"
		},
		{
			"id": 37,
			"name": "Poultry Meat"
		},
		{
			"id": 38,
			"name": "Not Allergic"
		},
		{
			"id": 39,
			"name": "Cow Milk Protein"
		},
		{
			"id": 40,
			"name": "Tree Nut"
		},
		{
			"id": 41,
			"name": "Corn"
		},
		{
			"id": 42,
			"name": "Lactose"
		},
		{
			"id": 43,
			"name": "Shell Fish"
		},
		{
			"id": 44,
			"name": "Soy"
		},
		{
			"id": 45,
			"name": "Gluten (Wheat, Oats, Rye, Barley)"
		},
		{
			"id": 46,
			"name": "Wheat"
		},
		{
			"id": 47,
			"name": "Milk & Milk products"
		},
		{
			"id": 48,
			"name": "Seafood"
		},
		{
			"id": 49,
			"name": "Prashi Test"
		},
		{
			"id": 50,
			"name": "Sago "
		},
		{
			"id": 51,
			"name": "Sesame Seeds "
		},
		{
			"id": 52,
			"name": "Soy Lecithin"
		},
		{
			"id": 53,
			"name": "Egg Yolk"
		},
		{
			"id": 54,
			"name": "Sunflower Seeds"
		},
		{
			"id": 55,
			"name": "Masoor Dal"
		},
		{
			"id": 56,
			"name": "Asafoetida (Hing)"
		},
		{
			"id": 57,
			"name": "Pumpkin"
		},
		{
			"id": 58,
			"name": "Banana"
		},
		{
			"id": 59,
			"name": "Tomato"
		},
		{
			"id": 60,
			"name": "Red Chilli"
		},
		{
			"id": 61,
			"name": "Fish"
		},
		{
			"id": 62,
			"name": "Citrus Fruits"
		},
		{
			"id": 63,
			"name": "Lemon"
		},
		{
			"id": 64,
			"name": "Wine"
		},
		{
			"id": 65,
			"name": "Pecan"
		},
		{
			"id": 66,
			"name": "Caffeine"
		},
		{
			"id": 67,
			"name": "Cocoa"
		},
		{
			"id": 68,
			"name": "Curd and Buttermilk"
		},
		{
			"id": 69,
			"name": "Lady's Finger"
		},
		{
			"id": 70,
			"name": "Turmeric"
		},
		{
			"id": 71,
			"name": "Macadamia Nuts"
		},
		{
			"id": 72,
			"name": "Curd And Buttermilk"
		},
		{
			"id": 73,
			"name": "Mushroom"
		},
		{
			"id": 74,
			"name": "Sunflower Seed"
		},
		{
			"id": 75,
			"name": "Dairy Products"
		}
	],
	"MEALTYPES": [
		{
			"id": 40,
			"name": "During Workout"
		},
		{
			"id": 41,
			"name": "Snack"
		},
		{
			"id": 42,
			"name": "Bed Time"
		},
		{
			"id": 43,
			"name": "Mid Meals"
		},
		{
			"id": 44,
			"name": "Sweet"
		},
		{
			"id": 45,
			"name": "Mid morning meal"
		},
		{
			"id": 46,
			"name": "Bedtime"
		},
		{
			"id": 47,
			"name": "evening meal"
		},
		{
			"id": 48,
			"name": "All Day Food/Snacks"
		},
		{
			"id": 49,
			"name": "Lunch"
		},
		{
			"id": 50,
			"name": "Breakfast"
		},
		{
			"id": 51,
			"name": "Dinner"
		},
		{
			"id": 52,
			"name": "Pre Workout "
		},
		{
			"id": 53,
			"name": "Early Morning"
		},
		{
			"id": 54,
			"name": "Post Workout"
		}
	]
})

;