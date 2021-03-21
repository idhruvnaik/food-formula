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
        }
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
                    CURRENCY: env.CURRENCY
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
