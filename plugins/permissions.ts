/**
 * Create a plugin for testing permission levels
 * anywhere within the site
 */

import { Plugin } from '@nuxt/types'
import Permissions from '~/utilities/permissions'

declare module 'vue/types/vue' {
    interface Vue {
        $permissions: Permissions
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $permissions: Permissions
    }
}

/* declare module 'vuex/types/index' {
    interface Store<S> {
        $permissions: Permissions
    }
} */

const permissionPlugin: Plugin = (ctx, inject) => {
    const permissions = new Permissions(ctx.store)
    inject('permissions', permissions)
}

export default permissionPlugin
