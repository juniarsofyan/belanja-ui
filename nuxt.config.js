import axios from 'axios'
require('dotenv').config()

export default {
    generate: {
        fallback: true,
        /* routes: [
            '/products/:code/detail',
            '/products/brightening',
            '/products/purify',
            '/products/decorative',
            '/products/extra care',
            '/products/series'
        ] */

        routes() {
            const products = axios
                .get(process.env.API_BASE_URL + 'products/product-codes')
                .then((res) => {
                    return res.data.data.map((product) => {
                        return `products/${product.kode_barang}/detail`
                    })
                })

            const categories = [
                '/products/brightening',
                '/products/purify',
                '/products/decorative',
                '/products/extra care',
                '/products/series'
            ]

            return Promise.all([products, categories]).then((values) => {
                return values.join().split(',')
            })
        }
    },
    mode: 'spa',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            },
            {
                rel: 'stylesheet',
                type: 'text/css',
                href:
                    'https://fonts.googleapis.com/css?family=Arimo:400,400i,700,700i%7CLato:300,300i,400,400i,700,700i,900%7COpen+Sans:300,300i,400,400i,600,600i,700,700i,800'
            },
            {
                rel: 'stylesheet',
                href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
                integrity:
                    'sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU',
                crossorigin: 'anonymous'
            }
        ],
        script: [
            {
                src: process.env.BASE_URL + 'assets/js/jquery-3.3.1.min.js'
            },
            {
                src: process.env.BASE_URL + 'assets/js/bootstrap.min.js'
            },
            {
                src: process.env.BASE_URL + 'assets/js/owl.carousel.min.js'
            },
            {
                src: process.env.BASE_URL + 'assets/js/magnific-popup.min.js'
            },
            {
                src: process.env.BASE_URL + 'assets/js/isotope.min.js'
            },
            {
                src:
                    process.env.BASE_URL +
                    'assets/js/jquery.mCustomScrollbar.min.js'
            },
            {
                src: process.env.BASE_URL + 'assets/js/jquery-ui.min.js'
            },
            {
                src: process.env.BASE_URL + 'assets/js/mobilemenu.js'
            },
            {
                src: process.env.BASE_URL + 'assets/js/chosen.jquery.min.js'
            },
            {
                src: process.env.BASE_URL + 'assets/js/slick.min.js'
            },
            {
                src:
                    process.env.BASE_URL + 'assets/js/jquery.elevateZoom.min.js'
            },
            {
                src: process.env.BASE_URL + 'assets/js/jquery.actual.min.js'
            },
            {
                src: process.env.BASE_URL + 'assets/js/jquery.fancybox.js'
            },
            {
                src: process.env.BASE_URL + 'assets/js/lightbox.min.js'
            },
            {
                src:
                    process.env.BASE_URL +
                    'assets/js/jquery.mCustomScrollbar.min.js'
            },
            {
                src: process.env.BASE_URL + 'assets/js/frontend-plugin.js'
            }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: '#fff'
    },
    router: {
        scrollBehavior: async (to, from, savedPosition) => {
            if (savedPosition) {
                return savedPosition
            }

            const findEl = async (hash, x) => {
                return (
                    document.querySelector(hash) ||
                    new Promise((resolve, reject) => {
                        if (x > 50) {
                            return resolve()
                        }
                        setTimeout(() => {
                            resolve(findEl(hash, ++x || 1))
                        }, 100)
                    })
                )
            }

            if (to.hash) {
                const el = await findEl(to.hash)
                if ('scrollBehavior' in document.documentElement.style) {
                    return window.scrollTo({
                        top: el.offsetTop,
                        behavior: 'smooth'
                    })
                } else {
                    return window.scrollTo(0, el.offsetTop)
                }
            }

            return {
                x: 0,
                y: 0
            }
        }
    },
    /*
     ** Global CSS
     */
    css: [
        '@/assets/css/bootstrap.min.css',
        '@/assets/css/font-awesome.min.css',
        '@/assets/css/owl.carousel.min.css',
        '@/assets/css/animate.min.css',
        '@/assets/css/jquery-ui.css',
        '@/assets/css/slick.css',
        '@/assets/css/chosen.min.css',
        '@/assets/css/pe-icon-7-stroke.css',
        '@/assets/css/magnific-popup.min.css',
        '@/assets/css/lightbox.min.css',
        '@/assets/css/jquery.fancybox.css',
        '@/assets/css/jquery.mCustomScrollbar.min.css',
        '@/assets/css/style.css',
        '@/assets/css/style-custom.css',
        '@/assets/css/swiper.css',
        // '@/assets/scss/main.scss',
        { src: '@/assets/scss/main.scss', lang: 'scss' }
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        // { src: '~/plugins/vue-carousel.js', },
        {
            src: '~/plugins/slick.js',
            ssr: false
        },
        {
            src: '~/plugins/currency.js',
            ssr: false
        },
        {
            src: '~/plugins/vmodal.js',
            ssr: false
        },
        {
            src: '~/plugins/swiper.js',
            ssr: true
        }
    ],
    /*
     ** Nuxt.js dev-modules
     */
    devModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        // '@nuxtjs/eslint-module'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/auth',
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        // https://github.com/nuxt-community/dotenv-module
        [
            '@nuxtjs/dotenv',
            {
                filename: '.env'
            }
        ],
        '@nuxtjs/toast',
        'vue-sweetalert2/nuxt',
        'nuxt-material-design-icons'
        // [
        //     'nuxt-sass-resources-loader',
        //     [
        //         '@/assets/scss/main.scss',
        //         '@/assets/scss/product.scss'
        //         // 'assets/scss/file/_path-two.scss'
        //     ]
        // ]
    ],
    toast: {
        position: 'top-center',
        register: [
            // Register custom toasts
            {
                name: 'cartadd',
                message: (payload) => {
                    if (!payload.message) return 'Success'
                    return payload.message
                },
                options: {
                    position: 'top-right',
                    duration: 2000,
                    icon: 'shopping_cart'
                }
            },
            {
                name: 'cartremove',
                message: (payload) => {
                    if (!payload.message) return 'Removed'
                    return payload.message
                },
                options: {
                    position: 'top-right',
                    duration: 2000,
                    icon: 'delete',
                    type: 'error'
                }
            }
        ]
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: process.env.API_BASE_URL
    },
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: process.env.AUTH_BASE_URL + 'api/login',
                        method: 'post',
                        propertyName: 'meta.token'
                    },
                    user: {
                        url: process.env.AUTH_BASE_URL + 'api/user',
                        method: 'get',
                        propertyName: 'data'
                    },
                    logout: {
                        url: process.env.AUTH_BASE_URL + 'api/logout',
                        method: 'post'
                    }
                }
            }
        }
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            if (ctx.isDev && ctx.client) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })

                const vueLoader = config.module.rules.find(
                    ({ loader }) => loader === 'vue-loader'
                )
                const {
                    options: { loaders }
                } = vueLoader || { options: {} }
                if (loaders) {
                    for (const loader of Object.values(loaders)) {
                        changeLoaderOptions(
                            Array.isArray(loader) ? loader : [loader]
                        )
                    }
                }
                config.module.rules.forEach((rule) =>
                    changeLoaderOptions(rule.use)
                )
                // console.log(util.inspect(config.module.rules, { depth: 6 }))
            }
        }
    }
}

function changeLoaderOptions(loaders) {
    if (loaders) {
        for (const loader of loaders) {
            if (loader.loader === 'sass-loader') {
                Object.assign(loader.options, {
                    includePaths: ['./assets']
                    // data: '@import "_imports";'
                })
            }
        }
    }
}
