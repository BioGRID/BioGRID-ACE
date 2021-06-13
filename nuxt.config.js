export default {

    // App Mode
    ssr: true,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - BioGRID ACE',
        title: 'BioGRID ACE',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'The BioGRID Annotation and Curation Engine' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~assets/fonts/roboto.css',
        '~assets/globalstyle.scss',
        '@mdi/font/css/materialdesignicons.min.css'
    ],

    // Style Resouces
    styleResources: {
        scss: ['./assets/scss/*.scss']
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/vuelidate',
        '~/plugins/permissions',
        '~/plugins/axios',
        '~/plugins/apis'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
        '@nuxtjs/auth-next'
    ],

    // Nuxt/Auth Module Configuration
    auth: {
        strategies: {
            local: {
                scheme: 'refresh',
                token: {
                    property: 'access_token',
                    maxAge: 600,
                    type: 'Bearer'
                },
                refreshToken: {
                    property: 'refresh_token',
                    data: 'refresh_token',
                    maxAge: 100000
                },
                user: {
                    property: false
                },
                endpoints: {
                    login: { url: process.env.AUTH_API_URL + '/login', method: 'post' },
                    refresh: { url: process.env.AUTH_API_URL + '/refresh', method: 'post' },
                    logout: { url: process.env.AUTH_API_URL + '/logout', method: 'post' },
                    user: { url: process.env.AUTH_API_URL + '/me', method: 'get' }
                },
                plugins: [
                    '~/plugins/auth.js'
                ]
            }
        },
        localStorage: false
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        defaultAssets: false,
        theme: {
            dark: false,
            options: {
                customProperties: true
            },
            themes: {
                light: {
                    primary: '#003366',
                    secondary: '#C0C0C0',
                    tertiary: '#ffd600',
                    highlight: '#3399FF',
                    info: '#5B7290',
                    warning: '#FF6600'
                }
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    // Additional directories to watch for changes
    watch: [
        '~utilities/*.ts'
    ],

    // Public Runtime Config
    publicRuntimeConfig: {
        titleShort: process.env.TITLE_SHORT || 'BioGRID ACE',
        titleLong: process.env.TITLE_LOG || 'BioGRID Annotation and Curation Engine',
        loginDefault: process.env.LOGIN_DEFAULT || '',
        passwordDefault: process.env.PASSWORD_DEFAULT || '',
        authAPIURL: process.env.AUTH_API_URL || '',
        websocketURL: process.env.WEBSOCKET_URL || '',
        curationAPIURL: process.env.CURATION_API_URL || '',
        annotationAPIURL: process.env.ANNOTATION_API_URL || ''
    },

    privateRuntimeConfig: {}
}
