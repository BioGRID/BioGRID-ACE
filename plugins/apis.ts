/**
 * Create a plugin for the entire API
 * that allows us to call it from any context
 * with the correct axios and parameters already
 * put in place
 */

import { Plugin } from '@nuxt/types'
import '@nuxtjs/axios'
import CurationAPI from '@/api/curationapi'
import AuthAPI from '@/api/authapi'

declare module 'vue/types/vue' {
    interface Vue {
        $curationapi: CurationAPI,
        $authapi: AuthAPI
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $curationapi: CurationAPI,
        $authapi: AuthAPI
    }
}

declare module 'vuex/types/index' {
    /* eslint-disable no-unused-vars */
    /* eslint-disable @typescript-eslint/no-unused-vars */
    interface Store<S> {
    /* eslint-enable no-unused-vars */
    /* eslint-enable @typescript-eslint/no-unused-vars */
        $curationapi: CurationAPI,
        $authapi: AuthAPI
    }
}

const myPlugin: Plugin = (ctx, inject) => {
    const curationAPI = new CurationAPI(ctx)
    inject('curationapi', curationAPI)

    const authAPI = new AuthAPI(ctx)
    inject('authapi', authAPI)
}

export default myPlugin
