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
        '~/plugins/vuelidate'
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
        '@nuxtjs/style-resources'
    ],

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
    ]
}
