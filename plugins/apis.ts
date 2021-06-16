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
import AnnotationAPI from '@/api/annotationapi'
import ElasticAPI from '@/api/elasticapi'

declare module 'vue/types/vue' {
    interface Vue {
        $curationapi: CurationAPI,
        $authapi: AuthAPI,
        $annotationapi: AnnotationAPI,
        $elasticapi: ElasticAPI
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $curationapi: CurationAPI,
        $authapi: AuthAPI,
        $annotationapi: AnnotationAPI,
        $elasticapi: ElasticAPI
    }
}

declare module 'vuex/types/index' {
    /* eslint-disable no-unused-vars */
    /* eslint-disable @typescript-eslint/no-unused-vars */
    interface Store<S> {
    /* eslint-enable no-unused-vars */
    /* eslint-enable @typescript-eslint/no-unused-vars */
        $curationapi: CurationAPI,
        $authapi: AuthAPI,
        $annotationapi: AnnotationAPI,
        $elasticapi: ElasticAPI
    }
}

const myPlugin: Plugin = (ctx, inject) => {
    const curationAPI = new CurationAPI(ctx)
    inject('curationapi', curationAPI)

    const authAPI = new AuthAPI(ctx)
    inject('authapi', authAPI)

    const annotationAPI = new AnnotationAPI(ctx)
    inject('annotationapi', annotationAPI)

    const elasticAPI = new ElasticAPI(ctx)
    inject('elasticapi', elasticAPI)
}

export default myPlugin
